import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { getAdminSession } from "@/lib/auth";
import { asc } from "drizzle-orm";

// GET all clients (admin)
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allClients = await db.select().from(clients).orderBy(asc(clients.order));
    return NextResponse.json(allClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

// POST create new client
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, image, order } = await request.json();

    if (!name || !image) {
      return NextResponse.json({ error: "Name and image are required" }, { status: 400 });
    }

    const newClient = await db.insert(clients).values({
      name,
      image,
      order: order || 0,
    }).returning();

    return NextResponse.json(newClient[0], { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
