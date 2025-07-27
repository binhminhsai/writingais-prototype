import React from "react";

interface BookLoaderProps {
  message?: string;
  className?: string;
}

export function BookLoader({ 
  message = "Flipping through our vocabulary archive...", 
  className = "" 
}: BookLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Animated Book */}
      <div className="relative">
        {/* Book Base */}
        <div className="relative w-16 h-20 bg-gradient-to-br from-[#1ca19a] to-[#16a085] rounded-lg shadow-lg book-glow">
          {/* Book Spine */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#148f82] to-[#0f6b63] rounded-l-lg"></div>
          
          {/* Pages */}
          <div className="absolute right-1 top-2 bottom-2 w-0.5 bg-white/30 rounded-full"></div>
          <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-white/20 rounded-full"></div>
          <div className="absolute right-3 top-2 bottom-2 w-0.5 bg-white/15 rounded-full"></div>
          
          {/* Flipping Page Animation */}
          <div className="absolute top-1 left-2 right-1 bottom-1">
            <div className="flipping-page bg-white/90 rounded-sm shadow-md transform-gpu"></div>
          </div>
          
          {/* Book Cover Detail */}
          <div className="absolute top-3 left-3 right-3 flex flex-col items-center text-white">
            <div className="w-6 h-0.5 bg-white/60 rounded-full mb-1"></div>
            <div className="w-4 h-0.5 bg-white/40 rounded-full mb-1"></div>
            <div className="w-5 h-0.5 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <p className="text-sm font-medium text-gray-600 animate-pulse">
        {message}
      </p>
    </div>
  );
}