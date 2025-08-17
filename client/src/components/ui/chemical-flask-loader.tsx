import { useState, useEffect } from 'react';

interface ChemicalFlaskLoaderProps {
  isVisible: boolean;
  onComplete: () => void;
  duration?: number; // Duration in seconds, defaults to 15
  messages?: string[]; // Custom messages, defaults to feedback analysis messages
}

export function ChemicalFlaskLoader({ isVisible, onComplete, duration = 15, messages }: ChemicalFlaskLoaderProps) {
  const [liquidLevel, setLiquidLevel] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const defaultMessages = [
    "Preparing detailed insights for you...",
    "Analyzing your writing level...",
    "Generating a personalized Task 1 prompt...",
    "Calibrating chart details and band level..."
  ];

  const loadingMessages = messages || defaultMessages;

  useEffect(() => {
    if (!isVisible) {
      setLiquidLevel(0);
      setMessageIndex(0);
      setProgress(0);
      return;
    }

    const startTime = performance.now();
    const totalDuration = duration * 1000; // Convert to milliseconds

    // Master animation loop using requestAnimationFrame for precise timing
    const updateAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
      
      // Update progress bar
      setProgress(progressPercent);
      
      // Update liquid level to match progress
      setLiquidLevel(progressPercent);

      // Update message index based on progress
      const messageProgress = Math.floor((progressPercent / 100) * loadingMessages.length);
      setMessageIndex(Math.min(messageProgress, loadingMessages.length - 1));

      if (elapsed >= totalDuration) {
        setTimeout(() => onComplete(), 0);
      } else {
        requestAnimationFrame(updateAnimation);
      }
    };

    const animationFrame = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, onComplete, duration, loadingMessages.length]);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-center py-8 my-8">
      {/* Chemical Flask SVG */}
      <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
        <svg
          width="80"
          height="90"
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Flask Outline with Glow */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="liquidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1fb2aa" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#1fb2aa" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#1fb2aa" stopOpacity="0.5"/>
            </linearGradient>
            <clipPath id="flaskClip">
              <path d="M45 20 L45 45 L20 100 L20 120 L100 120 L100 100 L75 45 L75 20 Z"/>
            </clipPath>
          </defs>
          
          {/* Flask Body */}
          <path
            d="M45 20 L45 45 L20 100 L20 120 L100 120 L100 100 L75 45 L75 20 Z"
            fill="white"
            stroke="#00ffff"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Flask Neck */}
          <rect
            x="50"
            y="10"
            width="20"
            height="15"
            fill="white"
            stroke="#00ffff"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Liquid with wave animation */}
          <g clipPath="url(#flaskClip)">
            <path
              d={`M20 ${120 - (liquidLevel * 0.8)} 
                 Q35 ${118 - (liquidLevel * 0.8)} 50 ${120 - (liquidLevel * 0.8)}
                 T80 ${118 - (liquidLevel * 0.8)}
                 Q90 ${120 - (liquidLevel * 0.8)} 100 ${120 - (liquidLevel * 0.8)}
                 L100 120 L20 120 Z`}
              fill="url(#liquidGradient)"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 2,-1; 0,0; -2,1; 0,0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            
            {/* Floating bubbles */}
            {liquidLevel > 20 && (
              <>
                <circle
                  cx="40"
                  cy={115 - (liquidLevel * 0.6)}
                  r="2"
                  fill="#ffffff"
                  opacity="0.6"
                >
                  <animate
                    attributeName="cy"
                    values={`${115 - (liquidLevel * 0.6)};${105 - (liquidLevel * 0.6)};${115 - (liquidLevel * 0.6)}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.3;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="70"
                  cy={110 - (liquidLevel * 0.6)}
                  r="1.5"
                  fill="#ffffff"
                  opacity="0.4"
                >
                  <animate
                    attributeName="cy"
                    values={`${110 - (liquidLevel * 0.6)};${100 - (liquidLevel * 0.6)};${110 - (liquidLevel * 0.6)}`}
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="w-64 mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-[#1fb2aa] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
            data-testid="progress-bar-chemical-flask"
          />
        </div>
        <div className="text-xs text-center mt-1 text-[#1fb2aa] font-medium">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-[#111827] text-center text-lg font-medium leading-relaxed transition-all duration-500 max-w-md">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
}