"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { label: "Problem", amharic: "ምችት", href: "#problem" },
  { label: "Calculators", amharic: "ካልኩሌተር", href: "#calculators" },
  { label: "Comparison", amharic: "ሲሪት", href: "#comparison" },
  { label: "Get Documents", amharic: "ሰነዶች", href: "#pdf-generator" },
  { label: "Join Waitlist", amharic: "ወረቀት", href: "#waitlist" },
  { label: "FAQ", amharic: "ጥያቄ", href: "#faq" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "am">("en");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-teff-900/95 backdrop-blur-sm border-b-2 border-gold-500 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Ge'ez text */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Angular logo mark */}
            <div className="w-10 h-10 bg-gradient-to-br from-digital-500 to-digital-700 relative overflow-hidden"
              style={{
                clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)"
              }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-paper-50 font-bold text-lg">N</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg tracking-widest uppercase transition-colors ${
                scrolled ? "text-paper-50" : "text-paper-50"
              }`}>
                Netsalancer
              </span>
              <span className="amharic-accent text-xs">ኔትሳላንሰር</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold letter-spacing uppercase tracking-wider transition-colors group relative ${
                  scrolled ? "text-paper-100 hover:text-digital-500" : "text-paper-100/90 hover:text-digital-300"
                }`}
              >
                {language === "en" ? link.label : link.amharic}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-digital-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right side: Language toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className={`flex items-center gap-1 px-3 py-2 rounded text-xs font-semibold transition-colors border border-paper-100/30 ${
                scrolled 
                  ? "text-paper-100 hover:bg-teff-800 hover:border-digital-500" 
                  : "text-paper-100/80 hover:bg-teff-900 hover:border-digital-300"
              }`}
            >
              <Globe size={14} />
              <span>{language === "en" ? "EN" : "አም"}</span>
            </button>

            {/* CTA Button */}
            <a
              href="#pdf-generator"
              className="btn-primary"
            >
              Free Documents
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded transition-colors ${
              scrolled ? "text-digital-500 hover:bg-teff-800" : "text-paper-50 hover:bg-teff-900/50"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-teff-900 border-t-2 border-digital-500 shadow-lg animate-weave-in">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-paper-100 font-semibold uppercase tracking-wider text-xs hover:text-digital-500 transition-colors py-2 border-l-2 border-transparent hover:border-digital-500 pl-3"
              >
                {language === "en" ? link.label : link.amharic}
              </a>
            ))}
            
            <div className="pt-4 border-t border-teff-800 space-y-3">
              {/* Mobile language toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "am" : "en")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-digital-500 text-digital-500 font-semibold uppercase tracking-wider text-xs rounded transition-all hover:bg-digital-500 hover:text-paper-50"
              >
                <Globe size={14} />
                <span>{language === "en" ? "አማርኛ" : "English"}</span>
              </button>

              {/* Mobile CTA */}
              <a
                href="#pdf-generator"
                onClick={() => setIsOpen(false)}
                className="block btn-primary-lg w-full text-center"
              >
                Free Documents
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
