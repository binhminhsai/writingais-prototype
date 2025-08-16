import { useEffect, useState } from 'react';
import { Button } from './button';
import { X, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { TutorialStep } from '@/hooks/use-tutorial';

interface TutorialOverlayProps {
  isActive: boolean;
  currentStep: TutorialStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export function TutorialOverlay({
  isActive,
  currentStep,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onComplete
}: TutorialOverlayProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetBorderRadius, setTargetBorderRadius] = useState('6px');

  useEffect(() => {
    if (!isActive || !currentStep) return;

    const updatePosition = () => {
      const element = document.querySelector(currentStep.target) as HTMLElement;
      if (element && element.offsetParent !== null) {
        setTargetElement(element);
        
        // Wait for element to be fully rendered and measure
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return; // Element not visible
          
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          
          // Get computed styles to match exact border radius
          const computedStyle = window.getComputedStyle(element);
          setTargetBorderRadius(computedStyle.borderRadius || '6px');

          let top = rect.top + scrollTop;
          let left = rect.left + scrollLeft;

          // Position tooltip to avoid covering the target element
          const tooltipWidth = 400; // w-96 is 384px (max-w-[400px])
          const tooltipHeight = 200; // reduced height for compact design
          const padding = 30;
          
          switch (currentStep.position) {
            case 'top':
              top -= tooltipHeight + padding + 10; // Extra space to avoid overlap
              left += rect.width / 2;
              break;
            case 'bottom':
              top += rect.height + padding + 15; // Extra space to avoid overlap
              left += rect.width / 2;
              break;
            case 'left':
              top += rect.height / 2;
              left -= tooltipWidth + padding;
              break;
            case 'right':
              top += rect.height / 2;
              left += rect.width + padding;
              break;
          }
          
          // Ensure tooltip stays within viewport with better boundaries
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          
          // Horizontal positioning
          if (currentStep.position === 'top' || currentStep.position === 'bottom') {
            if (left + tooltipWidth / 2 > viewportWidth - padding) {
              left = viewportWidth - tooltipWidth / 2 - padding;
            }
            if (left - tooltipWidth / 2 < padding) {
              left = tooltipWidth / 2 + padding;
            }
          }
          
          // Vertical positioning
          if (top < padding) {
            top = rect.top + scrollTop + rect.height + padding;
          }
          if (top + tooltipHeight > viewportHeight + scrollTop - padding) {
            top = rect.top + scrollTop - tooltipHeight - padding;
          }

          setTooltipPosition({ top, left });

          // Scroll element into view if needed with better timing
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }, 100);
      }
    };

    // Initial position update
    updatePosition();
    
    // Add event listeners with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updatePosition, 100);
    };
    
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('scroll', debouncedUpdate);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate);
    };
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !targetElement) return null;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const targetRect = targetElement.getBoundingClientRect();
  const targetTop = targetRect.top + window.pageYOffset;
  const targetLeft = targetRect.left + window.pageXOffset;

  return (
    <>
      {/* Dark overlay with precise rectangular cutout */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          clipPath: `polygon(
            0% 0%, 
            0% 100%, 
            ${targetRect.left}px 100%, 
            ${targetRect.left}px ${targetRect.top}px, 
            ${targetRect.right}px ${targetRect.top}px, 
            ${targetRect.right}px ${targetRect.bottom}px, 
            ${targetRect.left}px ${targetRect.bottom}px, 
            ${targetRect.left}px 100%, 
            100% 100%, 
            100% 0%
          )`,
          transition: 'all 0.3s ease-in-out'
        }}
      />
      
      {/* Precise rectangular highlight border */}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          top: targetTop,
          left: targetLeft,
          width: targetRect.width,
          height: targetRect.height,
          border: '2px solid #1fb2aa',
          borderRadius: targetBorderRadius,
          transition: 'all 0.3s ease-in-out',
          animation: 'pulseHighlight 2s infinite',
          background: 'rgba(31, 178, 170, 0.03)',
          boxShadow: '0 0 0 2px rgba(31, 178, 170, 0.2), inset 0 0 0 1px rgba(31, 178, 170, 0.1)'
        }}
      />

      {/* Professional Tooltip with connecting line */}
      <div
        className="fixed z-[10000] bg-white rounded-xl shadow-2xl border-2 border-[#1fb2aa] p-4 w-96 max-w-[400px]"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: currentStep.position === 'top' ? 'translate(-50%, 0%)' : 
                     currentStep.position === 'bottom' ? 'translate(-50%, 0%)' :
                     currentStep.position === 'left' ? 'translate(0%, -50%)' :
                     'translate(0%, -50%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(31, 178, 170, 0.2), 0 0 30px rgba(31, 178, 170, 0.3)',
          animation: 'fadeInScale 0.3s ease-out'
        }}
      >
        {/* Arrow pointing to target */}
        <div
          className="absolute"
          style={{
            top: currentStep.position === 'top' ? '100%' : 
                 currentStep.position === 'bottom' ? '-8px' :
                 '50%',
            left: currentStep.position === 'left' ? '100%' : 
                  currentStep.position === 'right' ? '-8px' :
                  '50%',
            transform: currentStep.position === 'left' || currentStep.position === 'right' ? 'translateY(-50%)' : 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: currentStep.position === 'top' ? '0 8px 8px 8px' :
                        currentStep.position === 'bottom' ? '8px 8px 0 8px' :
                        currentStep.position === 'left' ? '8px 0 8px 8px' :
                        '8px 8px 8px 0',
            borderColor: currentStep.position === 'top' ? 'transparent transparent #1fb2aa transparent' :
                        currentStep.position === 'bottom' ? '#1fb2aa transparent transparent transparent' :
                        currentStep.position === 'left' ? 'transparent transparent transparent #1fb2aa' :
                        'transparent #1fb2aa transparent transparent'
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#1fb2aa] to-[#0d9488] rounded-lg flex items-center justify-center shadow-md">
              <HelpCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{currentStep.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
              {currentStepIndex + 1} / {totalSteps}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {currentStep.content}
        </p>

        {/* Progress indicator */}
        <div className="flex justify-center mb-3">
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStepIndex 
                    ? 'bg-[#1fb2aa] scale-110' 
                    : i < currentStepIndex 
                      ? 'bg-[#1fb2aa] opacity-60' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={isFirstStep}
            className="text-xs h-8 px-3 border border-gray-300 hover:border-[#1fb2aa] hover:text-[#1fb2aa] hover:bg-[#1fb2aa]/5 disabled:opacity-40 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-xs h-8 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              Skip
            </Button>
            <Button
              size="sm"
              onClick={isLastStep ? onComplete : onNext}
              className="text-xs h-8 px-4 bg-gradient-to-r from-[#1fb2aa] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0a7a72] text-white shadow-md transition-all duration-200 font-bold"
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ArrowRight className="w-3 h-3 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}