export type Project = {
  id: number;
  media: string;
  mediaType: "image" | "video";
  title: string;
  description: string;
  details: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
  };
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

export type Highlight = {
  id: number;
  media: string;
  title: string;
  description: string;
  story: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  className?: string;
};

export type ChangelogType = "feature" | "fix" | "breaking" | "improvement";

export type ChangelogMeta = {
  slug: string;
  project: string;
  projectTitle: string;
  version: string;
  date: string;
  type: ChangelogType;
  title: string;
  description?: string;
  tags?: string[];
};
