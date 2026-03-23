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
