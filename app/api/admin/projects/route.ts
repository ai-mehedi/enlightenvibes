import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, projectImages } from "@/lib/db/schema";
import { asc, inArray } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

// GET all projects (admin)
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allProjects = await db
      .select()
      .from(projects)
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

    const result = allProjects.map((p) => ({
      ...p,
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

// POST create new project
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      categoryId,
      image,
      videoUrl,
      clientName,
      projectDate,
      order,
      active,
      images,
    } = body;

    const mainImage =
      images?.find((i: { isMain: boolean }) => i.isMain)?.image ||
      images?.[0]?.image ||
      image ||
      null;

    const result = await db.insert(projects).values({
      title,
      description: description || null,
      categoryId: categoryId || null,
      image: mainImage,
      videoUrl: videoUrl || null,
      clientName: clientName || null,
      projectDate: projectDate || null,
      order: order || 0,
      active: active !== undefined ? active : true,
    });

    const projectId = Number(result.lastInsertRowid);

    if (images?.length) {
      await db.insert(projectImages).values(
        images.map(
          (
            img: { image: string; width?: number; height?: number; isMain: boolean; order: number },
            i: number
          ) => ({
            projectId,
            image: img.image,
            width: img.width || 0,
            height: img.height || 0,
            isMain: img.isMain || false,
            order: img.order ?? i,
          })
        )
      );
    }

    return NextResponse.json({ success: true, id: projectId });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
