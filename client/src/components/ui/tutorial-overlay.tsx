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
      if (element) {
        setTargetElement(element);
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = rect.top + scrollTop;
        let left = rect.left + scrollLeft;

        // Position tooltip based on specified position
        switch (currentStep.position) {
          case 'top':
            top -= 10;
            left += rect.width / 2;
            break;
          case 'bottom':
            top += rect.height + 10;
            left += rect.width / 2;
            break;
          case 'left':
            top += rect.height / 2;
            left -= 10;
            break;
          case 'right':
            top += rect.height / 2;
            left += rect.width + 10;
            break;
        }

        setTooltipPosition({ top, left });

        // Scroll element into view if needed
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !targetElement) return null;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <>
      {/* Spotlight overlay with cutout for target element */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${
            targetElement.getBoundingClientRect().left + targetElement.getBoundingClientRect().width / 2
          }px ${
            targetElement.getBoundingClientRect().top + targetElement.getBoundingClientRect().height / 2
          }px, transparent ${Math.max(targetElement.getBoundingClientRect().width, targetElement.getBoundingClientRect().height) / 2 + 20}px, rgba(0, 0, 0, 0.5) ${Math.max(targetElement.getBoundingClientRect().width, targetElement.getBoundingClientRect().height) / 2 + 21}px)`,
          transition: 'all 0.3s ease-in-out'
        }}
      />
      
      {/* Highlight ring around target element */}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - 4,
          left: targetElement.getBoundingClientRect().left + window.pageXOffset - 4,
          width: targetElement.getBoundingClientRect().width + 8,
          height: targetElement.getBoundingClientRect().height + 8,
          border: '3px solid rgba(31, 178, 170, 0.8)',
          borderRadius: '8px',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 0 0 1px rgba(31, 178, 170, 0.3), 0 0 15px rgba(31, 178, 170, 0.4)'
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-[10000] bg-white rounded-lg shadow-xl border-2 border-[#1fb2aa] p-4 max-w-sm"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: 'translate(-50%, -100%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1fb2aa] rounded-full flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">{currentStep.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-gray-600 text-xs mb-4 leading-relaxed">
          {currentStep.content}
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentStepIndex ? 'bg-[#1fb2aa]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
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
            className="text-xs h-7"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-xs h-7 text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </Button>
            <Button
              size="sm"
              onClick={isLastStep ? onComplete : onNext}
              className="text-xs h-7 bg-[#1fb2aa] hover:bg-[#0d9488] text-white"
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ArrowRight className="w-3 h-3 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Arrow pointing to target */}
        <div
          className={`absolute w-3 h-3 bg-white border-[#1fb2aa] transform rotate-45 ${
            currentStep.position === 'top' 
              ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-0 border-l-0' 
              : currentStep.position === 'bottom'
              ? 'top-[-6px] left-1/2 -translate-x-1/2 border-b-0 border-r-0'
              : currentStep.position === 'left'
              ? 'right-[-6px] top-1/2 -translate-y-1/2 border-t-0 border-r-0'
              : 'left-[-6px] top-1/2 -translate-y-1/2 border-b-0 border-l-0'
          }`}
        />
      </div>
    </>
  );
}