import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

// PUT update testimonial
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { clientName, clientRole, clientCompany, clientImage, content, rating, order, active } = body;

    await db
      .update(testimonials)
      .set({
        clientName,
        clientRole,
        clientCompany,
        clientImage,
        content,
        rating,
        order,
        active,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE testimonial
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
