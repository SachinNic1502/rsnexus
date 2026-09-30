"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Mail,
  Phone,
  MessageCircle,
  Building,
  Trash2,
  RefreshCw,
  Clock,
  IndianRupee,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast({ title: "Lead status updated" });
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (e) {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Inquiry deleted" });
        setInquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const filtered = inquiries.filter((item) =>
    statusFilter === "all" ? true : item.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Client Inquiries & Leads</h1>
          <p className="text-muted-foreground text-sm mt-1">
            CRM dashboard for incoming project requests, budget inquiries, and consultation bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 text-xs">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads ({inquiries.length})</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in_discussion">In Discussion</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={fetchInquiries}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading client inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Leads Found</h3>
          <p className="text-sm text-muted-foreground">
            {statusFilter === "all"
              ? "Messages sent through the website contact form will appear here."
              : `No leads with status '${statusFilter}'.`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "";
            const cleanPhone = item.phone ? item.phone.replace(/[^0-9]/g, "") : "";

            return (
              <Card key={item._id} className="glass-card border-slate-800">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        {item.company && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {item.company}
                          </Badge>
                        )}
                        <Badge
                          className={`text-xs capitalize ${
                            item.status === "new"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : item.status === "contacted"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : item.status === "converted"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {item.status || "new"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          <a href={`mailto:${item.email}`} className="hover:underline">
                            {item.email}
                          </a>
                        </span>
                        {item.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <a href={`tel:${item.phone}`} className="hover:underline">
                              {item.phone}
                            </a>
                          </span>
                        )}
                        {item.service && (
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Interested in: <strong>{item.service}</strong>
                          </span>
                        )}
                        {item.budget && (
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                            Budget: <strong>{item.budget}</strong>
                          </span>
                        )}
                        {dateStr && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Received {dateStr}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue={item.status || "new"}
                        onValueChange={(val) => handleStatusChange(item._id, val)}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New Lead</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="in_discussion">In Discussion</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                    {item.message}
                  </div>

                  {/* Quick Action buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button asChild size="sm" variant="secondary" className="h-8 text-xs">
                      <a
                        href={`mailto:${item.email}?subject=RSNexus Consultation Follow-up&body=Hi ${item.name},%0D%0A%0D%0AThank you for reaching out to RSNexus regarding your project...`}
                      >
                        <Mail className="w-3.5 h-3.5 mr-1 text-primary" />
                        Reply by Email
                      </a>
                    </Button>

                    {cleanPhone && (
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                            item.name
                          )},%20this%20is%20Sachin%20from%20RSNexus.%20Thank%20you%20for%20reaching%20out!`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1" />
                          Chat on WhatsApp
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
