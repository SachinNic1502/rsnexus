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
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  Calendar,
  User,
  RefreshCw,
} from "lucide-react";

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    category: "Web Development",
    excerpt: "",
    readTime: "5 min read",
    author: "Sachin Rathod",
    content: "",
    isPublished: true,
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (res.ok) {
        toast({ title: !current ? "Article Published" : "Article moved to Drafts" });
        setPosts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isPublished: !current } : p))
        );
      }
    } catch (e) {
      toast({ title: "Failed to update article", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Article deleted" });
        setPosts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const paragraphs = newPost.content
        .split("\n\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: newPost.title,
        slug: newPost.slug,
        category: newPost.category,
        excerpt: newPost.excerpt,
        readTime: newPost.readTime,
        author: newPost.author,
        content: paragraphs,
        isPublished: newPost.isPublished,
        publishedDate: new Date(),
      };

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "Article Published Successfully!" });
        setOpenModal(false);
        fetchPosts();
        setNewPost({
          title: "",
          slug: "",
          category: "Web Development",
          excerpt: "",
          readTime: "5 min read",
          author: "Sachin Rathod",
          content: "",
          isPublished: true,
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
          <h1 className="text-3xl font-extrabold text-white">Blog & Technical Notes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Write, publish, and manage engineering insights and startup advice.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchPosts}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Write New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Write a New Article</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Article Title *</Label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        setNewPost((prev) => ({ ...prev, title, slug }));
                      }}
                      placeholder="Next.js vs React in 2026"
                      required
                    />
                  </div>
                  <div>
                    <Label>URL Slug *</Label>
                    <Input
                      value={newPost.slug}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="nextjs-vs-react-2026"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Category *</Label>
                    <Input
                      value={newPost.category}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, category: e.target.value }))}
                      placeholder="Web Development"
                      required
                    />
                  </div>
                  <div>
                    <Label>Read Time</Label>
                    <Input
                      value={newPost.readTime}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, readTime: e.target.value }))}
                      placeholder="5 min read"
                    />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input
                      value={newPost.author}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Short Excerpt *</Label>
                  <Textarea
                    rows={2}
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief summary shown on blog cards..."
                    required
                  />
                </div>

                <div>
                  <Label>Article Content (Separate paragraphs with double newlines) *</Label>
                  <Textarea
                    rows={8}
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Paragraph 1...&#10;&#10;Paragraph 2...&#10;&#10;Paragraph 3..."
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={newPost.isPublished}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, isPublished: e.target.checked }))}
                    className="rounded border-slate-700"
                  />
                  <Label htmlFor="isPublished" className="cursor-pointer">
                    Publish immediately (uncheck to save as Draft)
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Publishing..." : "Publish Article"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading articles...
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Articles Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Write New Article" or run the Database Seeder to import existing blog posts.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post, idx) => {
            const dateStr = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : "";

            return (
              <Card key={post._id || post.slug || `blog-${idx}`} className="glass-card border-slate-800">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {post.category}
                      </Badge>
                      <Badge
                        className={`text-xs ${
                          post.isPublished
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white">{post.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-primary" />
                        {post.author}
                      </span>
                      {dateStr && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {dateStr}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleTogglePublish(post._id, post.isPublished)}
                    >
                      {post.isPublished ? "Unpublish" : "Publish"}
                    </Button>

                    <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        View
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => handleDelete(post._id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
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
