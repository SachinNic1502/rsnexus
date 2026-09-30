"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  FolderGit2,
  Plus,
  Trash2,
  ExternalLink,
  Star,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function AdminPortfolioPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    category: "Full Stack / Web App",
    label: "Client Project",
    description: "",
    imageUrls: "",
    technologies: "Next.js, TypeScript, Tailwind CSS, MongoDB",
    features: "Secure Authentication\nResponsive Dashboard\nAutomated CI/CD",
    results: "Launched to production\n100% Core Web Vitals score",
    liveUrl: "",
    githubUrl: "",
    isFeatured: false,
    overview: "",
    challenge: "",
    solution: "",
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isFeatured: !current,
          label: !current ? "Featured Project" : "Client Project",
        }),
      });
      if (res.ok) {
        toast({ title: !current ? "Marked as Featured Project" : "Removed from Featured" });
        setProjects((prev) =>
          prev.map((p) =>
            p._id === id
              ? {
                  ...p,
                  isFeatured: !current,
                  label: !current ? "Featured Project" : "Client Project",
                }
              : p
          )
        );
      }
    } catch (e) {
      toast({ title: "Failed to update project", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Project deleted" });
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const images = newProject.imageUrls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const technologies = newProject.technologies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((name) => ({ name }));

      const features = newProject.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const results = newProject.results
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: newProject.title,
        slug: newProject.slug,
        category: newProject.category,
        label: newProject.label,
        description: newProject.description,
        images,
        technologies,
        features,
        results,
        liveUrl: newProject.liveUrl,
        githubUrl: newProject.githubUrl,
        isFeatured: newProject.isFeatured,
        caseStudy: {
          overview: newProject.overview || newProject.description,
          challenge: newProject.challenge,
          solution: newProject.solution,
          architecture: newProject.technologies,
          outcome: results.join(". "),
        },
      };

      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "Project Published to Portfolio!" });
        setOpenModal(false);
        fetchProjects();
        setNewProject({
          title: "",
          slug: "",
          category: "Full Stack / Web App",
          label: "Client Project",
          description: "",
          imageUrls: "",
          technologies: "Next.js, TypeScript, Tailwind CSS, MongoDB",
          features: "Secure Authentication\nResponsive Dashboard\nAutomated CI/CD",
          results: "Launched to production\n100% Core Web Vitals score",
          liveUrl: "",
          githubUrl: "",
          isFeatured: false,
          overview: "",
          challenge: "",
          solution: "",
        });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (e) {
      toast({ title: "Submission failed", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Portfolio & Case Studies</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your client deliverables, internal platforms, and featured homepage showcases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchProjects}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Portfolio Project</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Project Title *</Label>
                    <Input
                      value={newProject.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        setNewProject((prev) => ({ ...prev, title, slug }));
                      }}
                      placeholder="MyLapKart Marketplace"
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug *</Label>
                    <Input
                      value={newProject.slug}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="mylapkart-marketplace"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <Input
                      value={newProject.category}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, category: e.target.value }))}
                      placeholder="E-commerce / SaaS"
                      required
                    />
                  </div>
                  <div>
                    <Label>Badge Label</Label>
                    <Select
                      defaultValue={newProject.label}
                      onValueChange={(val) =>
                        setNewProject((prev) => ({
                          ...prev,
                          label: val,
                          isFeatured: val === "Featured Project",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Featured Project">Featured Project</SelectItem>
                        <SelectItem value="Client Project">Client Project</SelectItem>
                        <SelectItem value="Internal Project">Internal Project</SelectItem>
                        <SelectItem value="Concept Showcase">Concept Showcase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Short Description *</Label>
                  <Textarea
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Concise summary for portfolio card..."
                    required
                  />
                </div>

                <div>
                  <Label>Image URLs (1 Cloudinary / CDN URL per line) *</Label>
                  <Textarea
                    rows={3}
                    value={newProject.imageUrls}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, imageUrls: e.target.value }))}
                    placeholder="https://res.cloudinary.com/.../img1.png&#10;https://res.cloudinary.com/.../img2.png"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={newProject.technologies}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, technologies: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Live Website URL</Label>
                    <Input
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Key Features (1 per line)</Label>
                    <Textarea
                      rows={3}
                      value={newProject.features}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, features: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Results & Metrics (1 per line)</Label>
                    <Textarea
                      rows={3}
                      value={newProject.results}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, results: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-xs font-semibold text-white block">Case Study Details (Optional)</span>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Problem / Challenge"
                      value={newProject.challenge}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, challenge: e.target.value }))}
                    />
                    <Input
                      placeholder="Our Technical Solution"
                      value={newProject.solution}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, solution: e.target.value }))}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Saving Project..." : "Publish Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading portfolio projects...
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <FolderGit2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Projects Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Add Project" or run the Seeder to import your 7 existing showcases.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, idx) => {
            const firstImg = project.images?.[0] || "/placeholder.svg";

            return (
              <Card key={project._id || project.slug || `project-${idx}`} className="glass-card border-slate-800 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={firstImg}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge
                        className={`text-xs ${
                          project.isFeatured
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-slate-900/80 text-slate-300"
                        }`}
                      >
                        {project.label || "Project"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-2">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {project.technologies.slice(0, 4).map((t: any, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-[10px]">
                            {t.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${
                      project.isFeatured ? "text-amber-400 border-amber-500/40" : ""
                    }`}
                    onClick={() => handleToggleFeatured(project._id, project.isFeatured)}
                  >
                    <Star
                      className={`w-3.5 h-3.5 mr-1.5 ${
                        project.isFeatured ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                    {project.isFeatured ? "Featured" : "Make Featured"}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                      <Link href={`/portfolio/${project.slug}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Preview
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
