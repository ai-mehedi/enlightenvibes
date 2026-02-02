"use client";

import Image from "next/image";

export default function WeAreCreative() {
  return (
    <section className="relative h-[300px] md:h-[350px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Untitled-5.png"
        alt="We are creative background"
        fill
        className="object-cover"
        sizes="100vw"
        quality={100}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] text-[#c4956a] font-light mb-3">
          WE ARE CREATIVE
        </h2>
        <p className="text-white/70 text-sm md:text-base tracking-widest">
          Tagline Here
        </p>
      </div>
    </section>
  );
}
