"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Video,
  Star,
  X,
  ImageIcon,
} from "lucide-react";
import type { Project, ProjectImage, Category } from "@/lib/db/schema";

interface ProjectWithImages extends Project {
  images: ProjectImage[];
}

interface FormImage {
  image: string;
  width: number;
  height: number;
  isMain: boolean;
  order: number;
}

export default function ProjectsManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projectsList, setProjectsList] = useState<ProjectWithImages[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithImages | null>(null);
  const [deletingProject, setDeletingProject] = useState<ProjectWithImages | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: null as number | null,
    videoUrl: "",
    clientName: "",
    projectDate: "",
    order: 0,
    active: true,
  });
  const [formImages, setFormImages] = useState<FormImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategoriesList(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      categoryId: null,
      videoUrl: "",
      clientName: "",
      projectDate: "",
      order: projectsList.length,
      active: true,
    });
    setFormImages([]);
    setDialogOpen(true);
  };

  const openEditDialog = (project: ProjectWithImages) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      categoryId: project.categoryId || null,
      videoUrl: project.videoUrl || "",
      clientName: project.clientName || "",
      projectDate: project.projectDate || "",
      order: project.order,
      active: project.active,
    });
    setFormImages(
      project.images?.length
        ? project.images.map((img) => ({
            image: img.image,
            width: img.width || 0,
            height: img.height || 0,
            isMain: img.isMain,
            order: img.order,
          }))
        : project.image
          ? [{ image: project.image, width: 0, height: 0, isMain: true, order: 0 }]
          : []
    );
    setDialogOpen(true);
  };

  const openDeleteDialog = (project: ProjectWithImages) => {
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
        body: JSON.stringify({
          ...formData,
          images: formImages,
        }),
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploads = Array.from(files).map(async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("folder", "projects");

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (res.ok) {
          const data = await res.json();
          return { path: data.path as string, width: data.width as number, height: data.height as number };
        }
        return null;
      });

      const results = await Promise.all(uploads);
      const validResults = results.filter(Boolean) as { path: string; width: number; height: number }[];

      if (validResults.length > 0) {
        setFormImages((prev) => {
          const hasMain = prev.some((img) => img.isMain);
          return [
            ...prev,
            ...validResults.map((r, i) => ({
              image: r.path,
              width: r.width,
              height: r.height,
              isMain: !hasMain && i === 0,
              order: prev.length + i,
            })),
          ];
        });
      }
    } catch (error) {
      console.error("Failed to upload files:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const setMainImage = (index: number) => {
    setFormImages((prev) =>
      prev.map((img, i) => ({ ...img, isMain: i === index }))
    );
  };

  const removeImage = (index: number) => {
    setFormImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length > 0 && !updated.some((img) => img.isMain)) {
        updated[0].isMain = true;
      }
      return updated.map((img, i) => ({ ...img, order: i }));
    });
  };

  const toggleActive = async (project: ProjectWithImages) => {
    try {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          active: !project.active,
          images: project.images,
        }),
      });
      fetchProjects();
    } catch (error) {
      console.error("Failed to toggle active:", error);
    }
  };

  const getMainImage = (project: ProjectWithImages) => {
    return (
      project.images?.find((i) => i.isMain)?.image ||
      project.images?.[0]?.image ||
      project.image
    );
  };

  return (
    <div>
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
                  <TableHead className="w-20">Images</TableHead>
                  <TableHead className="w-16">Video</TableHead>
                  <TableHead className="w-20">Status</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsList.map((project) => {
                  const mainImg = getMainImage(project);
                  return (
                    <TableRow key={project.id}>
                      <TableCell>{project.order}</TableCell>
                      <TableCell>
                        <div className="relative w-16 h-12 bg-gray-200 rounded overflow-hidden">
                          {mainImg ? (
                            <Image
                              src={mainImg}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {project.title}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {categoriesList.find((c) => c.id === project.categoryId)?.name || "-"}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {project.images?.length || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        {project.videoUrl ? (
                          <Video className="h-4 w-4 text-red-500" />
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(project)}
                          className={
                            project.active
                              ? "text-green-600"
                              : "text-gray-400"
                          }
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
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update the project details."
                : "Add a new portfolio project."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Project description..."
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <select
                id="categoryId"
                value={formData.categoryId ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="">No Category</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Multi-Image Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Project Images</Label>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Add Images"}
                  </Button>
                </div>
              </div>
              {formImages.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-sm text-gray-400">
                  No images added yet. Click &quot;Add Images&quot; to upload.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {formImages.map((img, idx) => (
                    <div
                      key={`${img.image}-${idx}`}
                      className={`relative group rounded-lg overflow-hidden border-2 ${
                        img.isMain
                          ? "border-yellow-500 ring-2 ring-yellow-200"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={img.image}
                          alt={`Image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                      {/* Main image badge */}
                      {img.isMain && (
                        <div className="absolute top-1 left-1 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          MAIN
                        </div>
                      )}
                      {/* Actions overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        {!img.isMain && (
                          <button
                            type="button"
                            onClick={() => setMainImage(idx)}
                            className="bg-yellow-500 text-white p-1.5 rounded-full hover:bg-yellow-600"
                            title="Set as main image"
                          >
                            <Star className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                          title="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Hover over images to set as main or remove. The main image is
                used as the cover in the portfolio grid.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">YouTube Video URL (optional)</Label>
              <Input
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  placeholder="Client Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDate">Project Date</Label>
                <Input
                  id="projectDate"
                  value={formData.projectDate}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDate: e.target.value })
                  }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({ ...formData, active: e.target.checked })
                }
                className="h-4 w-4"
              />
              <Label htmlFor="active">Active (visible on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !formData.title}
            >
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
              Are you sure you want to delete &quot;{deletingProject?.title}
              &quot;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
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
