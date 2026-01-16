import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import ClientsManager from "@/components/admin/ClientsManager";

export default async function AdminClientsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <ClientsManager />;
}
