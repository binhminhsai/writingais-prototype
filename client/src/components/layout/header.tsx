import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          EvP<span className="text-gray-600 text-lg">- English Writing Practice</span>
        </h1>
        <nav>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="text-gray-600 hover:text-primary">Home</a>
            </Link>
            <Link href="/writing-practice">
              <a className="text-gray-600 hover:text-primary">Practice</a>
            </Link>
            <button className="font-medium text-white bg-primary px-4 py-2 rounded-md hover:bg-blue-600 transition">
              My Account
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
