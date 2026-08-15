import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts, categories } from "@/lib/blog-data";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Tips on YouTube Thumbnails & Design | ThumbGrab" },
      {
        name: "description",
        content:
          "Tips, guides, and best practices for designing, downloading, and using YouTube thumbnails to grow your channel.",
      },
      { property: "og:title", content: "ThumbGrab Blog" },
      {
        property: "og:description",
        content:
          "Guides for YouTube creators and designers.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ThumbGrab Blog",
          description:
            "Tips, guides, and best practices for YouTube thumbnails.",
          url: "/blog",
          publisher: {
            "@type": "Organization",
            name: "ThumbGrab",
          },
        }),
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <SiteLayout>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Blog</h1>
            <p className="text-muted-foreground max-w-2xl">
              Guides, tutorials, and ideas for getting the most out of YouTube
              thumbnails. {blogPosts.length} articles to help you grow your
              channel.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "All"
                  ? "bg-brand-blue text-brand-blue-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({blogPosts.length})
            </button>
            {categories.map((cat) => {
              const count = blogPosts.filter(
                (p) => p.category === cat,
              ).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-brand-blue text-brand-blue-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Article Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow flex flex-col"
              >
                <div className="inline-block self-start px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-3">
                  {post.category}
                </div>
                <h2 className="font-semibold text-lg mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
