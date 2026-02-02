"use client";

import { useState, useEffect, useRef } from "react";

function AnimatedBar({ skill, index }: { skill: { title: string; percentage: number; description: string; barColor: string }; index: number }) {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} key={index} className="flex items-center gap-2">
      <div className="flex-1 bg-[#c4956a] h-11 relative flex">
        {/* Colored left accent */}
        <div className="w-2 bg-[#c4956a] h-full flex-shrink-0 z-10" />
        <div
          className="bg-[#4a4a4a] h-full flex items-center transition-all duration-1000 ease-out"
          style={{ width: inView ? `${skill.percentage}%` : "0%" }}
        >
          <span className="text-white font-medium pl-4 text-sm whitespace-nowrap">
            {skill.title}
          </span>
        </div>
      </div>
      <div className="w-14 text-right">
        <span className="text-lg md:text-xl font-semibold text-[#c4956a]">
          {skill.percentage}%
        </span>
      </div>
    </div>
  );
}

export default function OurSkills() {
  const skills = [
    {
      title: "Editorial Intelligence",
      percentage: 90,
      description:
        "Advanced language command, editing discipline, and narrative judgement ensure content is accurate, persuasive, and appropriate for institutions that value credibility and public trust.",
      barColor: "bg-[#5a5a5a]",
    },
    {
      title: "Visual Design Mastery",
      percentage: 90,
      description:
        "Expert use of professional design tools enables structured layouts, visual consistency, and refined aesthetics across print and digital communication.",
      barColor: "bg-[#5a5a5a]",
    },
    {
      title: "Moving Image Craft",
      percentage: 80,
      description:
        "Cinematography, direction, and editing skills combine storytelling with technical precision, producing films and videos that explain, document, and engage audiences effectively.",
      barColor: "bg-[#c8956a]",
    },
    {
      title: "Creative Visualisation",
      percentage: 90,
      description:
        "The ability to see outcomes before execution allows ideas to be shaped clearly, reducing noise while strengthening meaning across formats and platforms.",
      barColor: "bg-[#5a5a5a]",
    },
    {
      title: "Digital Development Capability",
      percentage: 95,
      description:
        "Coding, platform management, and technical integration ensure websites and digital products function reliably, remain accurate, and support long-term communication goals.",
      barColor: "bg-[#c8956a]",
    },
    {
      title: "Production & Execution Control",
      percentage: 90,
      description:
        "Strong production management skills align creative ambition with timelines, budgets, and logistics, ensuring consistent delivery without compromise.",
      barColor: "bg-[#5a5a5a]",
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-wide gradient-text-animate">
          OUR SKILLS
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-12 uppercase font-bold">
          OUR SET OF <span className="text-[#c4956a]">SKILLS</span>
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Skills Description List */}
          <div className="mb-12 space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900 mb-1">
                  {skill.title}/ {skill.percentage}+
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <AnimatedBar key={index} skill={skill} index={index} />
            ))}
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
