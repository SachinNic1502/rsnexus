"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  HelpCircle,
  Plus,
  Trash2,
  RefreshCw,
  Star,
} from "lucide-react";

export default function AdminFaqsPage() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "General",
    isFeaturedOnContact: false,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success) {
        setFaqs(data.faqs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeaturedOnContact: !current }),
      });
      if (res.ok) {
        toast({ title: !current ? "Featured on /contact page" : "Removed from /contact page" });
        setFaqs((prev) =>
          prev.map((f) => (f._id === id ? { ...f, isFeaturedOnContact: !current } : f))
        );
      }
    } catch (e) {
      toast({ title: "Failed to update FAQ", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "FAQ deleted" });
        setFaqs((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFaq),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "FAQ Created Successfully!" });
        setOpenModal(false);
        fetchFaqs();
        setNewFaq({
          question: "",
          answer: "",
          category: "General",
          isFeaturedOnContact: false,
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
          <h1 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage questions and answers displayed on /faq and the contact page teaser.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchFaqs}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New FAQ</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={newFaq.category}
                    onChange={(e) => setNewFaq((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="General, Pricing, Process, Technical"
                  />
                </div>

                <div>
                  <Label>Question *</Label>
                  <Input
                    value={newFaq.question}
                    onChange={(e) => setNewFaq((prev) => ({ ...prev, question: e.target.value }))}
                    placeholder="How long does development take?"
                    required
                  />
                </div>

                <div>
                  <Label>Answer *</Label>
                  <Textarea
                    rows={4}
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq((prev) => ({ ...prev, answer: e.target.value }))}
                    placeholder="Direct, honest explanation..."
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={newFaq.isFeaturedOnContact}
                    onChange={(e) => setNewFaq((prev) => ({ ...prev, isFeaturedOnContact: e.target.checked }))}
                    className="rounded border-slate-700"
                  />
                  <Label htmlFor="isFeatured" className="cursor-pointer">
                    Show as quick FAQ teaser on /contact page
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Saving FAQ..." : "Publish FAQ"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading FAQs...
        </div>
      ) : faqs.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No FAQs Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Add FAQ" or run the Database Seeder to import your 8 standard answers.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <Card key={faq._id || `faq-${idx}`} className="glass-card border-slate-800">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {faq.category || "General"}
                    </Badge>
                    {faq.isFeaturedOnContact && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                        Featured on /contact
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-white">{faq.question}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${
                      faq.isFeaturedOnContact ? "text-amber-400 border-amber-500/40" : ""
                    }`}
                    onClick={() => handleToggleFeatured(faq._id, faq.isFeaturedOnContact)}
                  >
                    <Star className={`w-3.5 h-3.5 mr-1 ${faq.isFeaturedOnContact ? "fill-amber-400" : ""}`} />
                    {faq.isFeaturedOnContact ? "Featured" : "Feature"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleDelete(faq._id)}
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
