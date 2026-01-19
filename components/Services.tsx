"use client";

export default function Services() {
  const services = [
    {
      title: "STRATEGIC CONTENT",
      description:
        "From research and journalism to editorial leadership, we shape credible narratives that inform, persuade, and endure, aligning institutional intent with audience understanding across publications, campaigns, and long-term communication platforms, grounded in evidence, context, and trust.",
    },
    {
      title: "VISUAL EXPRESSION",
      description:
        "Through design, illustration, visual arts, and spatial thinking, we translate ideas into visual systems that attract attention, convey meaning, and reinforce credibility across print, digital, exhibitions, and environments with consistency, craft, discipline, and long-term value.",
    },
    {
      title: "DIGITAL PLATFORMS",
      description:
        "We design, build, and operate dependable digital platforms, combining development, coding, and content to ensure accuracy, performance, and continuity, supporting organisations that require trust, scale, and sustained public engagement over time, sectors, audiences, mandates, globally.",
    },
    {
      title: "MOVING IMAGE",
      description:
        "From short films to long-form productions, we plan and produce visual storytelling that explains, promotes, and documents, blending narrative discipline with technical craft to communicate messages clearly across channels and cultures with purpose, precision, impact.",
    },
    {
      title: "EXPERIENTIAL DELIVERY",
      description:
        "We conceive and deliver events, publications, and physical experiences, coordinating creative, technical, and logistical expertise to ensure ideas are not only expressed, but encountered, remembered, and trusted by diverse audiences across contexts, scales, institutions, sectors.",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4 tracking-wide">
          SERVICES
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-sm mb-6">
          WE ARE HERE FOR YOU
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
                <div className="border-t-4 border-orange-500 pt-6">
                  <h3 className="text-base font-bold tracking-widest text-gray-900 mb-4 leading-tight">
                    {service.title.split(" ").map((word, i) => (
                      <span key={i}>
                        {word}
                        {i === 0 && <br />}
                        {i > 0 && " "}
                      </span>
                    ))}
                  </h3>
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
                <div className="border-t-4 border-orange-500 pt-6">
                  <h3 className="text-base font-bold tracking-widest text-gray-900 mb-4 leading-tight">
                    {service.title.split(" ").map((word, i) => (
                      <span key={i}>
                        {word}
                        {i === 0 && <br />}
                        {i > 0 && " "}
                      </span>
                    ))}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
