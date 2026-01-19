"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Users, FileText, Settings, LayoutDashboard } from "lucide-react";
import type { AdminSession } from "@/lib/auth";

interface AdminDashboardProps {
  user: AdminSession;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500">Admin accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pages</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">Website pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Settings</CardTitle>
              <Settings className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-gray-500">System status</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">Manage Content</CardTitle>
                <CardDescription>Edit website content</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/admin/clients")}
            >
              <CardHeader>
                <CardTitle className="text-base">View Clients</CardTitle>
                <CardDescription>Manage client logos</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/admin/hero-images")}
            >
              <CardHeader>
                <CardTitle className="text-base">Hero Images</CardTitle>
                <CardDescription>Update hero section</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/admin/team")}
            >
              <CardHeader>
                <CardTitle className="text-base">Team Members</CardTitle>
                <CardDescription>Manage team section</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/admin/projects")}
            >
              <CardHeader>
                <CardTitle className="text-base">Projects</CardTitle>
                <CardDescription>Manage portfolio</CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/admin/testimonials")}
            >
              <CardHeader>
                <CardTitle className="text-base">Testimonials</CardTitle>
                <CardDescription>Manage client reviews</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your admin account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{user.name || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Role:</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
