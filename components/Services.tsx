"use client";

import Image from "next/image";

export default function Services() {
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
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/servicebg.png"
        alt="Services background"
        fill
        className="object-cover"
        sizes="100vw"
        quality={100}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-wide gradient-text-animate">
          SERVICES
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-6 uppercase font-bold">
          <span className="text-[#c4956a]">WE ARE</span> <span className="text-gray-500">HERE FOR YOU</span>
        </p>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
          Through text, design, digital platforms, and flawless execution, we help businesses and institutions plan, shape, and deliver engagement that works across print, digital, and physical spaces—clearly, credibly, and in ways people readily understand, trust, and act upon.
        </p>

        {/* Services Grid */}
        <div className="container mx-auto">
          {/* Row 1 - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="pt-4">
                <div className="border-t-4 border-[#c4956a] pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <h3 className="text-base font-bold tracking-widest text-gray-900 leading-tight">
                      {service.title.split(" ").map((word, i) => (
                        <span key={i}>
                          {word}
                          {i === 0 && <br />}
                          {i > 0 && " "}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - 2 columns centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {services.slice(3, 5).map((service, index) => (
              <div key={index} className="pt-4">
                <div className="border-t-4 border-[#c4956a] pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <h3 className="text-base font-bold tracking-widest text-gray-900 leading-tight">
                      {service.title.split(" ").map((word, i) => (
                        <span key={i}>
                          {word}
                          {i === 0 && <br />}
                          {i > 0 && " "}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
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
