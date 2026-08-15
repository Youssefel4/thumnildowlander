import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, Calendar, Clock, ChevronRight, User } from "lucide-react";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      return {
        meta: [{ title: "Article Not Found | ThumbGrab Blog" }],
      };
    }
    return {
      meta: [
        { title: `${post.title} | ThumbGrab Blog` },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:url", content: `/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        { name: "keywords", content: post.keywords.join(", ") },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: new Date(post.date).toISOString(),
            author: {
              "@type": "Organization",
              name: "ThumbGrab",
            },
            publisher: {
              "@type": "Organization",
              name: "ThumbGrab",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `/blog/${post.slug}`,
            },
          }),
        },
      ],
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <SiteLayout>
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-blue font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const related = getRelatedPosts(slug, 3);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="px-4 pt-6">
        <div className="container mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-brand-blue">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-brand-blue">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>ThumbGrab Team</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time>{post.date}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
              [&_li]:text-muted-foreground
              [&_a]:text-brand-blue [&_a]:underline [&_a]:hover:text-brand-blue/80
              [&_strong]:text-foreground [&_strong]:font-semibold
              [&_em]:italic
              [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
              [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
              [&_th]:bg-secondary [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-sm
              [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="px-4 py-12 bg-secondary/40">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-elevated transition-shadow block"
                >
                  <div className="text-xs text-brand-blue font-medium mb-1">
                    {r.category}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-2">
                    {r.title}
                  </h3>
                  <div className="text-xs text-muted-foreground">
                    {r.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-blue font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
