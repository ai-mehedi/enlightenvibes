import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

// POST to seed projects data
export async function POST() {
  try {
    const dummyProjects = [
      {
        title: "Bangladesh Navy Website",
        description: "Complete web portal development for Bangladesh Navy with modern design and secure infrastructure.",
        category: "WEB PORTAL DESIGN",
        image: null,
        videoUrl: null,
        clientName: "Bangladesh Navy",
        projectDate: "2024",
        order: 1,
        active: true,
      },
      {
        title: "Annual Report Design",
        description: "Professional annual report design and printing for major corporate client.",
        category: "PRINTING",
        image: null,
        videoUrl: null,
        clientName: "Corporate Client",
        projectDate: "2024",
        order: 2,
        active: true,
      },
      {
        title: "Corporate Documentary",
        description: "Full documentary production showcasing company history and achievements.",
        category: "VIDEO PHOTOGRAPHY",
        image: null,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Major Corporation",
        projectDate: "2024",
        order: 3,
        active: true,
      },
      {
        title: "Product Launch Event",
        description: "Complete event management for product launch including stage design and coordination.",
        category: "EVENTS",
        image: null,
        videoUrl: null,
        clientName: "Tech Company",
        projectDate: "2024",
        order: 4,
        active: true,
      },
      {
        title: "E-Commerce Platform",
        description: "Full-featured e-commerce website with payment integration and inventory management.",
        category: "WEB PORTAL DESIGN",
        image: null,
        videoUrl: null,
        clientName: "Retail Brand",
        projectDate: "2023",
        order: 5,
        active: true,
      },
      {
        title: "Magazine Publication",
        description: "Monthly magazine design and print production with high-quality finishing.",
        category: "PRINTING",
        image: null,
        videoUrl: null,
        clientName: "Publishing House",
        projectDate: "2023",
        order: 6,
        active: true,
      },
      {
        title: "Training Video Series",
        description: "Professional training video production for corporate learning programs.",
        category: "VIDEO PHOTOGRAPHY",
        image: null,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Training Institute",
        projectDate: "2023",
        order: 7,
        active: true,
      },
      {
        title: "Conference Organization",
        description: "International conference management with full logistics and technical support.",
        category: "EVENTS",
        image: null,
        videoUrl: null,
        clientName: "Industry Association",
        projectDate: "2023",
        order: 8,
        active: true,
      },
      {
        title: "Government Portal",
        description: "Secure government web portal with citizen services integration.",
        category: "WEB PORTAL DESIGN",
        image: null,
        videoUrl: null,
        clientName: "Government Agency",
        projectDate: "2023",
        order: 9,
        active: true,
      },
      {
        title: "Brochure Design",
        description: "Creative brochure design and printing for marketing campaign.",
        category: "PRINTING",
        image: null,
        videoUrl: null,
        clientName: "Marketing Agency",
        projectDate: "2023",
        order: 10,
        active: true,
      },
      {
        title: "Promotional Video",
        description: "Brand promotional video with animation and professional voiceover.",
        category: "VIDEO PHOTOGRAPHY",
        image: null,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clientName: "Brand Company",
        projectDate: "2022",
        order: 11,
        active: true,
      },
      {
        title: "Award Ceremony",
        description: "Grand award ceremony event with red carpet and live streaming.",
        category: "EVENTS",
        image: null,
        videoUrl: null,
        clientName: "Industry Body",
        projectDate: "2022",
        order: 12,
        active: true,
      },
    ];

    for (const project of dummyProjects) {
      await db.insert(projects).values(project);
    }

    return NextResponse.json({ message: "Projects seeded successfully", count: dummyProjects.length });
  } catch (error) {
    console.error("Error seeding projects:", error);
    return NextResponse.json({ error: "Failed to seed projects" }, { status: 500 });
  }
}
