import type React from "react";
import type { Metadata } from "next";
import blogData from "@/data/blog.json";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article not found | RSNexus Blog",
      description: "The requested RSNexus blog article could not be found.",
    };
  }

  const url = `https://rsnexus.in/blog/${params.slug}`;

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

export default function BlogSlugLayout({ children, params }: BlogLayoutProps) {
  const post = blogData.find((p) => p.slug === params.slug);

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
          name: post?.title ?? params.slug,
          item: `https://rsnexus.in/blog/${params.slug}`,
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
