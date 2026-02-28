"use client";

import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/admin/AppSidebar";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string;
    role: string;
  } | null;
}

export function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage || !user) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
          <PageTitle pathname={pathname} />
        </header>
        <div className="flex-1 p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function PageTitle({ pathname }: { pathname: string }) {
  const titles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/hero-images": "Hero Images",
    "/admin/clients": "Clients",
    "/admin/categories": "Categories",
    "/admin/projects": "Projects",
    "/admin/team": "Team Members",
    "/admin/testimonials": "Testimonials",
  };

  return (
    <h1 className="text-sm font-medium">
      {titles[pathname] || "Admin"}
    </h1>
  );
}
