import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { heroImages } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";
import { asc } from "drizzle-orm";

// GET all hero images (admin)
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const images = await db.select().from(heroImages).orderBy(asc(heroImages.order));
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return NextResponse.json({ error: "Failed to fetch hero images" }, { status: 500 });
  }
}

// POST create new hero image
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { image, order, active } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const newImage = await db.insert(heroImages).values({
      image,
      order: order || 0,
      active: active !== false,
    }).returning();

    return NextResponse.json(newImage[0], { status: 201 });
  } catch (error) {
    console.error("Error creating hero image:", error);
    return NextResponse.json({ error: "Failed to create hero image" }, { status: 500 });
  }
}
