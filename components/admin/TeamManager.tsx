"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, Upload, Eye, EyeOff } from "lucide-react";
import type { TeamMember } from "@/lib/db/schema";

export default function TeamManager() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openCreateDialog = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      description: "",
      image: "",
      order: members.length,
      active: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      image: member.image || "",
      order: member.order,
      active: member.active,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (member: TeamMember) => {
    setDeletingMember(member);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingMember
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchMembers();
      }
    } catch (error) {
      console.error("Failed to save team member:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingMember) return;

    try {
      const res = await fetch(`/api/admin/team/${deletingMember.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteDialogOpen(false);
        setDeletingMember(null);
        fetchMembers();
      }
    } catch (error) {
      console.error("Failed to delete team member:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "team");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.path });
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (member: TeamMember) => {
    try {
      await fetch(`/api/admin/team/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...member, active: !member.active }),
      });
      fetchMembers();
    } catch (error) {
      console.error("Failed to toggle active:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">Manage Team Members</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : members.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No team members yet. Add your first member!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Order</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.order}</TableCell>
                      <TableCell>
                        <div className="relative w-12 h-16 bg-gray-200 rounded overflow-hidden">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#2d3a2d]" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(member)}
                          className={member.active ? "text-green-600" : "text-gray-400"}
                        >
                          {member.active ? (
                            <>
                              <Eye className="h-4 w-4 mr-1" /> Active
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" /> Hidden
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(member)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openDeleteDialog(member)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogDescription>
              {editingMember
                ? "Update the team member details below."
                : "Add a new team member."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Founder & CEO"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description about the team member..."
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/team/image.jpg"
                  className="flex-1"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "..." : "Upload"}
                </Button>
              </div>
              {formData.image && (
                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="relative w-20 h-28 bg-white rounded overflow-hidden mx-auto">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="active">Active (visible on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !formData.name || !formData.role}>
              {saving ? "Saving..." : editingMember ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deletingMember?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
