import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, projectImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";

// PUT update project
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
    const projectId = parseInt(id);
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

    await db
      .update(projects)
      .set({
        title,
        description: description || null,
        categoryId: categoryId || null,
        image: mainImage,
        videoUrl: videoUrl || null,
        clientName: clientName || null,
        projectDate: projectDate || null,
        order,
        active,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId));

    // Replace all images (delete old, insert new)
    if (images !== undefined) {
      await db
        .delete(projectImages)
        .where(eq(projectImages.projectId, projectId));

      if (images.length > 0) {
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
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
    await db.delete(projects).where(eq(projects.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
