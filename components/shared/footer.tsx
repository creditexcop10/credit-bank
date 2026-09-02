import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div>
            <Image 
              src="/logo-dark.png" 
              alt="CreditExpo" 
              width={120} 
              height={32} 
              className="h-8 w-auto mb-6" 
            />
            <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
              Building financial strength together with personalized banking solutions for every member. Your trusted partner in financial growth.
            </p>
            <div className="flex space-x-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <Link href="#" key={i} className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-primary rounded-lg transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-5 bg-primary rounded-full mr-3"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-blue-100/70 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/services" className="text-blue-100/70 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link href="/contact" className="text-blue-100/70 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-5 bg-teal-500 rounded-full mr-3"></div>
              Services
            </h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-blue-100/70 hover:text-white transition-colors text-sm">Personal Banking</Link></li>
              <li><Link href="/services" className="text-blue-100/70 hover:text-white transition-colors text-sm">Business Banking</Link></li>
              <li><Link href="/services" className="text-blue-100/70 hover:text-white transition-colors text-sm">Loans & Credit</Link></li>
              <li><Link href="/services" className="text-blue-100/70 hover:text-white transition-colors text-sm">Cards</Link></li>
            </ul>
          </div>

          {/* Member Services */}
          <div>
            <h4 className="font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-5 bg-purple-500 rounded-full mr-3"></div>
              Member Services
            </h4>
            <ul className="space-y-3">
              <li><Link href="/login" className="text-blue-100/70 hover:text-white transition-colors text-sm">Online Banking</Link></li>
              <li><Link href="/contact" className="text-blue-100/70 hover:text-white transition-colors text-sm">ATM Locations</Link></li>
              <li><Link href="/contact" className="text-blue-100/70 hover:text-white transition-colors text-sm">Security Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-blue-100/70 text-sm">© {new Date().getFullYear()} CreditExpo. All rights reserved.</p>
            <div className="flex items-center space-x-4 text-xs text-blue-100/50">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-green-400" /> FDIC Insured</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-blue-400" /> 256-bit SSL</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end gap-6">
            <Link href="/privacy" className="text-blue-100/70 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-blue-100/70 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-blue-100/70 hover:text-white text-sm transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}