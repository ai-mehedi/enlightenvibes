import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    email: "admin@enlightenvibes.com",
    password: hashedPassword,
    name: "Admin",
    role: "admin",
  }).onConflictDoNothing();

  console.log("Admin user created:");
  console.log("Email: admin@enlightenvibes.com");
  console.log("Password: admin123");
}

seed().catch(console.error);
