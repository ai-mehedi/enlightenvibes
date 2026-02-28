"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { title: "Designers", tagline: "We shape meaning, not just layouts." },
  { title: "Writers", tagline: "We turn ideas into language people trust." },
  { title: "Visualisers", tagline: "We see the story before it exists." },
  { title: "Developers", tagline: "We build what works, not what merely looks good." },
  { title: "Coders", tagline: "We speak to machines so humans don't have to." },
  { title: "Builders", tagline: "From platforms to products, we make things real." },
  { title: "Doers", tagline: "Strategy is useless until it moves." },
];

export default function WeAreCreative() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setFlipping(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[300px] md:h-[350px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Untitled-5.png"
        alt="We are creative background"
        fill
        className="object-cover"
        sizes="100vw"
        quality={100}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] text-[#c4956a] font-light mb-4 flex items-center gap-3">
          <span>WE ARE</span>
          <span className="flip-container inline-block" style={{ perspective: "600px" }}>
            <span
              className={`flip-word inline-block text-white font-semibold uppercase ${flipping ? "flip-out" : "flip-in"}`}
            >
              {slides[currentIndex].title}
            </span>
          </span>
        </h2>
        <div className="flip-container" style={{ perspective: "600px", minHeight: "24px" }}>
          <p
            className={`text-white/70 text-sm md:text-base tracking-widest ${flipping ? "flip-out" : "flip-in"}`}
          >
            {slides[currentIndex].tagline}
          </p>
        </div>
      </div>

      <style jsx>{`
        .flip-in {
          animation: flipIn 0.4s ease-out forwards;
        }
        .flip-out {
          animation: flipOut 0.4s ease-in forwards;
        }
        @keyframes flipIn {
          0% {
            transform: rotateX(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes flipOut {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
