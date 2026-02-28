import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// GET all active categories (public)
export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.active, true))
      .orderBy(asc(categories.order));
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
