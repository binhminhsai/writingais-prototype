import { useState, useEffect, useCallback } from 'react';

export interface TutorialStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  order: number;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'select-question-type',
    target: '[data-testid="select-question-type"]',
    title: 'Select Question Type',
    content: 'Choose the type of chart or diagram you want to practice with. Different types require different writing approaches.',
    position: 'bottom',
    order: 1
  },
  {
    id: 'band-level',
    target: '[data-testid="select-band-level"]',
    title: 'Band Level',
    content: 'Select your target IELTS band score. This helps us provide appropriate vocabulary and feedback for your level.',
    position: 'bottom',
    order: 2
  },
  {
    id: 'topic-question',
    target: '[data-testid="textarea-question"]',
    title: 'Topic/Question',
    content: 'This area will display your question. You can either generate one automatically or enter your own question.',
    position: 'top',
    order: 3
  },
  {
    id: 'generate-question',
    target: '[data-testid="button-generate-question"]',
    title: 'Generate Question',
    content: 'Click this button to automatically generate a practice question with a chart based on your selected type and band level.',
    position: 'top',
    order: 4
  },
  {
    id: 'use-my-question',
    target: '[data-testid="button-use-my-question"]',
    title: 'Use My Question',
    content: 'If you have your own question and chart image, enter the question text and upload the image, then click this button.',
    position: 'top',
    order: 5
  },
  {
    id: 'random-question',
    target: '[data-testid="button-random-question"]',
    title: 'Random Question',
    content: 'Generate a completely random practice question from our database. Great for surprise practice sessions!',
    position: 'top',
    order: 6
  },
  {
    id: 'time-limit',
    target: '[data-testid="select-time-limit"]',
    title: 'Time Limit (Optional)',
    content: 'Set a time limit for your writing practice. In the real IELTS exam, you have 20 minutes for Task 1.',
    position: 'top',
    order: 7
  },
  {
    id: 'start-writing',
    target: '[data-testid="button-start-writing"]',
    title: 'Start Writing',
    content: 'Once you have a question ready, click here to begin your writing practice with real-time feedback and analysis.',
    position: 'top',
    order: 8
  }
];

export function useTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if user has seen tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('ielts-tutorial-completed');
    if (!hasSeenTutorial) {
      setIsActive(true);
    }
  }, []);

  const startTutorial = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    setIsCompleted(false);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    localStorage.setItem('ielts-tutorial-completed', 'true');
  }, []);

  const completeTutorial = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    localStorage.setItem('ielts-tutorial-completed', 'true');
  }, []);

  const resetTutorial = useCallback(() => {
    localStorage.removeItem('ielts-tutorial-completed');
    setIsCompleted(false);
  }, []);

  return {
    isActive,
    currentStep,
    isCompleted,
    currentStepData: tutorialSteps[currentStep],
    totalSteps: tutorialSteps.length,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    completeTutorial,
    resetTutorial
  };
}