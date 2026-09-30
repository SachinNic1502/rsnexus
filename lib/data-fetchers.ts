import { connectDB } from "@/lib/db";
import {
  TeamMember,
  Project,
  BlogPost,
  Service,
  Faq,
  Testimonial,
  JobOpening,
} from "@/models";
import fallbackTeam from "@/data/team.json";
import fallbackProjectsData from "@/data/projects.json";
import fallbackBlog from "@/data/blog.json";
import fallbackServicesData from "@/data/services.json";
import fallbackFaq from "@/data/faq.json";
import fallbackTestimonials from "@/data/testimonial.json";
import fallbackCareers from "@/data/careers.json";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/* ===================================================
   TEAM
=================================================== */
export async function getTeamMembers() {
  try {
    const db = await connectDB();
    if (db) {
      const members = await TeamMember.find({ isActive: true }).sort({ order: 1 }).lean();
      if (members && members.length > 0) {
        return members.map((m: any) => ({
          ...m,
          _id: m._id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback team data due to:", error);
  }
  return fallbackTeam;
}

export async function getFounders() {
  const members = await getTeamMembers();
  return members.filter((m: any) => m.role === "Founder" || m.role === "Co-Founder");
}

/* ===================================================
   PORTFOLIO / PROJECTS
=================================================== */
export async function getProjects() {
  try {
    const db = await connectDB();
    if (db) {
      const projects = await Project.find().sort({ order: 1 }).lean();
      if (projects && projects.length > 0) {
        return projects.map((p: any) => ({
          ...p,
          _id: p._id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback projects data due to:", error);
  }
  return fallbackProjectsData.projects;
}

export async function getProjectBySlug(slug: string) {
  try {
    const db = await connectDB();
    if (db) {
      const project = await Project.findOne({ slug }).lean();
      if (project) {
        return {
          ...project,
          _id: (project as any)._id.toString(),
        };
      }
    }
  } catch (error) {
    console.warn("Using fallback project search due to:", error);
  }
  return fallbackProjectsData.projects.find(
    (p: any) => (p.slug || slugify(p.title)) === slug
  );
}

export async function getFeaturedProjects(limit = 4) {
  const projects = await getProjects();
  return [...projects]
    .sort((a: any, b: any) => (a.label === "Featured Project" ? -1 : 0) - (b.label === "Featured Project" ? -1 : 0))
    .slice(0, limit);
}

/* ===================================================
   BLOG
=================================================== */
export async function getBlogPosts() {
  try {
    const db = await connectDB();
    if (db) {
      const posts = await BlogPost.find({ isPublished: true })
        .sort({ publishedDate: -1 })
        .lean();
      if (posts && posts.length > 0) {
        return posts.map((p: any) => ({
          ...p,
          _id: p._id.toString(),
          publishedDate: p.publishedDate ? p.publishedDate.toISOString() : new Date().toISOString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback blog data due to:", error);
  }
  return fallbackBlog;
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const db = await connectDB();
    if (db) {
      const post = await BlogPost.findOne({ slug, isPublished: true }).lean();
      if (post) {
        return {
          ...post,
          _id: (post as any)._id.toString(),
          publishedDate: (post as any).publishedDate
            ? (post as any).publishedDate.toISOString()
            : new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.warn("Using fallback blog search due to:", error);
  }
  return fallbackBlog.find((p) => p.slug === slug);
}

/* ===================================================
   SERVICES
=================================================== */
export async function getServicesData() {
  try {
    const db = await connectDB();
    if (db) {
      const services = await Service.find({ isActive: true }).sort({ order: 1 }).lean();
      if (services && services.length > 0) {
        return services.map((s: any) => ({
          ...s,
          id: s.serviceId,
          _id: s._id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback services data due to:", error);
  }
  return fallbackServicesData.services;
}

/* ===================================================
   FAQS
=================================================== */
export async function getFaqData() {
  try {
    const db = await connectDB();
    if (db) {
      const faqs = await Faq.find().sort({ order: 1 }).lean();
      if (faqs && faqs.length > 0) {
        return faqs.map((f: any) => ({
          ...f,
          _id: f._id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback faq data due to:", error);
  }
  return fallbackFaq;
}

/* ===================================================
   TESTIMONIALS
=================================================== */
export async function getTestimonialData() {
  try {
    const db = await connectDB();
    if (db) {
      const testimonials = await Testimonial.find({ isApproved: true })
        .sort({ order: 1 })
        .lean();
      if (testimonials && testimonials.length > 0) {
        return testimonials.map((t: any) => ({
          ...t,
          _id: t._id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback testimonial data due to:", error);
  }
  return fallbackTestimonials;
}

/* ===================================================
   JOBS & CAREERS
=================================================== */
export async function getActiveJobOpenings() {
  try {
    const db = await connectDB();
    if (db) {
      const jobs = await JobOpening.find({ status: "active" }).sort({ order: 1 }).lean();
      if (jobs && jobs.length > 0) {
        return jobs.map((j: any) => ({
          ...j,
          _id: j._id.toString(),
          deadline: j.deadline ? j.deadline.toISOString() : null,
          createdAt: j.createdAt ? j.createdAt.toISOString() : null,
        }));
      }
    }
  } catch (error) {
    console.warn("Using fallback job openings due to:", error);
  }
  return fallbackCareers;
}

export async function getJobOpeningBySlug(slug: string) {
  try {
    const db = await connectDB();
    if (db) {
      const job = await JobOpening.findOne({ slug, status: "active" }).lean();
      if (job) {
        return {
          ...job,
          _id: (job as any)._id.toString(),
          deadline: (job as any).deadline ? (job as any).deadline.toISOString() : null,
        };
      }
    }
  } catch (error) {
    console.warn("Using fallback job by slug search due to:", error);
  }
  return fallbackCareers.find((j: any) => j.slug === slug) || null;
}
