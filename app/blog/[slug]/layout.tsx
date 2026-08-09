import type React from "react";
import type { Metadata } from "next";
import blogData from "@/data/blog.json";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article not found | RSNexus Blog",
      description: "The requested RSNexus blog article could not be found.",
    };
  }

  const url = `https://rsnexus.in/blog/${slug}`;

  return {
    title: `${post.title} | RSNexus Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogSlugLayout({ children, params }: BlogLayoutProps) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  const structuredData = [
    ...(post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedDate,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "RSNexus",
              url: "https://rsnexus.in",
            },
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rsnexus.in" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://rsnexus.in/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: post?.title ?? slug,
          item: `https://rsnexus.in/blog/${slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
