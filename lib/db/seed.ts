import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("mehedi000", 10);

  await db.insert(users).values({
    email: "admin@admin.com",
    password: hashedPassword,
    name: "Admin",
    role: "admin",
  }).onConflictDoNothing();

  console.log("Admin user created:");
  console.log("Email: admin@admin.com");
  console.log("Password: mehedi000");
}

seed().catch(console.error);
