"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-2 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a href="#home">
          <Image src="/logo.png" alt="Logo" width={200} height={100} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-lg uppercase font-medium group transition-colors duration-300 ${
                scrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-gray-900" : "bg-white"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            scrolled
              ? "text-gray-700 hover:text-gray-900"
              : "text-white hover:text-gray-200"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="relative py-3 text-gray-700 hover:text-gray-900 uppercase text-sm font-medium border-b border-gray-100 last:border-0 group"
              style={{
                animation: isMenuOpen
                  ? `slideDown 0.3s ease-out ${index * 0.05}s both`
                  : "none",
              }}
            >
              {link.label}
              <span className="absolute left-0 bottom-2 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
