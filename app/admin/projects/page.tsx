import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function ProjectsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <ProjectsManager />;
}
