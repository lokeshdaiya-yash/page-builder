import { PageData } from '../types';

// Mock data storage
let mockPages: PageData[] = [
  {
    id: '1',
    title: 'Home Page',
    slug: 'home',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Welcome to Our Page Builder',
          subtitle: 'Create beautiful pages with our drag-and-drop interface',
          backgroundImage: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
          ctaText: 'Get Started',
          ctaLink: '#'
        }
      },
      {
        id: 'text-1',
        type: 'text',
        props: {
          content: 'This is a sample text block. You can edit this content and add more blocks to build your page.',
          alignment: 'left'
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    status: 'published'
  }
];

let nextId = 2;

export class MockStrapiService {
  // Simulate network delay
  private static delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all pages
  static async getPages(): Promise<PageData[]> {
    await this.delay();
    return [...mockPages];
  }

  // Get single page by ID
  static async getPage(id: string): Promise<PageData> {
    await this.delay();
    const page = mockPages.find(p => p.id === id);
    if (!page) {
      throw new Error('Page not found');
    }
    return { ...page };
  }

  // Get page by slug
  static async getPageBySlug(slug: string): Promise<PageData> {
    await this.delay();
    const page = mockPages.find(p => p.slug === slug);
    if (!page) {
      throw new Error('Page not found');
    }
    return { ...page };
  }

  // Create new page
  static async createPage(pageData: Omit<PageData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PageData> {
    await this.delay();
    const now = new Date().toISOString();
    const newPage: PageData = {
      id: nextId.toString(),
      title: pageData.title,
      slug: pageData.slug || pageData.title.toLowerCase().replace(/\s+/g, '-'),
      blocks: pageData.blocks || [],
      createdAt: now,
      updatedAt: now,
      publishedAt: pageData.status === 'published' ? now : null,
      status: pageData.status || 'draft',
    };
    
    nextId++;
    mockPages.push(newPage);
    return { ...newPage };
  }

  // Update existing page
  static async updatePage(id: string, pageData: Partial<PageData>): Promise<PageData> {
    await this.delay();
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) {
      throw new Error('Page not found');
    }

    const updatedPage: PageData = {
      ...mockPages[pageIndex],
      ...pageData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    mockPages[pageIndex] = updatedPage;
    return { ...updatedPage };
  }

  // Delete page
  static async deletePage(id: string): Promise<void> {
    await this.delay();
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) {
      throw new Error('Page not found');
    }
    mockPages.splice(pageIndex, 1);
  }

  // Publish page
  static async publishPage(id: string): Promise<PageData> {
    await this.delay();
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) {
      throw new Error('Page not found');
    }

    const now = new Date().toISOString();
    const updatedPage: PageData = {
      ...mockPages[pageIndex],
      status: 'published',
      publishedAt: now,
      updatedAt: now,
    };

    mockPages[pageIndex] = updatedPage;
    return { ...updatedPage };
  }

  // Unpublish page
  static async unpublishPage(id: string): Promise<PageData> {
    await this.delay();
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) {
      throw new Error('Page not found');
    }

    const updatedPage: PageData = {
      ...mockPages[pageIndex],
      status: 'draft',
      publishedAt: null,
      updatedAt: new Date().toISOString(),
    };

    mockPages[pageIndex] = updatedPage;
    return { ...updatedPage };
  }
}