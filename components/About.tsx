"use client";

import Image from "next/image";

export default function About() {
  const services = [
    {
      title: "STRATEGIC CONTENT",
      icon: "/icon/STRATEGIC.svg",
      description:
        "From research and journalism to editorial leadership, we shape credible narratives that inform, persuade, and endure, aligning institutional intent with audience understanding across publications, campaigns, and long-term communication platforms, grounded in evidence, context, and trust.",
    },
    {
      title: "VISUAL EXPRESSION",
      icon: "/icon/VISUAL.svg",
      description:
        "Through design, illustration, visual arts, and spatial thinking, we translate ideas into visual systems that attract attention, convey meaning, and reinforce credibility across print, digital, exhibitions, and environments with consistency, craft, discipline, and long-term value.",
    },
    {
      title: "DIGITAL PLATFORMS",
      icon: "/icon/DIGITAL.svg",
      description:
        "We design, build, and operate dependable digital platforms, combining development, coding, and content to ensure accuracy, performance, and continuity, supporting organisations that require trust, scale, and sustained public engagement over time, sectors, audiences, mandates, globally.",
    },
    {
      title: "MOVING IMAGE",
      icon: "/icon/MOVING.svg",
      description:
        "From short films to long-form productions, we plan and produce visual storytelling that explains, promotes, and documents, blending narrative discipline with technical craft to communicate messages clearly across channels and cultures with purpose, precision, impact.",
    },
    {
      title: "EXPERIENTIAL DELIVERY",
      icon: "/icon/EXPERIENTIAL.svg",
      description:
        "We conceive and deliver events, publications, and physical experiences, coordinating creative, technical, and logistical expertise to ensure ideas are not only expressed, but encountered, remembered, and trusted by diverse audiences across contexts, scales, institutions, sectors.",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 tracking-wide gradient-text-animate">
          ABOUT US
        </h2>

        {/* Tagline */}
        <p className="text-center text-gray-600 mb-4 uppercase tracking-widest font-bold">
          <span className="text-[#c4956a]">We bring clarity</span> to complex ideas.
        </p>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-4 leading-relaxed">
          Through text, design, digital platforms, and flawless execution, we help businesses and institutions plan, shape, and deliver engagement that works across print, digital, and physical spaces—clearly, credibly, and in ways people readily understand, trust, and act upon.
        </p>

        {/* Welcome text */}
        <p className="text-center text-gray-600 mb-12 font-bold">
          Welcome to infinite creativity with optimum engagement!
        </p>

        {/* Services Grid */}
        <div className="container mx-auto">
          {/* Row 1 - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-300">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={index}
                className="border-r border-b border-gray-300 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <h3 className="text-sm md:text-base font-semibold tracking-widest text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 - 2 columns centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border-l border-gray-300">
            {services.slice(3, 5).map((service, index) => (
              <div
                key={index}
                className="border-r border-b border-gray-300 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <h3 className="text-sm md:text-base font-semibold tracking-widest text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
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
