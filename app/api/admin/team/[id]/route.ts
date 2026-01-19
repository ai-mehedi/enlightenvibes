import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

// PUT update team member
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
    const body = await request.json();
    const { name, role, description, image, order, active } = body;

    await db
      .update(teamMembers)
      .set({
        name,
        role,
        description,
        image: image || null,
        order,
        active,
        updatedAt: new Date(),
      })
      .where(eq(teamMembers.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

// DELETE team member
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
    await db.delete(teamMembers).where(eq(teamMembers.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
