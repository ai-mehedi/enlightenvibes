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
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, Upload, Eye, EyeOff, Video } from "lucide-react";
import type { Project } from "@/lib/db/schema";

const categories = [
  "WEB PORTAL DESIGN",
  "PRINTING",
  "VIDEO PHOTOGRAPHY",
  "EVENTS",
];

export default function ProjectsManager() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "WEB PORTAL DESIGN",
    image: "",
    videoUrl: "",
    clientName: "",
    projectDate: "",
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjectsList(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      category: "WEB PORTAL DESIGN",
      image: "",
      videoUrl: "",
      clientName: "",
      projectDate: "",
      order: projectsList.length,
      active: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      category: project.category,
      image: project.image || "",
      videoUrl: project.videoUrl || "",
      clientName: project.clientName || "",
      projectDate: project.projectDate || "",
      order: project.order,
      active: project.active,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setDeletingProject(project);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;

    try {
      const res = await fetch(`/api/admin/projects/${deletingProject.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteDialogOpen(false);
        setDeletingProject(null);
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "projects");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.path });
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (project: Project) => {
    try {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, active: !project.active }),
      });
      fetchProjects();
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
            <h1 className="text-xl font-semibold">Manage Projects</h1>
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
            <CardTitle>Projects / Portfolio</CardTitle>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : projectsList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No projects yet. Add your first project!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Order</TableHead>
                    <TableHead className="w-20">Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-16">Type</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectsList.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.order}</TableCell>
                      <TableCell>
                        <div className="relative w-16 h-12 bg-gray-200 rounded overflow-hidden">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="text-sm">{project.category}</TableCell>
                      <TableCell>
                        {project.videoUrl ? (
                          <Video className="h-4 w-4 text-red-500" />
                        ) : (
                          <span className="text-xs text-gray-500">Image</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(project)}
                          className={project.active ? "text-green-600" : "text-gray-400"}
                        >
                          {project.active ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(project)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openDeleteDialog(project)}
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject ? "Update the project details." : "Add a new portfolio project."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description..."
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Project Image</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/projects/image.jpg"
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
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.image && (
                <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden mt-2">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" sizes="400px" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">YouTube Video URL (optional)</Label>
              <Input
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Client Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDate">Project Date</Label>
                <Input
                  id="projectDate"
                  value={formData.projectDate}
                  onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !formData.title}>
              {saving ? "Saving..." : editingProject ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingProject?.title}"? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
