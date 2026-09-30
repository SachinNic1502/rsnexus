"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Trash2, Mail, Phone, Linkedin, Github, RefreshCw } from "lucide-react";

export default function AdminTeamPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    isFounder: false,
  });

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success) {
        setMembers(data.members || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Team member removed" });
        setMembers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (e) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast({ title: "Team member added!" });
        setOpenModal(false);
        fetchTeam();
        setNewMember({
          name: "",
          role: "",
          image: "",
          bio: "",
          email: "",
          phone: "",
          linkedin: "",
          github: "",
          isFounder: false,
        });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (e) {
      toast({ title: "Failed to add member", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Team & Leadership</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your engineers, founders, and core team displayed on /team and /about.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchTeam}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={newMember.name}
                      onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Sachin Rathod"
                      required
                    />
                  </div>
                  <div>
                    <Label>Role / Title *</Label>
                    <Input
                      value={newMember.role}
                      onChange={(e) =>
                        setNewMember((prev) => ({
                          ...prev,
                          role: e.target.value,
                          isFounder: e.target.value.toLowerCase().includes("founder"),
                        }))
                      }
                      placeholder="Full Stack Lead / Founder"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Avatar Photo URL (Cloudinary / Image Link) *</Label>
                  <Input
                    value={newMember.image}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://res.cloudinary.com/..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="sachin@rsnexus.in"
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={newMember.phone}
                      onChange={(e) => setNewMember((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 93099 31886"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={newMember.linkedin}
                      onChange={(e) => setNewMember((prev) => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={newMember.github}
                      onChange={(e) => setNewMember((prev) => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div>
                  <Label>Bio / Summary *</Label>
                  <Textarea
                    rows={3}
                    value={newMember.bio}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief background and engineering focus..."
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFounder"
                    checked={newMember.isFounder}
                    onChange={(e) => setNewMember((prev) => ({ ...prev, isFounder: e.target.checked }))}
                    className="rounded border-slate-700"
                  />
                  <Label htmlFor="isFounder" className="cursor-pointer">
                    Feature in Homepage Founder-Led section
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={creating}>
                  {creating ? "Adding Member..." : "Save Team Member"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading team members...
        </div>
      ) : members.length === 0 ? (
        <Card className="p-12 text-center glass-card border-dashed">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-semibold text-lg text-white mb-1">No Team Members Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click "Add Member" or run the Database Seeder to import existing founders.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member, idx) => (
            <Card key={member._id || member.email || `team-${idx}`} className="glass-card border-slate-800 overflow-hidden">
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/30">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-white leading-tight">{member.name}</h3>
                      {member.isFounder && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0">
                          Founder
                        </Badge>
                      )}
                    </div>
                    <p className="text-primary text-xs font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 p-1"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleDelete(member._id)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Remove
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
