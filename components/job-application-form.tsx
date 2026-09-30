"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, jobId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: data.message || "Thank you for applying. We'll be in touch soon!",
        });
      } else {
        toast({
          title: "Submission Error",
          description: data.message || "Failed to submit your application.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "An unexpected network error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="glass-card border-emerald-500/30 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <CardTitle className="text-2xl font-bold mb-2">Application Received!</CardTitle>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Thank you for applying for the <strong>{jobTitle}</strong> position. Our engineering team reviews all applications thoroughly and will respond via email.
        </p>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-primary/20 shadow-xl" id="apply">
      <CardHeader>
        <CardTitle className="text-2xl">Apply for this Position</CardTitle>
        <CardDescription>
          Submit your profile directly to our founders. No automated applicant filters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="candidateName">Full Name *</Label>
              <Input
                id="candidateName"
                value={formData.candidateName}
                onChange={(e) => handleChange("candidateName", e.target.value)}
                placeholder="Aarav Sharma"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="aarav@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone / WhatsApp Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <Label htmlFor="resumeUrl">Resume Link (Google Drive / Notion / Dropbox) *</Label>
              <Input
                id="resumeUrl"
                type="url"
                value={formData.resumeUrl}
                onChange={(e) => handleChange("resumeUrl", e.target.value)}
                placeholder="https://drive.google.com/..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="portfolioUrl">Portfolio or GitHub URL</Label>
              <Input
                id="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="coverLetter">Why are you excited to build with RSNexus?</Label>
            <Textarea
              id="coverLetter"
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => handleChange("coverLetter", e.target.value)}
              placeholder="Tell us about the hardest problem you solved or why you want to work on modern web apps..."
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting Application..." : "Submit Application"}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
