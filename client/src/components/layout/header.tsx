import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary cursor-pointer">
            EvP<span className="text-gray-600 text-lg">- English Writing Practice</span>
          </h1>
        </Link>
        <nav>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-gray-600 hover:text-primary cursor-pointer">Home</span>
            </Link>
            <Link href="/writing-practice">
              <span className="text-gray-600 hover:text-primary cursor-pointer">Practice</span>
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
