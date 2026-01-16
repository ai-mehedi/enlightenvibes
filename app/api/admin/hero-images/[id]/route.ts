import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { heroImages } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

// GET single hero image
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const image = await db.select().from(heroImages).where(eq(heroImages.id, parseInt(id))).limit(1);

    if (!image.length) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 });
    }

    return NextResponse.json(image[0]);
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return NextResponse.json({ error: "Failed to fetch hero image" }, { status: 500 });
  }
}

// PUT update hero image
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { image, order, active } = await request.json();

    const updatedImage = await db.update(heroImages)
      .set({
        image,
        order,
        active,
        updatedAt: new Date(),
      })
      .where(eq(heroImages.id, parseInt(id)))
      .returning();

    if (!updatedImage.length) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 });
    }

    return NextResponse.json(updatedImage[0]);
  } catch (error) {
    console.error("Error updating hero image:", error);
    return NextResponse.json({ error: "Failed to update hero image" }, { status: 500 });
  }
}

// DELETE hero image
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await db.delete(heroImages).where(eq(heroImages.id, parseInt(id))).returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero image:", error);
    return NextResponse.json({ error: "Failed to delete hero image" }, { status: 500 });
  }
}
