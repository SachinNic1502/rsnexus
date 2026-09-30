"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Inbox,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Linkedin,
  Globe,
  Trash2,
  RefreshCw,
  Clock,
} from "lucide-react";

export default function AdminApplicationsPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast({ title: "Status updated" });
        setApplications((prev) =>
          prev.map((a) => (a._id === appId ? { ...a, status: newStatus } : a))
        );
      }
    } catch (e) {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (appId: string) => {
    if (!confirm("Are you sure you want to delete this candidate application?")) return;
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Application deleted" });
        setApplications((prev) => prev.filter((a) => a._id !== appId));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const filtered = applications.filter((app) =>
    filterStatus === "all" ? true : app.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Candidate Applications</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Review incoming resumes, candidate portfolios, and progress applicants through hiring stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 text-xs">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages ({applications.length})</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={fetchApplications}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading candidate applications...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Applications Found</h3>
          <p className="text-sm text-muted-foreground">
            {filterStatus === "all"
              ? "Candidates who apply on your /careers page will appear here."
              : `No candidates currently in '${filterStatus}' stage.`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => {
            const jobTitle = app.jobId?.title || "Role Not Specified";
            const dateStr = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "";

            return (
              <Card key={app._id} className="glass-card border-slate-800">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{app.candidateName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {jobTitle}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <a href={`mailto:${app.email}`} className="hover:underline">
                            {app.email}
                          </a>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <a href={`tel:${app.phone}`} className="hover:underline">
                            {app.phone}
                          </a>
                        </span>
                        {dateStr && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Applied on {dateStr}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue={app.status || "submitted"}
                        onValueChange={(val) => handleStatusChange(app._id, val)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="reviewing">Reviewing</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDelete(app._id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Links Row */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                    {app.resumeUrl && (
                      <Button asChild size="sm" variant="secondary" className="h-8 text-xs">
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-3.5 h-3.5 mr-1 text-primary" />
                          View Resume
                          <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                        </a>
                      </Button>
                    )}
                    {app.portfolioUrl && (
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                        <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-3.5 h-3.5 mr-1" />
                          Portfolio / GitHub
                          <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                        </a>
                      </Button>
                    )}
                    {app.linkedinUrl && (
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                        <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-3.5 h-3.5 mr-1 text-blue-400" />
                          LinkedIn
                          <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {app.coverLetter && (
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                      <span className="font-semibold block text-white mb-1">Candidate Note:</span>
                      {app.coverLetter}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
