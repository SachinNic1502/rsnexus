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
import teamData from "@/data/team.json";
import projectsData from "@/data/projects.json";
import blogData from "@/data/blog.json";
import servicesData from "@/data/services.json";
import faqData from "@/data/faq.json";
import testimonialData from "@/data/testimonial.json";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export async function runDatabaseSeed() {
  const db = await connectDB();
  if (!db) {
    throw new Error("Cannot seed: MongoDB connection could not be established. Check MONGODB_URI.");
  }

  const results: Record<string, number> = {
    teamMembers: 0,
    projects: 0,
    blogPosts: 0,
    services: 0,
    faqs: 0,
    testimonials: 0,
    jobOpenings: 0,
  };

  // 1. Seed Team Members
  for (let i = 0; i < teamData.length; i++) {
    const member = teamData[i];
    const isFounder =
      member.role.toLowerCase().includes("founder") ||
      member.role.toLowerCase().includes("cto") ||
      member.role.toLowerCase().includes("coo");

    await TeamMember.findOneAndUpdate(
      { email: member.email },
      {
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio,
        linkedin: member.linkedin || "",
        github: member.github || "",
        email: member.email,
        phone: member.phone || "",
        isFounder,
        order: i,
        isActive: true,
      },
      { upsert: true, new: true }
    );
    results.teamMembers++;
  }

  // 2. Seed Projects & Case Studies
  const rawProjects = projectsData.projects;
  for (let i = 0; i < rawProjects.length; i++) {
    const p = rawProjects[i];
    const projectSlug = p.slug || slugify(p.title);

    await Project.findOneAndUpdate(
      { slug: projectSlug },
      {
        title: p.title,
        slug: projectSlug,
        category: p.category,
        label: p.label || "Client Project",
        description: p.description,
        images: p.images && p.images.length > 0 ? p.images : [(p as any).image].filter(Boolean),
        technologies: p.technologies || [],
        features: p.features || [],
        results: p.results || [],
        tags: (p as any).tags || [p.category],
        liveUrl: p.liveUrl || "",
        githubUrl: p.githubUrl || "",
        isFeatured: p.label === "Featured Project",
        isClientWork: ["Featured Project", "Client Project", "Internal Project"].includes(p.label),
        order: i,
        caseStudy: (p as any).caseStudy || {
          overview: p.description,
          challenge: "",
          solution: "",
          architecture: "",
          outcome: "",
        },
      },
      { upsert: true, new: true }
    );
    results.projects++;
  }

  // 3. Seed Blog Posts
  for (let i = 0; i < blogData.length; i++) {
    const post = blogData[i];
    await BlogPost.findOneAndUpdate(
      { slug: post.slug },
      {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        publishedDate: new Date(post.publishedDate),
        author: post.author || "Sachin Rathod",
        content: post.content || [],
        tags: [post.category],
        isPublished: true,
      },
      { upsert: true, new: true }
    );
    results.blogPosts++;
  }

  // 4. Seed Services
  const rawServices = servicesData.services;
  for (let i = 0; i < rawServices.length; i++) {
    const s = rawServices[i];
    await Service.findOneAndUpdate(
      { serviceId: s.id },
      {
        serviceId: s.id,
        slug: s.slug || slugify(s.title),
        title: s.title,
        tagline: s.tagline,
        iconName: s.iconName,
        shortDescription: s.shortDescription,
        description: s.description,
        features: s.features || [],
        technologies: s.technologies || [],
        deliverables: s.deliverables || "",
        typicalTimeline: s.typicalTimeline || "",
        order: i,
        isActive: true,
      },
      { upsert: true, new: true }
    );
    results.services++;
  }

  // 5. Seed FAQs
  for (let i = 0; i < faqData.length; i++) {
    const f = faqData[i];
    await Faq.findOneAndUpdate(
      { question: f.question },
      {
        question: f.question,
        answer: f.answer,
        category: i < 3 ? "General" : i < 6 ? "Pricing & Timeline" : "Technical & Process",
        isFeaturedOnContact: i < 4,
        order: i,
      },
      { upsert: true, new: true }
    );
    results.faqs++;
  }

  // 6. Seed Testimonials
  for (let i = 0; i < testimonialData.length; i++) {
    const t = testimonialData[i];
    await Testimonial.findOneAndUpdate(
      { name: t.name, projectSlug: t.projectSlug },
      {
        name: t.name,
        designation: t.designation,
        quote: t.quote,
        src: t.src || "",
        projectSlug: t.projectSlug || "",
        rating: 5,
        isApproved: true,
        isFeatured: true,
        order: i,
      },
      { upsert: true, new: true }
    );
    results.testimonials++;
  }

  // 7. Seed Sample Job Openings for Careers
  const sampleJobs = [
    {
      title: "Full Stack Next.js & React Engineer",
      slug: "full-stack-nextjs-engineer",
      department: "Engineering",
      location: "Remote (India)",
      type: "Full-time",
      experienceLevel: "1 - 3 Years",
      salaryRange: "₹5,00,000 - ₹9,00,000 / year",
      description:
        "We are looking for a skilled Full-Stack Next.js Developer to engineer fast, resilient web applications and microservices for our growing client base worldwide.",
      responsibilities: [
        "Develop high-performance client portals and SaaS web apps using Next.js 16 and TypeScript",
        "Design scalable REST/GraphQL API backends and integrate MongoDB / PostgreSQL databases",
        "Collaborate directly with founders to review PRs, refine architecture, and ship milestone deliveries",
        "Ensure Core Web Vitals, accessibility standards, and SEO best practices across projects",
      ],
      requirements: [
        "1-3 years of proven experience building production apps with React, Next.js, and TypeScript",
        "Solid command of Tailwind CSS, state management, and modern component systems",
        "Familiarity with MongoDB (Mongoose) or PostgreSQL (Prisma)",
        "Passionate problem-solver with clean code discipline and Git proficiency",
      ],
      benefits: [
        "100% Remote-first work culture",
        "Flexible hours with autonomy over your schedule",
        "Direct collaboration with technical founders without bureaucratic overhead",
        "Milestone bonuses and project equity opportunities",
      ],
      status: "active" as const,
      order: 1,
    },
    {
      title: "Frontend UI/UX Developer",
      slug: "frontend-ui-ux-developer",
      department: "Design & Engineering",
      location: "Remote (India)",
      type: "Full-time",
      experienceLevel: "1 - 2 Years",
      salaryRange: "₹4,00,000 - ₹7,00,000 / year",
      description:
        "Join our team to transform high-fidelity Figma prototypes into pixel-perfect, fluid, and interactive web experiences utilizing Framer Motion and modern Tailwind styling.",
      responsibilities: [
        "Translate Figma designs and wireframes into clean, accessible React components",
        "Implement smooth 60 FPS micro-animations, theme toggles, and responsive layouts",
        "Optimize web performance, bundle sizes, and image delivery pipelines",
      ],
      requirements: [
        "Strong portfolio demonstrating modern web aesthetics and design sense",
        "Proficiency in React, Tailwind CSS, Framer Motion, and TypeScript",
        "Experience collaborating with designers and turning designs into production code",
      ],
      benefits: [
        "100% Remote work from anywhere in India",
        "Generous learning and software tool stipend",
        "Fast-paced environment working on diverse high-impact projects",
      ],
      status: "active" as const,
      order: 2,
    },
    {
      title: "Junior Mobile App Engineer (React Native)",
      slug: "junior-mobile-app-engineer",
      department: "Mobile Development",
      location: "Remote (India)",
      type: "Full-time / Internship",
      experienceLevel: "0 - 1 Years",
      salaryRange: "₹3,50,000 - ₹5,50,000 / year",
      description:
        "Passionate about cross-platform mobile apps? Build and publish iOS and Android applications with our mobile development team.",
      responsibilities: [
        "Assist in building cross-platform mobile apps with React Native & Expo",
        "Integrate REST APIs, push notifications, and local offline storage",
        "Test across various device screen sizes and OS versions",
      ],
      requirements: [
        "Basic understanding of JavaScript/TypeScript and React fundamentals",
        "Eagerness to learn mobile build tools, Expo, and App Store submission processes",
        "Strong communication and curiosity to grow rapidly",
      ],
      benefits: [
        "Hands-on mentorship from senior mobile engineers",
        "Full-time conversion based on internship performance",
        "Remote work environment",
      ],
      status: "active" as const,
      order: 3,
    },
  ];

  for (const job of sampleJobs) {
    await JobOpening.findOneAndUpdate({ slug: job.slug }, job, {
      upsert: true,
      new: true,
    });
    results.jobOpenings++;
  }

  return results;
}
