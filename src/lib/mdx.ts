import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ChangelogType } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: string;
  toc?: TocItem[];
  type: "article" | "release";
  project?: string;
  projectTitle?: string;
  version?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200) + " min read";

  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
    toc.push({ id, text, level });
  }

  const postType = data.type === "release" ? "release" : "article";

  return {
    meta: {
      slug: realSlug,
      title: data.title || "Untitled",
      date: data.date || "1970-01-01",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage,
      tags: data.tags || [],
      readingTime,
      toc,
      type: postType,
      project: data.project,
      projectTitle: data.projectTitle,
      version: data.version,
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug).meta)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
