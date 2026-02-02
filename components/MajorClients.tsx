"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Client {
  id: number;
  name: string;
  image: string;
  order: number;
}

export default function MajorClients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    };

    fetchClients();
  }, []);

  if (clients.length === 0) return null;

  return (
    <section className=" py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 tracking-wide gradient-text-animate">
            MAJOR CLIENTS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are proud to work with leading organizations across various industries
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3 justify-items-center">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className={`w-full aspect-square flex flex-col items-center justify-center p-4 ${
                index % 2 === 0 ? "bg-[#c8c8c8]" : "bg-[#a8a8a8]"
              }`}
            >
              <div className="flex-1 flex items-center justify-center w-full">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={200}
                  height={200}
                  className="w-28 h-28 md:w-32 md:h-32 object-contain"
                />
              </div>
              <p className="text-xs md:text-sm text-gray-800 text-center leading-tight">
                {client.name}
              </p>
            </div>
          ))}
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
