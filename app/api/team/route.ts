import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// GET all active team members (public)
export async function GET() {
  try {
    const members = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.active, true))
      .orderBy(asc(teamMembers.order));
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}
