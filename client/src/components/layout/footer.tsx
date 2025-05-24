import { Link } from "wouter";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-400">INNOVO Team</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Đội ngũ phát triển chuyên nghiệp, tạo ra những sản phẩm công nghệ 
              chất lượng cao để hỗ trợ học tập và phát triển kỹ năng.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-400">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/">
                <a className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Home
                </a>
              </Link>
              <Link href="/writing-practice">
                <a className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Writing Practice
                </a>
              </Link>
              <Link href="/vocabulary">
                <a className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Vocabulary
                </a>
              </Link>
              <Link href="/progress">
                <a className="text-gray-300 hover:text-white transition-colors text-sm block">
                  Progress
                </a>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-400">Features</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">IELTS Writing Practice</p>
              <p className="text-gray-300 text-sm">TOEFL Writing Practice</p>
              <p className="text-gray-300 text-sm">AI-Powered Feedback</p>
              <p className="text-gray-300 text-sm">Vocabulary Builder</p>
              <p className="text-gray-300 text-sm">Progress Tracking</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-teal-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-teal-400" />
                <span className="text-gray-300 text-sm">contact@innovo.team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-teal-400" />
                <span className="text-gray-300 text-sm">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-teal-400" />
                <span className="text-gray-300 text-sm">Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Writing AI-Hub. Developed by{" "}
                <span className="text-teal-400 font-semibold">INNOVO Team</span>.
                All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}