import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { connectDB } from "@/lib/db";
import {
  TeamMember,
  Project,
  BlogPost,
  JobOpening,
  JobApplication,
  Inquiry,
} from "@/models";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Inbox,
  FolderGit2,
  FileText,
  Sparkles,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  let dbConnected = false;
  let stats = {
    teamCount: 0,
    jobsCount: 0,
    applicationsCount: 0,
    projectsCount: 0,
    blogCount: 0,
    inquiryCount: 0,
    recentInquiries: [] as any[],
  };

  try {
    const db = await connectDB();
    if (db) {
      dbConnected = true;
      const [
        teamCount,
        jobsCount,
        applicationsCount,
        projectsCount,
        blogCount,
        inquiryCount,
        recentInquiries,
      ] = await Promise.all([
        TeamMember.countDocuments(),
        JobOpening.countDocuments({ status: "active" }),
        JobApplication.countDocuments(),
        Project.countDocuments(),
        BlogPost.countDocuments(),
        Inquiry.countDocuments(),
        Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

      stats = {
        teamCount,
        jobsCount,
        applicationsCount,
        projectsCount,
        blogCount,
        inquiryCount,
        recentInquiries,
      };
    } else {
      try {
        const teamData = (await import("@/data/team.json")).default;
        const careersData = (await import("@/data/careers.json")).default;
        const projectsData = (await import("@/data/projects.json")).default;
        const blogData = (await import("@/data/blog.json")).default;
        stats.teamCount = Array.isArray(teamData) ? teamData.length : 0;
        stats.jobsCount = Array.isArray(careersData) ? careersData.length : 0;
        stats.projectsCount = Array.isArray(projectsData)
          ? projectsData.length
          : Array.isArray((projectsData as any).projects)
          ? (projectsData as any).projects.length
          : 0;
        stats.blogCount = Array.isArray(blogData) ? blogData.length : 0;
      } catch (err) {
        // ignore fallback read error
      }
    }
  } catch (e) {
    console.error("Error loading admin dashboard stats:", e);
  }

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Studio Overview
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time management for team members, client portfolio, recruitment, and inbound leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {dbConnected ? (
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 gap-1.5 px-3 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              MongoDB Connected
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 gap-1.5 px-3 py-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Fallback Mode (Set MONGODB_URI)
            </Badge>
          )}

          <Button asChild size="sm">
            <Link href="/admin/seed">
              <Sparkles className="w-4 h-4 mr-2" />
              Seed Database
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Careers & Applications */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Active Job Openings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{stats.jobsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.applicationsCount} candidate applications received
            </p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/jobs">Manage Jobs</Link>
              </Button>
              <Button asChild variant="secondary" size="sm" className="w-full text-xs">
                <Link href="/admin/applications">View Candidates</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Projects */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Portfolio Projects
            </CardTitle>
            <FolderGit2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{stats.projectsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Live case studies and internal tool showcases
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/portfolio">Manage Portfolio</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Client Inquiries */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Inbound Leads & Quotes
            </CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{stats.inquiryCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Client messages from contact page & calculator
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/inquiries">Review Inquiries</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Team & Founders
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{stats.teamCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Leadership & engineering team members
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/team">Manage Team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Articles */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Articles & Guides
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{stats.blogCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Published technical notes and startup advice
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <Link href="/admin/blog">Manage Articles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links / Database Tools */}
        <Card className="glass-card border-slate-800 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Data Synchronization
            </CardTitle>
            <Inbox className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold text-white">JSON to MongoDB Sync</div>
            <p className="text-xs text-muted-foreground mt-1">
              One-click seeder imports all current data into your active database
            </p>
            <div className="mt-4">
              <Button asChild size="sm" className="w-full text-xs">
                <Link href="/admin/seed">
                  Sync Database Now
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries List */}
      <Card className="glass-card border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Client Inquiries</CardTitle>
              <CardDescription>
                Submissions from the Contact form and Scope Estimator
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/inquiries">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentInquiries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No inquiries received yet. Submit a test message through the{" "}
              <Link href="/contact" target="_blank" className="text-primary hover:underline">
                Contact Page
              </Link>
              .
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {stats.recentInquiries.map((inquiry: any) => (
                <div key={inquiry._id.toString()} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-white">{inquiry.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {inquiry.email} • {inquiry.service || "General Inquiry"}
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs">
                    {inquiry.status || "new"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
