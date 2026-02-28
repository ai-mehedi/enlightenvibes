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
        image: null,
        videoUrl: null,
        clientName: "Tech Company",
        projectDate: "2024",
        order: 4,
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
