import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// GET all active projects (public)
export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.active, true))
      .orderBy(asc(projects.order));
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
