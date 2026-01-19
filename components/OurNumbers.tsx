"use client";

export default function OurNumbers() {
  const stats = [
    { number: "166", label: "PROJECTS" },
    { number: "12", label: "CLIENTS" },
    { number: "1100", label: "FOLLOWERS" },
    { number: "11", label: "YEARS" },
  ];

  return (
    <section
      className="py-12 md:py-16 relative"
      style={{
        backgroundImage: "url('/SFA_4038.JPG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#5a5a5a]/85" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-2 tracking-wide">
          OUR NUMBERS
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-300 tracking-widest text-xs mb-10">
          SOME COOL FACTS ABOUT US
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#4a4a4a]" : "bg-[#3a3a3a]"
              } border-t-4 border-green-500 py-8 md:py-10`}
            >
              <div className="text-center">
                {/* Number */}
                <p className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2">
                  {stat.number}
                </p>
                {/* Label */}
                <p className="text-xs md:text-sm tracking-widest text-gray-400">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
