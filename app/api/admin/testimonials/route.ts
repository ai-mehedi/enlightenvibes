import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";
import { asc } from "drizzle-orm";

// GET all testimonials (admin)
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allTestimonials = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.order));
    return NextResponse.json(allTestimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { clientName, clientRole, clientCompany, clientImage, content, rating, order, active } = body;

    const result = await db.insert(testimonials).values({
      clientName,
      clientRole,
      clientCompany,
      clientImage,
      content,
      rating: rating || 5,
      order: order || 0,
      active: active ?? true,
    });

    return NextResponse.json({ id: result.lastInsertRowid, success: true });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
