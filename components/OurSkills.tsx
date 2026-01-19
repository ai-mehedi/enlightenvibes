"use client";

export default function OurSkills() {
  const skills = [
    {
      title: "Editorial Intelligence",
      percentage: 90,
      description:
        "Advanced language command, editing discipline, and narrative judgement ensure content is accurate, persuasive, and appropriate for institutions that value credibility and public trust.",
      color: "bg-[#6b6b6b]",
    },
    {
      title: "Visual Design Mastery",
      percentage: 90,
      description:
        "Expert use of professional design tools enables structured layouts, visual consistency, and refined aesthetics across print and digital communication.",
      color: "bg-[#8b7355]",
    },
    {
      title: "Moving Image Craft",
      percentage: 80,
      description:
        "Cinematography, direction, and editing skills combine storytelling with technical precision, producing films and videos that explain, document, and engage audiences effectively.",
      color: "bg-[#7a7a7a]",
    },
    {
      title: "Creative Visualisation",
      percentage: 90,
      description:
        "The ability to see outcomes before execution allows ideas to be shaped clearly, reducing noise while strengthening meaning across formats and platforms.",
      color: "bg-[#c9a86c]",
    },
    {
      title: "Digital Development Capability",
      percentage: 95,
      description:
        "Coding, platform management, and technical integration ensure websites and digital products function reliably, remain accurate, and support long-term communication goals.",
      color: "bg-[#a08060]",
    },
    {
      title: "Production & Execution Control",
      percentage: 90,
      description:
        "Strong production management skills align creative ambition with timelines, budgets, and logistics, ensuring consistent delivery without compromise.",
      color: "bg-[#b8860b]",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-2 tracking-wide">
          OUR SKILLS
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-xs mb-12">
          OUR SET OF SKILLS
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Skills Description List */}
          <div className="mb-12 space-y-6">
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
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1 bg-gray-200 h-12 relative">
                  <div
                    className={`${skill.color} h-full flex items-center transition-all duration-1000`}
                    style={{ width: `${skill.percentage}%` }}
                  >
                    <span className="text-white font-medium pl-4 text-sm md:text-base">
                      {skill.title}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-xl md:text-2xl font-light text-gray-700">
                    {skill.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
