import { Link, useLocation } from "wouter";
import { useState } from "react";
import { User } from "lucide-react";
import logoImage from "@assets/ChatGPT Image May 24, 2025, 09_40_14 PM.png";

export default function Header() {
  // Add this to make header accessible from all pages
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg mb-2 border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Website Name */}
        <Link href="/">
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="VAI Logo" 
              className="w-10 h-10 object-contain filter brightness-110"
            />
            <h1 className="text-2xl font-bold cursor-pointer whitespace-nowrap bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Writing AI-Hub
            </h1>
          </div>
        </Link>
        
        {/* Spacer to push nav to right */}
        <div className="flex-grow"></div>
        
        {/* Main Navigation - Desktop */}
        <nav className="hidden lg:flex items-center mr-4">
          <div className="flex items-center space-x-1">
            <Link href="/">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === "/" ? "bg-slate-700 text-white border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-800"}`}>
                Home
              </button>
            </Link>
            <Link href="/about">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === "/about" ? "bg-slate-700 text-white border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-800"}`}>
                About Us
              </button>
            </Link>
            <Link href="/writing-practice">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === "/writing-practice" ? "bg-slate-700 text-white border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-800"}`}>
                Writing Practice
              </button>
            </Link>
            <Link href="/vocabulary">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === "/vocabulary" ? "bg-slate-700 text-white border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-800"}`}>
                Vocabulary
              </button>
            </Link>
            <Link href="/progress">
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location === "/progress" ? "bg-slate-700 text-white border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-800"}`}>
                Progress
              </button>
            </Link>
          </div>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm whitespace-nowrap border border-blue-500 hover:border-blue-400">
            <User size={16} className="text-blue-100" />
            <span className="hidden sm:inline">Login</span>
          </button>
          
          {/* Mobile Menu Toggle - Shows only on small screens */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-white hover:text-teal-200 ml-3"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 px-4 py-3 shadow-inner text-sm border-t border-slate-700">
          <nav className="flex flex-col space-y-2">
            <Link href="/">
              <button 
                className={`w-full text-left py-2.5 px-3 rounded-lg transition-all duration-200 ${location === "/" ? "bg-slate-700 text-white font-medium border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </button>
            </Link>
            <Link href="/about">
              <button 
                className={`w-full text-left py-2.5 px-3 rounded-lg transition-all duration-200 ${location === "/about" ? "bg-slate-700 text-white font-medium border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </button>
            </Link>
            <Link href="/writing-practice">
              <button 
                className={`w-full text-left py-2.5 px-3 rounded-lg transition-all duration-200 ${location === "/writing-practice" ? "bg-slate-700 text-white font-medium border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing Practice
              </button>
            </Link>
            <Link href="/vocabulary">
              <button 
                className={`w-full text-left py-2.5 px-3 rounded-lg transition-all duration-200 ${location === "/vocabulary" ? "bg-slate-700 text-white font-medium border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Vocabulary
              </button>
            </Link>
            <Link href="/progress">
              <button 
                className={`w-full text-left py-2.5 px-3 rounded-lg transition-all duration-200 ${location === "/progress" ? "bg-slate-700 text-white font-medium border border-slate-600 shadow-md" : "text-gray-300 hover:text-white hover:bg-slate-700"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Progress
              </button>
            </Link>
            
            {/* Authentication options for mobile */}
            <div className="pt-3 mt-2 border-t border-slate-600">
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border border-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} className="text-blue-100" />
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}