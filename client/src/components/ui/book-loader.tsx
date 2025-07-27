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
      {/* Open Book Animation */}
      <div className="relative w-24 h-16">
        {/* Left Page */}
        <div className="absolute left-0 top-0 w-11 h-16 bg-gradient-to-br from-[#1ca19a] to-[#16a085] rounded-l-lg shadow-md">
          <div className="absolute inset-1 bg-white/95 rounded-l-sm"></div>
        </div>
        
        {/* Right Page */}
        <div className="absolute right-0 top-0 w-11 h-16 bg-gradient-to-bl from-[#1ca19a] to-[#16a085] rounded-r-lg shadow-md">
          <div className="absolute inset-1 bg-white/95 rounded-r-sm"></div>
        </div>
        
        {/* Central Spine */}
        <div className="absolute left-1/2 top-0 w-0.5 h-16 bg-gradient-to-b from-[#148f82] to-[#0f6b63] transform -translate-x-0.5"></div>
        
        {/* Animated Flipping Pages */}
        <div className="absolute inset-0">
          {/* First Flipping Page */}
          <div className="absolute right-1 top-1 w-10 h-14 bg-white/80 rounded-r-sm shadow-lg open-book-flip-1 transform-gpu">
          </div>
          
          {/* Second Flipping Page */}
          <div className="absolute right-1 top-1 w-10 h-14 bg-white/70 rounded-r-sm shadow-md open-book-flip-2 transform-gpu">
          </div>
        </div>
        
        {/* Book Glow Effect */}
        <div className="absolute inset-0 rounded-lg book-glow-open"></div>
      </div>

      {/* Loading Message */}
      <p className="text-sm font-medium text-gray-600 animate-pulse">
        {message}
      </p>
    </div>
  );
}