import { useState, useEffect, useRef } from "react";

export type TimerConfig = {
  initialMinutes: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
};

export const useTimer = ({ initialMinutes, onTimeUp, autoStart = false }: TimerConfig) => {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60); // In seconds
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format the time as HH:MM:SS
  const formattedTime = () => {
    if (initialMinutes === 0) return "No limit";
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Start the timer
  const startTimer = () => {
    if (!isRunning && timeRemaining > 0) {
      setIsRunning(true);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = (newMinutes?: number) => {
    setIsRunning(false);
    setIsTimeUp(false);
    setTimeRemaining((newMinutes !== undefined ? newMinutes : initialMinutes) * 60);
  };

  // Update timer when minutes change
  const updateTimer = (minutes: number) => {
    resetTimer(minutes);
  };

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setIsTimeUp(true);
            onTimeUp?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUp]);

  return {
    timeRemaining,
    formattedTime,
    isRunning,
    isTimeUp,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimer,
  };
};
