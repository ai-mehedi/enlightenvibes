"use client";

import { Search, PenTool, Settings, Send } from "lucide-react";

export default function OurProcess() {
  const processes = [
    {
      icon: Search,
      title: "RESEARCH",
      description:
        "Grounded inquiry that reveals context, audience realities, and strategic direction before decisions are made",
    },
    {
      icon: PenTool,
      title: "CONCEPT",
      description:
        "Ideas shaped with intent, structure, and relevance, translating insight into clear creative direction.",
    },
    {
      icon: Settings,
      title: "DEVELOP",
      description:
        "Careful execution where design, content, and technology are built with precision.",
    },
    {
      icon: Send,
      title: "TEST",
      description:
        "Rigorous review ensuring accuracy, performance, and trust across real-world conditions.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-wide">
          <span className="text-gray-900">OUR </span>
          <span className="text-[#b8860b]">PROCESS</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-sm mb-6">
          WE MAKE OUR PARTNERS HAPPY
        </p>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
          We adopt a structured, strategic approach, allowing insight to guide intent, craft to shape ideas, and disciplined evaluation to ensure outcomes perform with clarity, accuracy, and purpose.
        </p>

        {/* Process Steps */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Dotted Line - Desktop only */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] border-t-2 border-dashed border-gray-300" />

            {processes.map((process, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Icon */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#b8860b]/30 flex items-center justify-center mb-6 bg-white z-10">
                  <process.icon className="w-10 h-10 md:w-12 md:h-12 text-gray-700" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold tracking-widest text-gray-900 mb-4">
                  {process.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
