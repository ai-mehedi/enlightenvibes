import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, projectImages, categories } from "@/lib/db/schema";
import { asc, eq, inArray } from "drizzle-orm";

// GET all active projects (public)
export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.active, true))
      .orderBy(asc(projects.order));

    const projectIds = allProjects.map((p) => p.id);
    const allImages =
      projectIds.length > 0
        ? await db
            .select()
            .from(projectImages)
            .where(inArray(projectImages.projectId, projectIds))
            .orderBy(asc(projectImages.order))
        : [];

    const imagesByProject = new Map<number, typeof allImages>();
    for (const img of allImages) {
      if (!imagesByProject.has(img.projectId)) {
        imagesByProject.set(img.projectId, []);
      }
      imagesByProject.get(img.projectId)!.push(img);
    }

    // Fetch categories for mapping
    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.active, true));
    const categoryMap = new Map(allCategories.map((c) => [c.id, c.name]));

    const result = allProjects.map((p) => ({
      ...p,
      categoryName: p.categoryId ? categoryMap.get(p.categoryId) || null : null,
      images: imagesByProject.get(p.id) || [],
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
