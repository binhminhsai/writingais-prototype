import { Link, useLocation } from "wouter";
import { useState } from "react";
import { PenSquare, LogIn, User } from "lucide-react";

export default function Header() {
  // Add this to make header accessible from all pages
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
        {/* Logo/Website Name */}
        <Link href="/">
          <div className="flex items-center space-x-1.5">
            <PenSquare size={20} className="text-teal-200" />
            <h1 className="text-xl font-bold cursor-pointer">
              Writing AI-Hub<span className="text-teal-200 text-sm"> Pro</span>
            </h1>
          </div>
        </Link>
        
        {/* Main Navigation - Desktop */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-6 px-3 text-sm">
            <Link href="/">
              <span className={`hover:text-teal-200 cursor-pointer transition duration-200 ${location === "/" ? "text-white font-semibold border-b-2 border-teal-200 pb-1" : "text-teal-50"}`}>
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className={`hover:text-teal-200 cursor-pointer transition duration-200 ${location === "/about" ? "text-white font-semibold border-b-2 border-teal-200 pb-1" : "text-teal-50"}`}>
                About Us
              </span>
            </Link>
            <Link href="/writing-practice">
              <span className={`hover:text-teal-200 cursor-pointer transition duration-200 ${location === "/writing-practice" ? "text-white font-semibold border-b-2 border-teal-200 pb-1" : "text-teal-50"}`}>
                Writing Practice
              </span>
            </Link>
            <span className="text-teal-100 cursor-default text-sm">
              Vocabulary Builder
            </span>
            <span className="text-teal-100 cursor-default text-sm">
              Progress Tracking
            </span>
          </div>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <button className="font-medium text-teal-800 bg-white px-4 py-1.5 rounded-full hover:bg-teal-50 transition duration-200 shadow-sm flex items-center gap-1.5 text-sm">
            <User size={14} />
            <span>Sign Up / Login</span>
          </button>
          
          {/* Mobile Menu Toggle - Shows only on small screens */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white hover:text-teal-200"
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
        <div className="md:hidden bg-teal-700 px-4 py-2 shadow-inner text-sm">
          <nav className="flex flex-col space-y-2">
            <Link href="/">
              <span 
                className={`block py-1.5 px-2 rounded ${location === "/" ? "bg-teal-800 text-white font-semibold" : "text-teal-100 hover:bg-teal-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </span>
            </Link>
            <Link href="/about">
              <span 
                className={`block py-1.5 px-2 rounded ${location === "/about" ? "bg-teal-800 text-white font-semibold" : "text-teal-100 hover:bg-teal-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </span>
            </Link>
            <Link href="/writing-practice">
              <span 
                className={`block py-1.5 px-2 rounded ${location === "/writing-practice" ? "bg-teal-800 text-white font-semibold" : "text-teal-100 hover:bg-teal-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing Practice
              </span>
            </Link>
            <span className="block py-1.5 px-2 text-teal-200 border-t border-teal-600 mt-1 pt-2 text-xs">
              Vocabulary Builder
            </span>
            <span className="block py-1.5 px-2 text-teal-200 text-xs">
              Progress Tracking
            </span>
          </nav>
        </div>
      )}
    </header>
  );
}