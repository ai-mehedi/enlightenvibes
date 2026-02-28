"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectImage {
  id: number;
  image: string;
  width: number;
  height: number;
  isMain: boolean;
  order: number;
}

interface Project {
  id: number;
  title: string;
  description: string | null;
  categoryId: number | null;
  categoryName: string | null;
  image: string | null;
  videoUrl: string | null;
  clientName: string | null;
  projectDate: string | null;
  order: number;
  images: ProjectImage[];
}

interface Category {
  id: number;
  name: string;
  order: number;
}

export default function OurWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/categories"),
        ]);
        const projectsData = await projectsRes.json();
        const categoriesData = await categoriesRes.json();
        if (projectsRes.ok && Array.isArray(projectsData)) {
          setProjects(projectsData);
        }
        if (categoriesRes.ok && Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.categoryId === activeCategory)
    : projects;

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const getCoverImage = (project: Project) => {
    return (
      project.images?.find((i) => i.isMain)?.image ||
      project.images?.[0]?.image ||
      project.image
    );
  };

  const getCoverRatio = (project: Project) => {
    const mainImg =
      project.images?.find((i) => i.isMain) || project.images?.[0];
    if (mainImg && mainImg.width && mainImg.height) {
      return mainImg.width / mainImg.height;
    }
    return 1;
  };

  const getGalleryImages = (project: Project) => {
    if (!project.images || project.images.length === 0) return [];
    return project.images
      .filter((i) => !i.isMain)
      .sort((a, b) => a.order - b.order);
  };

  const getAllImages = (project: Project) => {
    if (!project.images || project.images.length === 0) {
      return project.image ? [project.image] : [];
    }
    const main = project.images.find((i) => i.isMain);
    const rest = project.images
      .filter((i) => !i.isMain)
      .sort((a, b) => a.order - b.order);
    const sorted = main ? [main, ...rest] : rest;
    return sorted.map((i) => i.image);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  };

  const openLightbox = (image: string, project: Project) => {
    const allImgs = getAllImages(project);
    const idx = allImgs.indexOf(image);
    setLightboxImage(image);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedProject) return;
    const allImgs = getAllImages(selectedProject);
    if (allImgs.length === 0) return;
    let newIndex =
      direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;
    if (newIndex < 0) newIndex = allImgs.length - 1;
    if (newIndex >= allImgs.length) newIndex = 0;
    setLightboxIndex(newIndex);
    setLightboxImage(allImgs[newIndex]);
  };

  return (
    <section id="work" className="pt-16 md:pt-16 bg-white">
      {/* Heading */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-wide gradient-text-animate">
          OUR WORK
        </h2>
        <p className="text-center tracking-widest text-xs mb-10 uppercase font-bold">
          <span className="text-[#c4956a]">A GLIMPSE</span>{" "}
          <span className="text-gray-500">OF OUR RECENT PROJECTS</span>
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                activeCategory === null
                  ? "bg-[#c4956a] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#c4956a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No projects found.
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 gap-1 px-1">
          {filteredProjects.map((project) => {
            const coverImage = getCoverImage(project);
            return (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="mb-1 break-inside-avoid overflow-hidden cursor-pointer group relative"
              >
                {coverImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={coverImage}
                    alt={project.title}
                    className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-300 to-gray-400" />
                )}

                {/* Video indicator */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <p className="text-sm font-semibold">{project.title}</p>
                    {project.categoryName && (
                      <p className="text-xs mt-1 text-gray-300 uppercase tracking-wider">
                        {project.categoryName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && !lightboxImage && (
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
              {/* Main Image */}
              {getCoverImage(selectedProject) && (
                <div
                  className="w-full mb-4 cursor-pointer"
                  onClick={() =>
                    openLightbox(
                      getCoverImage(selectedProject)!,
                      selectedProject
                    )
                  }
                >
                  <Image
                    src={getCoverImage(selectedProject)!}
                    alt={selectedProject.title}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    sizes="800px"
                  />
                </div>
              )}

              {/* Video Embed */}
              {selectedProject.videoUrl && (
                <div className="aspect-video w-full mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedProject.videoUrl)}`}
                    title={selectedProject.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Gallery Images */}
              {getGalleryImages(selectedProject).length > 0 && (
                <div className="columns-2 md:columns-3 gap-2 mb-4">
                  {getGalleryImages(selectedProject).map((img) => (
                    <div
                      key={img.id}
                      className="mb-2 break-inside-avoid rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() =>
                        openLightbox(img.image, selectedProject)
                      }
                    >
                      <Image
                        src={img.image}
                        alt=""
                        width={400}
                        height={400}
                        className="w-full h-auto block"
                        sizes="250px"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Project Details */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  {selectedProject.clientName && (
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.clientName}
                      </span>
                    </div>
                  )}
                  {selectedProject.projectDate && (
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="ml-2 font-medium">
                        {selectedProject.projectDate}
                      </span>
                    </div>
                  )}
                </div>

                {selectedProject.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {selectedProject && getAllImages(selectedProject).length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="relative w-[90vw] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt=""
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {selectedProject && getAllImages(selectedProject).length > 1 && (
            <div className="absolute bottom-4 text-white text-sm">
              {lightboxIndex + 1} / {getAllImages(selectedProject).length}
            </div>
          )}
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
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 100% center;
          }
        }
      `}</style>
    </section>
  );
}
