export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  description: string;
  /** Posortowane: okładka pierwsza, potem sortOrder. */
  images: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
};
