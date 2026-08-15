export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  keywords: string[];
  content: string;
}

import { articlesPart1 } from "./blog-articles-1";
import { articlesPart2 } from "./blog-articles-2";
import { articlesPart3 } from "./blog-articles-3";

export const blogPosts: BlogPost[] = [
  ...articlesPart1,
  ...articlesPart2,
  ...articlesPart3,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, count);
  // Prefer same category, then recent
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category === current.category,
  );
  const others = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

export const categories = Array.from(
  new Set(blogPosts.map((p) => p.category)),
).sort();
