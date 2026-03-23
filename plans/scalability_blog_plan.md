# 🚀 Long-Term Scalability & Blog Architecture Plan

## 🎯 Core Objectives
1. **Separation of Concerns:** Decouple hardcoded data from UI components to keep React files clean and maintainable.
2. **Content Scalability:** Transition from localized arrays to a robust file-based Content Management System (CMS) using Markdown/MDX.
3. **Dedicated Routing:** Prevent the homepage from bloating by creating dedicated archive pages for Projects and Highlights.
4. **The Gateway (Blog):** Establish a technical blog architecture that seamlessly inherits the Monochromatic Neo-Analog aesthetic.

---

## 📋 Execution Phases & Checkpoints

### Phase 1: Data Decoupling (Immediate)
- [x] Create a `src/types/` directory and extract `Project` and `Highlight` TypeScript interfaces.
- [x] Create a `src/data/` directory.
- [x] Move `PROJECTS` data into `src/data/projects.ts`.
- [x] Move `HIGHLIGHTS` data into `src/data/highlights.ts`.
- [x] Update `ProjectsSection.tsx` and `HighlightsSection.tsx` to import data from these new modules.

### Phase 2: UI Scalability (Short-Term)
- [x] Update the homepage to only display the top 3-4 items using `.slice(0, 4)`.
- [x] Create a dedicated `/projects` route to display the full grid of all historical projects.
- [x] Add a sleek, Monospace "VIEW ALL TRANSMISSIONS ->" link at the bottom of the homepage sections to route users to the archives.

### Phase 3: The Markdown Engine (Medium-Term)
- [x] Install MDX dependencies (e.g., `next-mdx-remote` or `contentlayer`/`gray-matter`) to parse local markdown files.
- [x] Create a `content/blog/` directory to store `.mdx` files.
- [x] Establish standard Frontmatter schemas for blog posts (Title, Date, Cover Image, Excerpt, Tags).
- [x] Build an MDX component mapper so standard markdown elements (`#`, `**`, ` ``` `) are automatically styled with our high-contrast, neo-analog Tailwind classes.

### Phase 4: Dynamic Blog Routing (Long-Term)
- [x] Create a `/blog` route to serve as the main article feed, featuring a minimalist list or grid layout.
- [x] Create a dynamic route `/blog/[slug]/page.tsx` to programmatically generate individual post pages based on the MDX filenames.
- [x] Implement SEO best practices (dynamic Meta tags, OpenGraph images) for each dynamically generated blog post.

### Phase 5: Advanced Indexing & Features (Optional Polish)
- [x] Add a tagging and filtering system (e.g., filter blog posts by "Python" or "React").
- [x] Implement a "Reading Time" estimator for blog posts.
- [x] Add an automated "Table of Contents" generator for long-form case studies.

---
*Note: This plan ensures the portfolio can scale from 3 projects to 100+ articles without degrading performance or breaking the core aesthetic.*