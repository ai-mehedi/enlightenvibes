import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// GET all active testimonials (public)
export async function GET() {
  try {
    const allTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.active, true))
      .orderBy(asc(testimonials.order));
    return NextResponse.json(allTestimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
