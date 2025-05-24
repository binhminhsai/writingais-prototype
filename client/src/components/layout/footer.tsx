export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-600 text-white mt-auto">
      <div className="container mx-auto px-3 py-1">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-teal-100 text-xs">
              © 2025 Writing AI-Hub. Developed by{" "}
              <span className="text-white font-semibold">INNOVO Team</span>.
              All rights reserved.
            </p>
          </div>
          <div className="flex space-x-3">
            <a href="#" className="text-teal-200 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-200 hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-teal-200 hover:text-white text-xs transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}