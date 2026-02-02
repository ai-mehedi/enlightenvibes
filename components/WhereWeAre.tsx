"use client";

export default function WhereWeAre() {
  return (
    <section className="py-16 md:py-24 bg-[#efefef]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-wide gradient-text-animate">
          WHERE WE ARE
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-12 uppercase font-bold">
          <span className="text-[#c4956a]">LOCATE US</span>{" "}
          <span className="text-gray-500">ON GOOGLE MAP</span>
        </p>

        {/* Map */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-2 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d90.391927!3d23.865505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5000775f1f5%3A0xcd19798589576662!2sEnlighten%20Vibes!5e0!3m2!1sen!2sbd!4v1706832000000!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Enlighten Vibes Office Location"
            />
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
