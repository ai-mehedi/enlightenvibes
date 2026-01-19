"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-wide">
          <span className="text-gray-900">GET IN </span>
          <span className="text-[#b8860b]">TOUCH</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-xs mb-12">
          WE&apos;D LOVE TO HEAR FROM YOU
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#b8860b]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      House #12, Road #5, Block-A<br />
                      Banani, Dhaka-1213<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#b8860b]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-sm text-gray-600">
                      <a href="tel:+8801700000000" className="hover:text-[#b8860b] transition-colors">
                        +880 1700-000000
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      <a href="tel:+8801800000000" className="hover:text-[#b8860b] transition-colors">
                        +880 1800-000000
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#b8860b]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-sm text-gray-600">
                      <a href="mailto:info@enlightenvibes.com" className="hover:text-[#b8860b] transition-colors">
                        info@enlightenvibes.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      <a href="mailto:hello@enlightenvibes.com" className="hover:text-[#b8860b] transition-colors">
                        hello@enlightenvibes.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#b8860b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#b8860b]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-sm text-gray-600">
                      Sunday - Thursday<br />
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>

                {sent && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] transition-colors"
                        placeholder="+880 1700-000000"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full md:w-auto px-8 py-3 bg-[#b8860b] text-white font-medium rounded-lg hover:bg-[#9a7209] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Enlighten+Vibes,Dhaka,Bangladesh&zoom=17"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Enlighten Vibes Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
