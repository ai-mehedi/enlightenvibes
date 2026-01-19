"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Our Work", href: "#work" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Web Portal Design",
  "Printing",
  "Video Photography",
  "Event Management",
  "Branding",
  "Digital Marketing",
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Enlighten Vibes"
                width={150}
                height={50}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Enlighten Vibes is a multidisciplinary content and communications agency delivering excellence in design, development, video production, and event management.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b8860b] transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  House #12, Road #5, Block-A<br />
                  Banani, Dhaka-1213<br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#b8860b] flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#b8860b] flex-shrink-0" />
                <a
                  href="mailto:info@enlightenvibes.com"
                  className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors"
                >
                  info@enlightenvibes.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Enlighten Vibes. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
