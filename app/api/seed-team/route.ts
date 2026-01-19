import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";

// POST to seed team members data
export async function POST() {
  try {
    const dummyTeam = [
      {
        name: "MONIR KHAN SHIMUL",
        role: "Founder & CEO",
        description: "Provides strategic direction with clarity and discipline, aligning creative ambition with institutional responsibility, long-term partnerships, and sustained organisational credibility.",
        image: null,
        order: 1,
        active: true,
      },
      {
        name: "TAZUL HAQUE",
        role: "Founder & COO",
        description: "Ensures precision in execution, translating vision into dependable systems, workflows, and delivery across complex, multi-stakeholder projects.",
        image: null,
        order: 2,
        active: true,
      },
      {
        name: "MILTON MOLLA",
        role: "Editor",
        description: "Develops clear, persuasive narratives grounded in research, context, and audience awareness, supporting credibility across institutional and public-facing communications.",
        image: null,
        order: 3,
        active: true,
      },
      {
        name: "ZAHID SUMON",
        role: "Visual Editor",
        description: "Oversees editorial quality with exacting standards, ensuring accuracy, coherence, and integrity across publications that demand public trust.",
        image: null,
        order: 4,
        active: true,
      },
      {
        name: "SARAH RAHMAN",
        role: "Creative Director",
        description: "Leads visual strategy and brand development, ensuring consistency and innovation across all creative outputs and client deliverables.",
        image: null,
        order: 5,
        active: true,
      },
      {
        name: "AHMED HOSSAIN",
        role: "Senior Developer",
        description: "Architects and builds robust digital platforms, ensuring technical excellence and seamless user experiences across web and mobile applications.",
        image: null,
        order: 6,
        active: true,
      },
      {
        name: "NADIA ISLAM",
        role: "Content Strategist",
        description: "Crafts compelling content strategies that align business objectives with audience needs, driving engagement and measurable results.",
        image: null,
        order: 7,
        active: true,
      },
      {
        name: "KARIM UDDIN",
        role: "Project Manager",
        description: "Coordinates cross-functional teams to deliver projects on time and within budget, maintaining quality standards throughout the process.",
        image: null,
        order: 8,
        active: true,
      },
    ];

    for (const member of dummyTeam) {
      await db.insert(teamMembers).values(member);
    }

    return NextResponse.json({ message: "Team members seeded successfully", count: dummyTeam.length });
  } catch (error) {
    console.error("Error seeding team members:", error);
    return NextResponse.json({ error: "Failed to seed team members" }, { status: 500 });
  }
}
