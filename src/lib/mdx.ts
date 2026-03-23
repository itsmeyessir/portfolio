import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the absolute path to the markdown content directory
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
}

export interface Post {
  meta: PostMeta;
  content: string;
}

/**
 * Gets all MDX filenames from the blog directory.
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

/**
 * Reads a single MDX file by slug and parses its frontmatter and content.
 */
export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Calculate Reading Time (assuming ~200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200) + " min read";

  // Extract Table of Contents (H2 and H3)
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create a simple URL-friendly ID
    const id = text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ id, text, level });
  }

  return {
    meta: {
      slug: realSlug,
      title: data.title || "Untitled Transmission",
      date: data.date || "1970-01-01",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage,
      tags: data.tags || [],
      readingTime,
      toc,
    },
    content,
  };
}

/**
 * Gets all posts sorted by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug).meta)
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
