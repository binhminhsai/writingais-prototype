import { Link, useLocation } from "wouter";

export default function Header() {
  // Add this to make header accessible from all pages
  const [location] = useLocation();
  
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary cursor-pointer">
            Writing AI-Hub<span className="text-gray-600 text-lg"></span>
          </h1>
        </Link>
        <nav>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className={`hover:text-primary cursor-pointer ${location === "/" ? "text-primary font-semibold" : "text-gray-600"}`}>
                Home
              </span>
            </Link>
            <Link href="/writing-practice">
              <span className={`hover:text-primary cursor-pointer ${location === "/writing-practice" ? "text-primary font-semibold" : "text-gray-600"}`}>
                Practice
              </span>
            </Link>
            <button className="font-medium text-white bg-primary px-4 py-2 rounded-md hover:opacity-90 transition">
              My Account
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
