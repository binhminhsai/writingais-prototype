import { useState, useEffect } from 'react';
import { DrawingCanvas } from './drawing-canvas';

interface Task2LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function Task2LoadingScreen({ isVisible, onComplete }: Task2LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [liquidLevel, setLiquidLevel] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setLiquidLevel(0);
      return;
    }

    const startTime = performance.now();
    const totalDuration = 40 * 1000; // 40 seconds in milliseconds

    // Progress animation using requestAnimationFrame for smooth updates
    const updateAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
      
      // Update progress bar and liquid level
      setProgress(progressPercent);
      setLiquidLevel(progressPercent);

      if (elapsed >= totalDuration) {
        setTimeout(() => onComplete(), 100);
      } else {
        requestAnimationFrame(updateAnimation);
      }
    };

    const animationFrame = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {/* Drawing Canvas - Behind main content */}
      <DrawingCanvas 
        isActive={isVisible}
        onClear={onComplete}
      />
      
      <div className="text-center relative z-10">
        {/* Chemical Flask SVG */}
        <div className="relative mb-8">
          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl mx-auto"
          >
            {/* Flask Outline with Glow */}
            <defs>
              <filter id="glowTask2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="liquidGradientTask2" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1fb2aa" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#1fb2aa" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#1fb2aa" stopOpacity="0.5"/>
              </linearGradient>
              <clipPath id="flaskClipTask2">
                <path d="M45 20 L45 45 L20 100 L20 120 L100 120 L100 100 L75 45 L75 20 Z"/>
              </clipPath>
            </defs>
            
            {/* Flask Body */}
            <path
              d="M45 20 L45 45 L20 100 L20 120 L100 120 L100 100 L75 45 L75 20 Z"
              fill="white"
              stroke="#1fb2aa"
              strokeWidth="2"
              filter="url(#glowTask2)"
            />
            
            {/* Flask Neck */}
            <rect
              x="50"
              y="10"
              width="20"
              height="15"
              fill="white"
              stroke="#1fb2aa"
              strokeWidth="2"
              filter="url(#glowTask2)"
            />
            
            {/* Liquid with wave animation */}
            <g clipPath="url(#flaskClipTask2)">
              <path
                d={`M20 ${120 - (liquidLevel * 0.8)} 
                   Q35 ${118 - (liquidLevel * 0.8)} 50 ${120 - (liquidLevel * 0.8)}
                   T80 ${118 - (liquidLevel * 0.8)}
                   Q90 ${120 - (liquidLevel * 0.8)} 100 ${120 - (liquidLevel * 0.8)}
                   L100 120 L20 120 Z`}
                fill="url(#liquidGradientTask2)"
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
        <div className="w-72 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-[#1fb2aa] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
              data-testid="progress-bar-task2"
            />
          </div>
          <div className="text-sm text-center mt-2 text-[#1fb2aa] font-medium">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-lg font-medium text-gray-900 mb-4">
          Loading question analysis tools...
        </p>
        
        {/* Drawing hint */}
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">
            Draw while you wait ✏️
          </p>
        </div>
      </div>
    </div>
  );
}