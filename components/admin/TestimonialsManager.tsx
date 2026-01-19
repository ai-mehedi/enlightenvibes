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
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, Upload, Eye, EyeOff, Star, Database } from "lucide-react";
import type { Testimonial } from "@/lib/db/schema";

export default function TestimonialsManager() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    clientImage: "",
    content: "",
    rating: 5,
    order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonialsList(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/testimonials/seed", { method: "POST" });
      if (res.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to seed testimonials:", error);
    } finally {
      setSeeding(false);
    }
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: "",
      clientRole: "",
      clientCompany: "",
      clientImage: "",
      content: "",
      rating: 5,
      order: testimonialsList.length,
      active: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole || "",
      clientCompany: testimonial.clientCompany || "",
      clientImage: testimonial.clientImage || "",
      content: testimonial.content,
      rating: testimonial.rating,
      order: testimonial.order,
      active: testimonial.active,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (testimonial: Testimonial) => {
    setDeletingTestimonial(testimonial);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : "/api/admin/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTestimonial) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${deletingTestimonial.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteDialogOpen(false);
        setDeletingTestimonial(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "testimonials");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, clientImage: data.path });
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...testimonial, active: !testimonial.active }),
      });
      fetchTestimonials();
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
            <h1 className="text-xl font-semibold">Manage Testimonials</h1>
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
            <CardTitle>Client Testimonials</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSeed} disabled={seeding}>
                <Database className="h-4 w-4 mr-2" />
                {seeding ? "Seeding..." : "Seed Data"}
              </Button>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : testimonialsList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No testimonials yet. Add your first testimonial or seed dummy data!
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Order</TableHead>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="w-20">Rating</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonialsList.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>{testimonial.order}</TableCell>
                      <TableCell>
                        <div className="relative w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                          {testimonial.clientImage ? (
                            <Image
                              src={testimonial.clientImage}
                              alt={testimonial.clientName}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#b8860b] flex items-center justify-center text-white text-sm font-bold">
                              {testimonial.clientName.charAt(0)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{testimonial.clientName}</div>
                          <div className="text-xs text-gray-500">{testimonial.clientRole}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{testimonial.clientCompany}</TableCell>
                      <TableCell>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < testimonial.rating
                                  ? "text-[#b8860b] fill-[#b8860b]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(testimonial)}
                          className={testimonial.active ? "text-green-600" : "text-gray-400"}
                        >
                          {testimonial.active ? (
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
                            onClick={() => openEditDialog(testimonial)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openDeleteDialog(testimonial)}
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
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {editingTestimonial ? "Update the testimonial details." : "Add a new client testimonial."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientRole">Role / Position</Label>
                <Input
                  id="clientRole"
                  value={formData.clientRole}
                  onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                  placeholder="CEO"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientCompany">Company</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Client Photo</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.clientImage}
                  onChange={(e) => setFormData({ ...formData, clientImage: e.target.value })}
                  placeholder="/testimonials/photo.jpg"
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
              {formData.clientImage && (
                <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <Image src={formData.clientImage} alt="Preview" fill className="object-cover" sizes="64px" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Testimonial Content</Label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="What the client said about your service..."
                className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                />
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
            <Button onClick={handleSave} disabled={saving || !formData.clientName || !formData.content}>
              {saving ? "Saving..." : editingTestimonial ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the testimonial from &quot;{deletingTestimonial?.clientName}&quot;? This cannot be undone.
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
