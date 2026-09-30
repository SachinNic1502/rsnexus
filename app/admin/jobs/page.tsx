"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle,
  Copy,
  RefreshCw,
} from "lucide-react";

export default function AdminJobsPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    slug: "",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    experienceLevel: "1 - 3 Years",
    salaryRange: "Competitive",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    status: "active",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast({ title: "Status updated" });
        setJobs((prev) =>
          prev.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j))
        );
      }
    } catch (e) {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Job opening deleted" });
        setJobs((prev) => prev.filter((j) => j._id !== jobId));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const payload = {
        ...newJob,
        responsibilities: newJob.responsibilities
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        requirements: newJob.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        benefits: newJob.benefits
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "Job Opening Created!" });
        setOpenModal(false);
        fetchJobs();
        setNewJob({
          title: "",
          slug: "",
          department: "Engineering",
          location: "Remote (India)",
          type: "Full-time",
          experienceLevel: "1 - 3 Years",
          salaryRange: "Competitive",
          description: "",
          responsibilities: "",
          requirements: "",
          benefits: "",
          status: "active",
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
          <h1 className="text-3xl font-extrabold text-white">Careers & Job Openings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Publish, edit, and control hiring roles on the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchJobs}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Post New Opening
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post a New Career Opening</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title *</Label>
                    <Input
                      value={newJob.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        setNewJob((prev) => ({ ...prev, title, slug }));
                      }}
                      placeholder="Senior Next.js Engineer"
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug *</Label>
                    <Input
                      value={newJob.slug}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="senior-nextjs-engineer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Department</Label>
                    <Input
                      value={newJob.department}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, department: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={newJob.location}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Employment Type</Label>
                    <Input
                      value={newJob.type}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, type: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Experience Level</Label>
                    <Input
                      value={newJob.experienceLevel}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, experienceLevel: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Salary Range / Compensation</Label>
                    <Input
                      value={newJob.salaryRange}
                      onChange={(e) => setNewJob((prev) => ({ ...prev, salaryRange: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Role Overview *</Label>
                  <Textarea
                    rows={3}
                    value={newJob.description}
                    onChange={(e) => setNewJob((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the mission and scope of this role..."
                    required
                  />
                </div>

                <div>
                  <Label>Responsibilities (1 per line)</Label>
                  <Textarea
                    rows={3}
                    value={newJob.responsibilities}
                    onChange={(e) => setNewJob((prev) => ({ ...prev, responsibilities: e.target.value }))}
                    placeholder="Build Next.js web applications&#10;Collaborate with founders&#10;Optimize Core Web Vitals"
                  />
                </div>

                <div>
                  <Label>Requirements (1 per line)</Label>
                  <Textarea
                    rows={3}
                    value={newJob.requirements}
                    onChange={(e) => setNewJob((prev) => ({ ...prev, requirements: e.target.value }))}
                    placeholder="2+ years React & TypeScript&#10;Git workflow proficiency&#10;Strong communication"
                  />
                </div>

                <div>
                  <Label>Perks & Benefits (1 per line)</Label>
                  <Textarea
                    rows={3}
                    value={newJob.benefits}
                    onChange={(e) => setNewJob((prev) => ({ ...prev, benefits: e.target.value }))}
                    placeholder="100% Remote&#10;Flexible hours&#10;Direct founder mentorship"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Publishing Job..." : "Publish Job Opening"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading job openings...
        </div>
      ) : jobs.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Job Openings in Database</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Post New Opening" above or run the Seeder Tool to populate standard roles.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job._id} className="glass-card border-slate-800">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                      {job.department}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {job.type}
                    </Badge>
                    <Badge
                      className={`text-xs capitalize ${
                        job.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : job.status === "draft"
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {job.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span>{job.experienceLevel}</span>
                    <span>{job.salaryRange}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    defaultValue={job.status}
                    onValueChange={(val) => handleStatusChange(job._id, val)}
                  >
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button asChild variant="outline" size="sm" className="h-8">
                    <Link href={`/careers/${job.slug}`} target="_blank">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      View Public
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleDelete(job._id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
