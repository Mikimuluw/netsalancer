"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Calculators", href: "#calculators" },
  { label: "Comparison", href: "#comparison" },
  { label: "Get Documents", href: "#pdf-generator" },
  { label: "Join Waitlist", href: "#waitlist" },
  { label: "FAQ", href: "#faq" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-2 h-6 rounded-sm bg-et-green"></div>
              <div className="w-2 h-6 rounded-sm bg-et-gold"></div>
              <div className="w-2 h-6 rounded-sm bg-et-red"></div>
            </div>
            <span
              className={`font-bold text-xl ${scrolled ? "text-et-dark" : "text-white"}`}
            >
              Netsalancer
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-et-green ${
                  scrolled ? "text-gray-600" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pdf-generator"
              className="bg-et-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-et-green-dark transition-colors"
            >
              Get Free Documents
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? "text-et-dark" : "text-white"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 font-medium hover:text-et-green transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pdf-generator"
              onClick={() => setIsOpen(false)}
              className="block bg-et-green text-white px-4 py-3 rounded-lg font-semibold text-center mt-2 hover:bg-et-green-dark transition-colors"
            >
              Get Free Documents
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
