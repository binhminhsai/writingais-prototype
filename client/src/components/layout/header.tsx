import { Link, useLocation } from "wouter";
import { useState } from "react";
import { PenSquare, LogIn, User } from "lucide-react";

export default function Header() {
  // Add this to make header accessible from all pages
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo/Website Name */}
        <Link href="/">
          <div className="flex items-center space-x-1.5">
            <PenSquare size={20} className="text-teal-200" />
            <h1 className="text-xl font-bold cursor-pointer whitespace-nowrap">
              Writing AI-Hub
            </h1>
          </div>
        </Link>
        
        {/* Spacer to push nav to right */}
        <div className="flex-grow"></div>
        
        {/* Main Navigation - Desktop */}
        <nav className="hidden lg:flex items-center mr-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/">
              <button className={`px-3 py-1.5 rounded hover:bg-teal-500 transition whitespace-nowrap ${location === "/" ? "bg-teal-800 text-white font-medium" : "text-white"}`}>
                Home
              </button>
            </Link>
            <Link href="/about">
              <button className={`px-3 py-1.5 rounded hover:bg-teal-500 transition whitespace-nowrap ${location === "/about" ? "bg-teal-800 text-white font-medium" : "text-white"}`}>
                About Us
              </button>
            </Link>
            <Link href="/writing-practice">
              <button className={`px-3 py-1.5 rounded hover:bg-teal-500 transition whitespace-nowrap ${location === "/writing-practice" ? "bg-teal-800 text-white font-medium" : "text-white"}`}>
                Writing Practice
              </button>
            </Link>
            <Link href="/vocabulary">
              <button className={`px-3 py-1.5 rounded hover:bg-teal-500 transition whitespace-nowrap ${location === "/vocabulary" ? "bg-teal-800 text-white font-medium" : "text-white"}`}>
                Vocabulary
              </button>
            </Link>
            <Link href="/progress">
              <button className={`px-3 py-1.5 rounded hover:bg-teal-500 transition whitespace-nowrap ${location === "/progress" ? "bg-teal-800 text-white font-medium" : "text-white"}`}>
                Progress
              </button>
            </Link>
          </div>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center">
          <button className="font-medium text-teal-800 bg-white p-1.5 rounded hover:bg-teal-50 transition shadow-sm flex items-center gap-1.5 text-sm whitespace-nowrap">
            <User size={14} />
            <span className="hidden md:inline">Sign In</span>
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
        <div className="lg:hidden bg-teal-700 px-4 py-2 shadow-inner text-sm">
          <nav className="flex flex-col space-y-1">
            <Link href="/">
              <button 
                className={`w-full text-left py-1.5 px-2 rounded ${location === "/" ? "bg-teal-800 text-white font-medium" : "text-white hover:bg-teal-500"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </button>
            </Link>
            <Link href="/about">
              <button 
                className={`w-full text-left py-1.5 px-2 rounded ${location === "/about" ? "bg-teal-800 text-white font-medium" : "text-white hover:bg-teal-500"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </button>
            </Link>
            <Link href="/writing-practice">
              <button 
                className={`w-full text-left py-1.5 px-2 rounded ${location === "/writing-practice" ? "bg-teal-800 text-white font-medium" : "text-white hover:bg-teal-500"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing Practice
              </button>
            </Link>
            <Link href="/vocabulary">
              <button 
                className={`w-full text-left py-1.5 px-2 rounded ${location === "/vocabulary" ? "bg-teal-800 text-white font-medium" : "text-white hover:bg-teal-500"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Vocabulary
              </button>
            </Link>
            <Link href="/progress">
              <button 
                className={`w-full text-left py-1.5 px-2 rounded ${location === "/progress" ? "bg-teal-800 text-white font-medium" : "text-white hover:bg-teal-500"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Progress
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}