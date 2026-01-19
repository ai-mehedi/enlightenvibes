"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string | null;
  order: number;
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        console.log("Team API response:", data);
        if (res.ok && Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error("Invalid response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const visibleMembers = members.slice(0, visibleCount);
  const hasMore = visibleCount < members.length;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-2 tracking-wide">
          TEAM
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 tracking-widest text-xs mb-6">
          WHO WE ARE
        </p>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-5xl mx-auto mb-12 leading-relaxed">
          Our success depends on the strength of our team. We are a multidisciplinary content and communications resource with in-house expertise spanning writing, journalism, editing, visual arts, design, development, filmmaking, event production, architecture, and digital platforms.
        </p>

        {/* Team Grid */}
        {loading ? (
          <div className="text-center py-8">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No team members found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {visibleMembers.map((member) => (
                <div key={member.id} className="text-center">
                  {/* Image */}
                  <div className="aspect-[3/4] bg-[#2d3a2d] mb-4 relative overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2d3a2d]" />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-bold tracking-widest text-gray-900 mb-1">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs text-gray-500 mb-3">{member.role}</p>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>

            {/* See More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleSeeMore}
                  className="px-8 py-3 border-2 border-gray-800 text-gray-800 text-sm uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-colors duration-300"
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
