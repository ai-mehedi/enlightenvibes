"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  clientImage: string | null;
  content: string;
  rating: number;
  order: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance slides
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-wide">
          <span className="text-gray-900">CLIENT </span>
          <span className="text-[#b8860b]">TESTIMONIALS</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-xs mb-12">
          WHAT OUR CLIENTS SAY ABOUT US
        </p>

        {/* Testimonial Card */}
        {loading ? (
          <div className="text-center py-8">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No testimonials found.</div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-lg  p-8 md:p-12">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <Quote className="w-10 h-10 md:w-14 md:h-14 text-[#b8860b]/20" />
              </div>

              {/* Content */}
              <div className="text-center pt-8">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? "text-[#b8860b] fill-[#b8860b]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 italic">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </p>

                {/* Client Info */}
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mb-4">
                    {currentTestimonial.clientImage ? (
                      <Image
                        src={currentTestimonial.clientImage}
                        alt={currentTestimonial.clientName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#b8860b] flex items-center justify-center text-white text-xl font-bold">
                        {currentTestimonial.clientName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="font-bold text-gray-900 text-lg tracking-wide">
                    {currentTestimonial.clientName}
                  </h4>

                  {/* Role & Company */}
                  {(currentTestimonial.clientRole || currentTestimonial.clientCompany) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {currentTestimonial.clientRole}
                      {currentTestimonial.clientRole && currentTestimonial.clientCompany && " | "}
                      {currentTestimonial.clientCompany}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentIndex
                        ? "bg-[#b8860b]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
