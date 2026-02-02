"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image: string | null;
  videoUrl: string | null;
  clientName: string | null;
  projectDate: string | null;
  order: number;
}

const categories = [
  "ALL",
  "WEB PORTAL DESIGN",
  "PRINTING",
  "VIDEO PHOTOGRAPHY",
  "EVENTS",
];

export default function OurWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setProjects(data);
          setFilteredProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === "ALL") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="work" className="pt-16 md:pt-16 bg-white">
      {/* Heading & Filter - centered */}
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-wide gradient-text-animate">
          OUR WORK
        </h2>

        {/* Subtitle */}
        <p className="text-center tracking-widest text-xs mb-10 uppercase font-bold">
          <span className="text-[#c4956a]">A GLIMPSE</span> <span className="text-gray-500">OF OUR RECENT PROJECTS</span>
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs md:text-sm tracking-wider transition-colors pb-2 border-b-2 ${
                activeCategory === category
                  ? "text-gray-900 border-gray-900 font-semibold"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid - full width */}
      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No projects found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="aspect-square bg-gray-200 relative overflow-hidden cursor-pointer group"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}

                {/* Video indicator */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <p className="text-sm font-semibold">{project.title}</p>
                    <p className="text-xs mt-1">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Video or Image */}
              {selectedProject.videoUrl ? (
                <div className="aspect-video w-full mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedProject.videoUrl)}`}
                    title={selectedProject.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selectedProject.image ? (
                <div className="aspect-video w-full mb-4 relative">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="800px"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full mb-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg" />
              )}

              {/* Project Details */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{selectedProject.category}</span>
                  </div>
                  {selectedProject.clientName && (
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <span className="ml-2 font-medium">{selectedProject.clientName}</span>
                    </div>
                  )}
                  {selectedProject.projectDate && (
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="ml-2 font-medium">{selectedProject.projectDate}</span>
                    </div>
                  )}
                </div>

                {selectedProject.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
