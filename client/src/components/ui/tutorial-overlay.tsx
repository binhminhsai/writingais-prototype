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

          let top = rect.top + scrollTop;
          let left = rect.left + scrollLeft;

          // Position tooltip to avoid covering the target element
          const tooltipWidth = 320; // max-w-xs is approximately 320px
          const tooltipHeight = 260; // estimated height for better spacing
          const padding = 30;
          
          switch (currentStep.position) {
            case 'top':
              top -= tooltipHeight + padding;
              left += rect.width / 2;
              break;
            case 'bottom':
              top += rect.height + padding;
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
          top: targetTop - 2,
          left: targetLeft - 2,
          width: targetRect.width + 4,
          height: targetRect.height + 4,
          border: '3px solid #1fb2aa',
          borderRadius: '8px',
          transition: 'all 0.3s ease-in-out',
          animation: 'pulseHighlight 2s infinite',
          background: 'rgba(31, 178, 170, 0.05)'
        }}
      />

      {/* Professional Tooltip with connecting line */}
      <div
        className="fixed z-[10000] bg-white rounded-xl shadow-2xl border-2 border-[#1fb2aa] p-6 max-w-xs min-w-[300px]"
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
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1fb2aa] to-[#0d9488] rounded-xl flex items-center justify-center shadow-lg">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{currentStep.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-base mb-6 leading-relaxed font-medium">
          {currentStep.content}
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentStepIndex 
                    ? 'bg-[#1fb2aa] scale-125 shadow-lg shadow-[#1fb2aa]/50' 
                    : i < currentStepIndex 
                      ? 'bg-[#1fb2aa] opacity-60' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-base text-gray-600 font-bold bg-gray-100 px-3 py-1 rounded-full">
            {currentStepIndex + 1} / {totalSteps}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={isFirstStep}
            className="text-base h-10 px-5 border-2 border-gray-300 hover:border-[#1fb2aa] hover:text-[#1fb2aa] hover:bg-[#1fb2aa]/5 disabled:opacity-40 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-base h-10 px-5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 font-medium"
            >
              Skip Tour
            </Button>
            <Button
              size="sm"
              onClick={isLastStep ? onComplete : onNext}
              className="text-base h-10 px-6 bg-gradient-to-r from-[#1fb2aa] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0a7a72] text-white shadow-lg hover:shadow-xl transition-all duration-200 font-bold transform hover:scale-105"
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}