"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function StatItem({ target, label, suffix, bgClass, barClass }: { target: number; label: string; suffix?: string; bgClass: string; barClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(target, 2000, inView);

  return (
    <div ref={ref} className={bgClass}>
      {/* Thick colored top bar */}
      <div className={`h-5 ${barClass}`} />
      <div className="text-center py-8 md:py-10">
        <p className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
          {formatNumber(count)}{suffix || ""}
        </p>
        <p className="text-xs md:text-sm tracking-widest text-[#c4956a]">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function OurNumbers() {
  const stats = [
    { target: 166, label: "PROJECTS", bg: "bg-[#3a3a3a]", bar: "bg-[#6b6b6b]" },
    { target: 12, label: "CLIENTS", bg: "bg-[#2e3a2e]", bar: "bg-[#4a5e4a]" },
    { target: 1100, label: "FOLLOWERS", bg: "bg-[#3a3030]", bar: "bg-[#6b5a4a]" },
    { target: 11, label: "YEARS", bg: "bg-[#2e3a32]", bar: "bg-[#4a5e4e]" },
  ];

  return (
    <section className="bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-2 tracking-wide">
          OUR <span className="text-[#c4956a]">NUMBERS</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-10 uppercase font-bold">
          <span className="text-[#c4956a]">SOME COOL</span> <span className="text-gray-400">FACTS ABOUT US</span>
        </p>
      </div>

      {/* Black spacer */}
     

      {/* Stats Grid - full width */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            target={stat.target}
            label={stat.label}
            bgClass={stat.bg}
            barClass={stat.bar}
          />
        ))}
      </div>

      {/* Black bottom spacer */}
      <div className="h-10 md:h-14 bg-[#1a1a1a]" />
    </section>
  );
}
