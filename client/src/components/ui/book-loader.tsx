import React, { useState, useEffect } from "react";

interface BookLoaderProps {
  message?: string;
  className?: string;
  duration?: number;
  onComplete?: () => void;
  isVisible?: boolean;
}

export function BookLoader({ 
  message = "Flipping through our vocabulary archive...", 
  className = "",
  duration = 5,
  onComplete = () => {},
  isVisible = true
}: BookLoaderProps) {
  const [countdown, setCountdown] = useState(duration);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(duration);
      setIsCompleting(false);
      return;
    }

    // Countdown timer - decrease every second
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Complete animation after duration seconds
    const completionTimer = setTimeout(() => {
      setIsCompleting(true);
      // Call onComplete immediately when countdown reaches 0
      onComplete();
    }, duration * 1000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(completionTimer);
    };
  }, [isVisible, onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 transition-all duration-500 ${
      isCompleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    } ${className}`}>
      {/* Open Book Animation */}
      <div className="relative w-24 h-16">
        {/* Left Page */}
        <div className="absolute left-0 top-0 w-11 h-16 bg-[#1ca19a] rounded-l-lg shadow-md">
          <div className="absolute inset-1 bg-white rounded-l-sm">
            {/* Subtle page lines */}
            <div className="absolute top-2 left-1 right-1 h-px bg-gray-200"></div>
            <div className="absolute top-3.5 left-1 right-1 h-px bg-gray-200"></div>
            <div className="absolute top-5 left-1 right-1 h-px bg-gray-200"></div>
          </div>
        </div>
        
        {/* Right Page */}
        <div className="absolute right-0 top-0 w-11 h-16 bg-[#1ca19a] rounded-r-lg shadow-md">
          <div className="absolute inset-1 bg-white rounded-r-sm">
            {/* Subtle page lines */}
            <div className="absolute top-2 left-1 right-1 h-px bg-gray-200"></div>
            <div className="absolute top-3.5 left-1 right-1 h-px bg-gray-200"></div>
            <div className="absolute top-5 left-1 right-1 h-px bg-gray-200"></div>
          </div>
        </div>
        
        {/* Central Spine */}
        <div className="absolute left-1/2 top-0 w-1 h-16 bg-[#148f82] transform -translate-x-0.5 rounded-sm"></div>
        
        {/* Animated Flipping Pages */}
        <div className="absolute inset-0">
          {/* First Flipping Page */}
          <div className="absolute right-1 top-1 w-10 h-14 bg-[#f5f5f5] rounded-r-sm shadow-xl border border-gray-300 open-book-flip-1 transform-gpu">
            {/* Subtle page lines */}
            <div className="absolute top-2 left-1 right-1 h-px bg-gray-300"></div>
            <div className="absolute top-3.5 left-1 right-1 h-px bg-gray-300"></div>
            <div className="absolute top-5 left-1 right-1 h-px bg-gray-300"></div>
          </div>
          
          {/* Second Flipping Page */}
          <div className="absolute right-1 top-1 w-10 h-14 bg-white rounded-r-sm shadow-lg border border-gray-200 open-book-flip-2 transform-gpu">
            {/* Subtle page lines */}
            <div className="absolute top-2 left-1 right-1 h-px bg-gray-300"></div>
            <div className="absolute top-3.5 left-1 right-1 h-px bg-gray-300"></div>
          </div>
        </div>
        
        {/* Book Glow Effect */}
        <div className="absolute inset-0 rounded-lg book-glow-open"></div>
      </div>

      {/* Countdown Timer - positioned between book and message */}
      {duration > 5 && (
        <div className="text-xl font-bold text-[#1ca19a] select-none">
          {countdown}s
        </div>
      )}

      {/* Loading Message */}
      <p className="text-sm font-medium text-gray-600 animate-pulse">
        {message}
      </p>
    </div>
  );
}