import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

// GET all clients (public)
export async function GET() {
  try {
    const allClients = await db.select().from(clients).orderBy(asc(clients.order));
    return NextResponse.json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}
