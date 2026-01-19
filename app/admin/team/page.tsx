import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import TeamManager from "@/components/admin/TeamManager";

export default async function TeamPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <TeamManager />;
}
