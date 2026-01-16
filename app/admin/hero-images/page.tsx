import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import HeroImagesManager from "@/components/admin/HeroImagesManager";

export default async function AdminHeroImagesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <HeroImagesManager />;
}
