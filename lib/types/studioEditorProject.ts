export type StudioEditorImage = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isCover: boolean;
};

export type StudioEditorProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  year: string;
  type: string;
  published: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  images: StudioEditorImage[];
};
