"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Client = {
  id: number;
  name: string;
  image: string;
  order: number;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-widest text-center text-gray-800 mb-12 md:mb-16">
            MAJOR CLIENTS
          </h2>
          <p className="text-gray-500">Loading clients...</p>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-widest text-center text-gray-800 mb-12 md:mb-16">
          MAJOR CLIENTS
        </h2>

        {/* Clients Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-gray-200 rounded-lg p-4 md:p-6 flex flex-col items-center justify-center w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-18px)] lg:w-[calc(16.666%-20px)] aspect-square hover:bg-gray-300 transition-colors duration-300"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <p className="text-xs md:text-sm text-center text-gray-700 leading-tight">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
