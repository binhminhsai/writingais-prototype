import { useState, useEffect, useCallback } from 'react';

export interface TutorialStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  order: number;
}

// Writing Task 1 Tutorial Steps
export const task1TutorialSteps: TutorialStep[] = [
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
    content: 'If you want to use your own question, this is where you enter it. After that, upload an image and select \'Use my question\'.',
    position: 'top',
    order: 3
  },
  {
    id: 'generate-question',
    target: '[data-testid="upload-image-area"]',
    title: 'Upload Image',
    content: 'If you want to use your own question, upload the corresponding image (line graph, pie chart, table,…) here before proceeding.',
    position: 'top',
    order: 4
  },
  {
    id: 'use-my-question',
    target: '[data-testid="button-generate-question"]',
    title: 'Get Question',
    content: 'Click this button to automatically generate a practice question with chart data based on your selected type and band level.',
    position: 'top',
    order: 5
  },
  {
    id: 'random-question',
    target: '[data-testid="button-random-question"]',
    title: 'Random Question',
    content: 'If you have your own question and chart image, enter the question text and upload the image, then click this button.',
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

// Writing Task 2 Tutorial Steps
export const task2TutorialSteps: TutorialStep[] = [
  {
    id: 'select-question-type',
    target: '[data-testid="select-question-type"]',
    title: 'Select Question Type',
    content: 'Choose the type of essay question you want to practice. Each type (Opinion, Discussion, Problem-Solution, etc.) requires different writing approaches and structures.',
    position: 'bottom',
    order: 1
  },
  {
    id: 'band-level',
    target: '[data-testid="select-band-level"]',
    title: 'Band Level',
    content: 'Select your target IELTS band score. This helps us provide appropriate vocabulary, grammar complexity, and feedback for your level.',
    position: 'bottom',
    order: 2
  },
  {
    id: 'topic-question',
    target: '[data-testid="topic-question-area"]',
    title: 'Topic/Question Area',
    content: 'Enter your essay question here or use the buttons below to generate one. This area supports custom questions and auto-generated topics.',
    position: 'top',
    order: 3
  },
  {
    id: 'generate-question',
    target: '[data-testid="button-generate-question"]',
    title: 'Generate Question',
    content: 'Click this button to automatically generate an essay question based on your selected type and band level. Perfect for quick practice sessions.',
    position: 'top',
    order: 4
  },
  {
    id: 'use-my-question',
    target: '[data-testid="button-use-my-question"]',
    title: 'Use My Question',
    content: 'If you have your own essay question, enter it in the text area above and click this button to use it for practice.',
    position: 'top',
    order: 5
  },
  {
    id: 'random-question',
    target: '[data-testid="button-random-question"]',
    title: 'Random Question',
    content: 'Generate a completely random essay question from our extensive database. Great for challenging yourself with unexpected topics!',
    position: 'top',
    order: 6
  },
  {
    id: 'time-limit',
    target: '[data-testid="select-time-limit"]',
    title: 'Time Limit (Optional)',
    content: 'Set a time limit for your writing practice. In the real IELTS exam, you have 40 minutes for Task 2.',
    position: 'top',
    order: 7
  },
  {
    id: 'start-writing',
    target: '[data-testid="button-start-writing"]',
    title: 'Start Writing',
    content: 'Once you have a question ready, click here to begin your writing practice with real-time feedback, grammar checking, and band score analysis.',
    position: 'top',
    order: 8
  }
];

// For backward compatibility
export const tutorialSteps = task1TutorialSteps;

export function useTutorial(tutorialType: 'task1' | 'task2' = 'task1') {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = tutorialType === 'task2' ? task2TutorialSteps : task1TutorialSteps;
  const storageKey = `ielts-tutorial-${tutorialType}-completed`;

  // Check if user has seen tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(storageKey);
    if (!hasSeenTutorial) {
      setIsActive(true);
    }
  }, [storageKey]);

  const startTutorial = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    setIsCompleted(false);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTutorial();
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    localStorage.setItem(storageKey, 'true');
  }, [storageKey]);

  const completeTutorial = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    localStorage.setItem(storageKey, 'true');
  }, [storageKey]);

  const resetTutorial = useCallback(() => {
    localStorage.removeItem(storageKey);
    setIsCompleted(false);
  }, [storageKey]);

  return {
    isActive,
    currentStep,
    isCompleted,
    currentStepData: steps[currentStep],
    totalSteps: steps.length,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    completeTutorial,
    resetTutorial
  };
}