import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sizeOf from "image-size";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "clients";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public", folder);
    await mkdir(uploadDir, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicPath = `/${folder}/${filename}`;

    // Get image dimensions
    let width = 0;
    let height = 0;
    try {
      const dimensions = sizeOf(buffer);
      width = dimensions.width || 0;
      height = dimensions.height || 0;
    } catch {
      // ignore dimension errors for non-image files
    }

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename,
      width,
      height,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
