"use client";

import { useState } from "react";
import { Linkedin, Facebook, Youtube } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#2a2a2a]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-wide gradient-text-animate">
          CONTACT
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-12 uppercase font-bold text-gray-400">
          EMAIL, MESSAGE, OR CALL US
        </p>

        {sent && (
          <div className="max-w-5xl mx-auto mb-6 p-4 bg-green-900/30 border border-green-700 text-green-400 text-sm text-center">
            Thank you for your message! We&apos;ll get back to you soon.
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left - Contact Info */}
            <div className="text-center text-gray-300 space-y-4">
              <p className="text-sm tracking-wider">
                <span className="text-gray-300">ENLIGHTEN</span>{" "}
                <span className="border-l border-gray-500 pl-2 font-bold text-white">VIBES</span>
              </p>

              <div className="text-sm leading-relaxed space-y-1">
                <p>6 Road-3, Sector 05</p>
                <p>Uttara, Dhaka-1230, Bangladesh.</p>
                <p>Tel: 01711-563222</p>
                <p>Email: enlightenvibes@gmail.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity border border-gray-600"
                  aria-label="X"
                >
                  <span className="text-white text-sm font-bold">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-[#ff0000] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#c4956a] transition-colors"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#c4956a] transition-colors"
                    placeholder="Email"
                  />
                </div>

                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#c4956a] transition-colors resize-none"
                  placeholder="Message"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-8 py-2 border border-gray-400 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-gray-900 transition-colors duration-300 disabled:opacity-70"
                  >
                    {sending ? "SENDING..." : "SEND"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text-animate {
          background: linear-gradient(
            90deg,
            #2c2c2c,
            #4a3728,
            #8b6f4e,
            #c4956a,
            #8b6f4e,
            #4a3728,
            #2c2c2c,
            #4a3728,
            #8b6f4e,
            #c4956a,
            #8b6f4e,
            #4a3728,
            #2c2c2c
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease-in-out infinite alternate;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
      `}</style>
    </section>
  );
}
