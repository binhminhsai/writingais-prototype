import { Link, useLocation } from "wouter";
import { useState } from "react";
import { PenSquare, LogIn, User } from "lucide-react";

export default function Header() {
  // Add this to make header accessible from all pages
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        {/* Logo/Website Name */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <PenSquare size={24} className="text-blue-200" />
            <h1 className="text-2xl font-bold cursor-pointer">
              Writing AI-Hub<span className="text-blue-200 text-lg"> Pro</span>
            </h1>
          </div>
        </Link>
        
        {/* Main Navigation - Desktop */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-8 px-4">
            <Link href="/">
              <span className={`hover:text-blue-200 cursor-pointer transition duration-200 ${location === "/" ? "text-white font-semibold border-b-2 border-white pb-1" : "text-blue-100"}`}>
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className={`hover:text-blue-200 cursor-pointer transition duration-200 ${location === "/about" ? "text-white font-semibold border-b-2 border-white pb-1" : "text-blue-100"}`}>
                About Us
              </span>
            </Link>
            <Link href="/writing-practice">
              <span className={`hover:text-blue-200 cursor-pointer transition duration-200 ${location === "/writing-practice" ? "text-white font-semibold border-b-2 border-white pb-1" : "text-blue-100"}`}>
                Writing Practice
              </span>
            </Link>
            <span className="text-blue-100 cursor-default">
              Vocabulary Builder
            </span>
            <span className="text-blue-100 cursor-default">
              Progress Tracking
            </span>
          </div>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="font-medium text-blue-800 bg-white px-5 py-2 rounded-full hover:bg-blue-50 transition duration-200 shadow-sm flex items-center gap-2">
            <User size={18} />
            <span>Sign Up / Login</span>
          </button>
          
          {/* Mobile Menu Toggle - Shows only on small screens */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white hover:text-blue-200"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-3 shadow-inner">
          <nav className="flex flex-col space-y-3">
            <Link href="/">
              <span 
                className={`block py-2 px-2 rounded ${location === "/" ? "bg-blue-800 text-white font-semibold" : "text-blue-100 hover:bg-blue-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </span>
            </Link>
            <Link href="/about">
              <span 
                className={`block py-2 px-2 rounded ${location === "/about" ? "bg-blue-800 text-white font-semibold" : "text-blue-100 hover:bg-blue-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </span>
            </Link>
            <Link href="/writing-practice">
              <span 
                className={`block py-2 px-2 rounded ${location === "/writing-practice" ? "bg-blue-800 text-white font-semibold" : "text-blue-100 hover:bg-blue-800 hover:text-white"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing Practice
              </span>
            </Link>
            <span className="block py-2 px-2 text-blue-200 border-t border-blue-600 mt-2 pt-3">
              Vocabulary Builder
            </span>
            <span className="block py-2 px-2 text-blue-200">
              Progress Tracking
            </span>
          </nav>
        </div>
      )}
    </header>
  );
}