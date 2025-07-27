import React, { useState, useEffect } from "react";

interface BookLoaderProps {
  message?: string;
  className?: string;
}

const vocabularyKeywords = [
  'fluency', 'coherence', 'grammar', 'lexical', 'accuracy', 
  'complexity', 'clarity', 'structure', 'cohesion', 'range'
];

export function BookLoader({ 
  message = "Flipping through our vocabulary archive...", 
  className = "" 
}: BookLoaderProps) {
  const [currentKeyword, setCurrentKeyword] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % vocabularyKeywords.length);
    }, 800); // Change keyword every 800ms for smooth rotation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Animated Book */}
      <div className="relative">
        {/* Book Base */}
        <div className="relative w-20 h-24 bg-gradient-to-br from-[#1ca19a] to-[#16a085] rounded-lg shadow-lg book-glow">
          {/* Book Spine */}
          <div className="absolute left-0 top-0 w-2.5 h-full bg-gradient-to-b from-[#148f82] to-[#0f6b63] rounded-l-lg"></div>
          
          {/* Static Pages Stack */}
          <div className="absolute right-1 top-2 bottom-2 w-0.5 bg-white/30 rounded-full"></div>
          <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-white/20 rounded-full"></div>
          <div className="absolute right-3 top-2 bottom-2 w-0.5 bg-white/15 rounded-full"></div>
          
          {/* Animated Flipping Pages */}
          <div className="absolute top-1.5 left-3 right-1.5 bottom-1.5 overflow-hidden">
            {/* Page 1 - Always visible background */}
            <div className="absolute inset-0 bg-white/95 rounded-sm shadow-sm">
              <div className="p-1.5 h-full flex flex-col justify-center items-center">
                <div className="w-8 h-0.5 bg-gray-300 rounded-full mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-300 rounded-full mb-1"></div>
                <div className="w-7 h-0.5 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            
            {/* Page 2 - Flipping animation */}
            <div className="absolute inset-0 flipping-page-1 bg-white/95 rounded-sm shadow-md">
              <div className="p-1.5 h-full flex flex-col justify-center items-center">
                <div className="keyword-text text-[#1ca19a] font-bold text-[8px] animate-fade-in">
                  {vocabularyKeywords[currentKeyword]}
                </div>
                <div className="w-5 h-0.5 bg-[#1ca19a]/30 rounded-full mt-1"></div>
              </div>
            </div>
            
            {/* Page 3 - Second flipping animation */}
            <div className="absolute inset-0 flipping-page-2 bg-white/90 rounded-sm shadow-lg">
              <div className="p-1.5 h-full flex flex-col justify-center items-center">
                <div className="keyword-text text-[#16a085] font-bold text-[8px] animate-fade-in">
                  {vocabularyKeywords[(currentKeyword + 1) % vocabularyKeywords.length]}
                </div>
                <div className="w-4 h-0.5 bg-[#16a085]/30 rounded-full mt-1"></div>
              </div>
            </div>
          </div>
          
          {/* Book Cover Detail */}
          <div className="absolute top-4 left-4 right-4 flex flex-col items-center text-white">
            <div className="w-7 h-0.5 bg-white/60 rounded-full mb-1"></div>
            <div className="w-5 h-0.5 bg-white/40 rounded-full mb-1"></div>
            <div className="w-6 h-0.5 bg-white/50 rounded-full"></div>
          </div>
          
          {/* Small bookmark */}
          <div className="absolute top-0 right-4 w-1 h-6 bg-gradient-to-b from-[#f59e0b] to-[#d97706] rounded-b-sm"></div>
        </div>
      </div>

      {/* Loading Message */}
      <p className="text-sm font-medium text-gray-600 animate-pulse">
        {message}
      </p>
    </div>
  );
}