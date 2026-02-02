"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroImage {
  id: number;
  image: string;
  order: number;
  active: boolean;
}

export default function Hero() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/hero-images");
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images - Crossfade */}
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img.image}
            alt="Hero background"
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Fallback background if no images */}
      {images.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-600" />
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center z-20 mb-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-xl text-right">
            {/* Subtitle */}
            <p className="text-gray-700 tracking-wide text-2xl font-semibold">
              We are Designers
            </p>

            {/* Logo */}
            <div className="flex justify-end mb-6">
              <Image
                src="/logo.png"
                alt="Enlighten Vibes"
                width={300}
                height={80}
                quality={100}
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </div>

            {/* Tagline */}
            <p className="text-gray-600 text-sm md:text-base">
              We bring clarity to complex ideas.
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
              Through text, design, digital platforms, and flawless execution, we help businesses
              and institutions plan, shape, and deliver engagement that works across print,
              digital, and physical spaces—clearly, credibly, and in ways people readily
              understand, trust, and act upon.
              <br />
              <span className="block mt-2">
                Welcome to infinite creativity with optimum engagement!
              </span>
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4">
              <a
                href="#about"
                className="px-6 py-2 border border-gray-800 text-gray-800 text-sm uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="#work"
                className="px-6 py-2 border border-gray-800 text-gray-800 text-sm uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
