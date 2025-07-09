export interface BlockData {
  id: string;
  type: string;
  content: Record<string, any>;
  styles?: Record<string, any>;
  order?: number;
}

export interface PageData {
  id: string;
  title: string;
  slug?: string;
  blocks: BlockData[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  status?: 'draft' | 'published';
}

export interface BlockComponent {
  id: string;
  name: string;
  icon: string;
  category: 'content' | 'layout' | 'media' | 'interactive';
  defaultContent: Record<string, any>;
}

export interface DragItem {
  type: string;
  id: string;
  index?: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiPage {
  id: number;
  attributes: {
    title: string;
    slug: string;
    blocks: BlockData[];
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    status: 'draft' | 'published';
  };
}