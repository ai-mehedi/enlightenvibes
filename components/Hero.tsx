"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const defaultImages = [
  "/hero/aziz-acharki-rGd8t-gbS5M-unsplash (1).jpg",
  "/hero/daniele-fasoli-sNQMXw8wT5U-unsplash.jpg",
  "/hero/vitaly-gariev-9vMz_AFV1as-unsplash.jpg",
];

const words = [
  "Designers",
  "Writers",
  "Visualisers",
  "Developers",
  "Coders",
  "Builders",
  "Doers",
];

export default function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch hero images from database
  useEffect(() => {
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHeroImages(data.map((img: { image: string }) => img.image));
        }
      })
      .catch(() => {
        // Keep default images on error
      });
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, heroImages.length]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 2500);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {heroImages.map((src, index) => {
        const isActive = index === currentIndex;
        const isPrev = index === prevIndex;

        return (
          <div
            key={src}
            className={`absolute inset-0 ${
              isActive ? "opacity-100 z-10" : isPrev ? "opacity-0 z-5" : "opacity-0 z-0"
            }`}
            style={{
              transition: "opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className={`absolute inset-0 ${isActive ? "animate-kenburns" : ""}`}>
              <Image
                src={src}
                alt={`Hero image ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-20" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-start z-20 container mx-auto h-full">
        <div className="text-right text-white px-8 md:px-16 lg:px-24 max-w-4xl">
          {/* Top tagline - animated text */}
          <div className="text-2xl md:text-4xl tracking-wide mb-2 drop-shadow-md text-white text-right flex items-baseline justify-end">
            <span>We are&nbsp;</span>
            <span className="inline-block relative overflow-hidden h-[1.2em]">
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? "opacity-0 -translate-y-full"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {words[wordIndex]}
              </span>
            </span>
          </div>

          {/* Main logo text */}
          <div className="flex items-center justify-end gap-3 md:gap-5 mb-6">
          <Image src={'/logo.png'} alt="Logo" width={400} height={200} />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl mb-4 drop-shadow-md text-white">
            We bring clarity to complex ideas.
          </p>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed mb-4 max-w-2xl ml-auto drop-shadow-sm text-white">
            Through text, design, digital platforms, and flawless execution, we help businesses
            and institutions plan, shape, and deliver engagement that works across print,
            digital, and physical spaces—clearly, credibly, and in ways people readily
            understand, trust, and act upon.
          </p>

          {/* Welcome text */}
          <p className="text-sm md:text-base mb-8 drop-shadow-md text-white">
            Welcome to infinite creativity with optimum engagement!
          </p>

          {/* Buttons */}
          <div className="flex items-end justify-end gap-4">
            <a
              href="/about"
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-sm uppercase tracking-wider transition-colors duration-300"
            >
              About Us
            </a>
            <a
              href="/work"
              className="px-6 py-3 bg-amber-600/80 hover:bg-amber-700 text-white text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Our Work
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-0.5%, -0.5%);
          }
        }
        :global(.animate-kenburns) {
          animation: kenburns 7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
      `}</style>
    </section>
  );
}
