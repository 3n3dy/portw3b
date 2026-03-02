export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  url: string;
  year: string;
  screenshot?: string;
  previewGif?: string;
  featured?: boolean;
}
