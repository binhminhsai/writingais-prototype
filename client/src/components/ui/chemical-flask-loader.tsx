import { useState, useEffect } from 'react';

interface ChemicalFlaskLoaderProps {
  isVisible: boolean;
  onComplete: () => void;
  duration?: number; // Duration in seconds, defaults to 15
}

export function ChemicalFlaskLoader({ isVisible, onComplete, duration = 15 }: ChemicalFlaskLoaderProps) {
  const [liquidLevel, setLiquidLevel] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [countdown, setCountdown] = useState(duration);

  const messages = [
    "Preparing detailed insights for you...",
    "Analyzing your writing level...",
    "Generating a personalized Task 1 prompt...",
    "Calibrating chart details and band level..."
  ];

  useEffect(() => {
    if (!isVisible) {
      setLiquidLevel(0);
      setMessageIndex(0);
      setIsCompleting(false);
      setCountdown(duration);
      return;
    }

    // Start the liquid filling animation immediately - spread over duration seconds
    const liquidTimer = setInterval(() => {
      setLiquidLevel(prev => {
        if (prev >= 100) {
          clearInterval(liquidTimer);
          return 100;
        }
        return prev + (100 / (duration * 10)); // Fill over duration seconds (1% per duration/10 * 100ms)
      });
    }, 100);

    // Countdown timer - decrease every second, starting after 1 second
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Change messages every (duration / 4) seconds to cycle through all messages
    const messageInterval = (duration / messages.length) * 1000;
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, messageInterval);

    // Complete animation after duration seconds
    const completionTimer = setTimeout(() => {
      setIsCompleting(true);
      // Call onComplete immediately when countdown reaches 0
      onComplete();
    }, duration * 1000);

    return () => {
      clearInterval(liquidTimer);
      clearInterval(countdownTimer);
      clearInterval(messageTimer);
      clearTimeout(completionTimer);
    };
  }, [isVisible, onComplete, duration, messages.length]);

  if (!isVisible) return null;

  return (
    <div className={`flex flex-col items-center py-4 my-6 transition-all duration-500 ${
      isCompleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    }`}>
      {/* Chemical Flask SVG */}
      <div className="relative mb-4">
        <svg
          width="60"
          height="70"
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
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

      {/* Countdown Timer */}
      {countdown > 0 && (
        <div className="text-[#1fb2aa] text-center text-sm font-medium mb-2">
          {countdown}
        </div>
      )}

      {/* Loading Text */}
      <p className="text-[#111827] text-center text-sm font-medium leading-relaxed transition-all duration-300">
        {messages[messageIndex]}
      </p>
    </div>
  );
}