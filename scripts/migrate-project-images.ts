import { db } from "../lib/db";
import { projects, projectImages } from "../lib/db/schema";

async function migrate() {
  const allProjects = await db.select().from(projects);
  let migrated = 0;

  for (const project of allProjects) {
    if (project.image) {
      await db.insert(projectImages).values({
        projectId: project.id,
        image: project.image,
        isMain: true,
        order: 0,
      });
      migrated++;
    }
  }

  console.log(`Migrated ${migrated} project images from ${allProjects.length} projects.`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
