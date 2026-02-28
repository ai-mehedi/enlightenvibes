"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Settings } from "lucide-react";
import type { AdminSession } from "@/lib/auth";

interface AdminDashboardProps {
  user: AdminSession;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Admin accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Website pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">System status</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            onClick={() => router.push("/admin/clients")}
          >
            <CardHeader>
              <CardTitle className="text-base">View Clients</CardTitle>
              <CardDescription>Manage client logos</CardDescription>
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
            onClick={() => router.push("/admin/team")}
          >
            <CardHeader>
              <CardTitle className="text-base">Team Members</CardTitle>
              <CardDescription>Manage team section</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your admin account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{user.name || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role:</span>
            <span className="font-medium capitalize">{user.role}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
