"use client";

import { Eye, ThumbsUp, Send, FlaskConical } from "lucide-react";

export default function HowWeWork() {
  const workItems = [
    {
      icon: Eye,
      title: "AWESOME",
      description:
        "High standards, thoughtful execution, and outcomes that consistently exceed expectation without noise or excess.",
    },
    {
      icon: ThumbsUp,
      title: "INNOVATIVE",
      description:
        "Fresh thinking grounded in research, practicality, and relevance rather than novelty for its own sake.",
    },
    {
      icon: Send,
      title: "CREATIVE",
      description:
        "Ideas shaped with intent, craft, and restraint, while ensuring originality serves meaning, not only just mere spectacle.",
    },
    {
      icon: FlaskConical,
      title: "EXPERIMENTAL",
      description:
        "Every engagement designed to be felt, understood, and remembered across variable physical, digital, and human touchpoints.",
    },
  ];

  return (
    <section
      className="py-8 md:py-16 relative"
      style={{
        backgroundImage: "url('/hero/1768817084619-Hero_Section_04.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-6 tracking-wide">
          HOW WE WORK
        </h2>

        {/* Description */}
        <p className="text-center text-gray-200 max-w-3xl mx-auto mb-16 leading-relaxed">
          We work with quiet precision and disciplined imagination, guiding ideas from first thought to trusted outcomes with clarity, care, and purpose.
        </p>

        {/* Work Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {workItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-white/50 flex items-center justify-center mb-6">
                <item.icon className="w-10 h-10 md:w-12 md:h-12 text-white/80" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-semibold tracking-widest text-white mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
