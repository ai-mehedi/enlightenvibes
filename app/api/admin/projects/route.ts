import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
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
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
    const { title, description, category, image, videoUrl, clientName, projectDate, order, active } = body;

    const result = await db.insert(projects).values({
      title,
      description: description || null,
      category,
      image: image || null,
      videoUrl: videoUrl || null,
      clientName: clientName || null,
      projectDate: projectDate || null,
      order: order || 0,
      active: active !== undefined ? active : true,
    });

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
