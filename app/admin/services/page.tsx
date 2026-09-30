"use client";

import { useState, useEffect } from "react";
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
  Layers,
  Plus,
  Trash2,
  ExternalLink,
  Code,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  RefreshCw,
} from "lucide-react";

export default function AdminServicesPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newService, setNewService] = useState({
    serviceId: "",
    slug: "",
    title: "",
    tagline: "",
    iconName: "Code",
    shortDescription: "",
    description: "",
    features: "Custom Responsive Architecture\nSEO & Performance Optimization\nAPI & Database Integration",
    technologies: "Next.js, React, TypeScript, Tailwind CSS",
    deliverables: "Production-ready web application, documentation, deployment",
    typicalTimeline: "2 - 4 weeks",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service package?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Service package deleted" });
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const features = newService.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const technologies = newService.technologies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...newService,
        features,
        technologies,
        isActive: true,
      };

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "Service Created Successfully!" });
        setOpenModal(false);
        fetchServices();
        setNewService({
          serviceId: "",
          slug: "",
          title: "",
          tagline: "",
          iconName: "Code",
          shortDescription: "",
          description: "",
          features: "Custom Responsive Architecture\nSEO & Performance Optimization\nAPI & Database Integration",
          technologies: "Next.js, React, TypeScript, Tailwind CSS",
          deliverables: "Production-ready web application, documentation, deployment",
          typicalTimeline: "2 - 4 weeks",
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
          <h1 className="text-3xl font-extrabold text-white">Services & Offerings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your service catalog, deliverables, tech stacks, and timelines displayed across the site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchServices}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Service Offering</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Service Title *</Label>
                    <Input
                      value={newService.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        const serviceId = slug.split("-")[0] || slug;
                        setNewService((prev) => ({ ...prev, title, slug, serviceId }));
                      }}
                      placeholder="AI & Machine Learning"
                      required
                    />
                  </div>
                  <div>
                    <Label>Tagline *</Label>
                    <Input
                      value={newService.tagline}
                      onChange={(e) => setNewService((prev) => ({ ...prev, tagline: e.target.value }))}
                      placeholder="Intelligent Automation & Custom LLMs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Unique Service ID (e.g. 'ai', 'mobile') *</Label>
                    <Input
                      value={newService.serviceId}
                      onChange={(e) => setNewService((prev) => ({ ...prev, serviceId: e.target.value }))}
                      placeholder="ai"
                      required
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Select
                      defaultValue={newService.iconName}
                      onValueChange={(val) => setNewService((prev) => ({ ...prev, iconName: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Code">Code (Web)</SelectItem>
                        <SelectItem value="Layers">Layers (Full Stack)</SelectItem>
                        <SelectItem value="Smartphone">Smartphone (Mobile)</SelectItem>
                        <SelectItem value="Palette">Palette (UI/UX)</SelectItem>
                        <SelectItem value="Cloud">Cloud (DevOps)</SelectItem>
                        <SelectItem value="Brain">Brain (AI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Short Description *</Label>
                  <Textarea
                    rows={2}
                    value={newService.shortDescription}
                    onChange={(e) => setNewService((prev) => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Brief description for homepage service cards..."
                    required
                  />
                </div>

                <div>
                  <Label>Full Description *</Label>
                  <Textarea
                    rows={3}
                    value={newService.description}
                    onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Comprehensive description for /services page..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Typical Timeline</Label>
                    <Input
                      value={newService.typicalTimeline}
                      onChange={(e) => setNewService((prev) => ({ ...prev, typicalTimeline: e.target.value }))}
                      placeholder="2 - 6 weeks"
                    />
                  </div>
                  <div>
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={newService.technologies}
                      onChange={(e) => setNewService((prev) => ({ ...prev, technologies: e.target.value }))}
                      placeholder="Next.js, Python, OpenAI, LangChain"
                    />
                  </div>
                </div>

                <div>
                  <Label>Deliverables</Label>
                  <Input
                    value={newService.deliverables}
                    onChange={(e) => setNewService((prev) => ({ ...prev, deliverables: e.target.value }))}
                    placeholder="Full-stack source code, deployed microservice, documentation"
                  />
                </div>

                <div>
                  <Label>Features List (1 per line)</Label>
                  <Textarea
                    rows={4}
                    value={newService.features}
                    onChange={(e) => setNewService((prev) => ({ ...prev, features: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Saving Service..." : "Publish Service Offering"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading services...
        </div>
      ) : services.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Services in Database</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Add Service" or run the Database Seeder to import your 6 standard offerings.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, idx) => (
            <Card key={service._id || service.serviceId || service.id || `service-${idx}`} className="glass-card border-slate-800">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        ID: {service.serviceId}
                      </Badge>
                      <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">
                        {service.iconName}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-xs text-primary font-medium">{service.tagline}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                      <Link href={`/services#${service.serviceId}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => handleDelete(service._id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">{service.shortDescription}</p>

                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 space-y-1">
                  <div>
                    <strong className="text-slate-300">Timeline:</strong> {service.typicalTimeline}
                  </div>
                  <div>
                    <strong className="text-slate-300">Deliverables:</strong> {service.deliverables}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
