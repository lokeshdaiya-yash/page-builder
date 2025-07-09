import { MockStrapiService } from './mockStrapiService';

// For development, we'll use the mock service to avoid network errors
// In production, you would uncomment the real Strapi implementation below

export const StrapiService = MockStrapiService;

/* 
// Real Strapi implementation - uncomment when you have a Strapi backend running
import axios from 'axios';
import { PageData, StrapiResponse, StrapiPage } from '../types';

// Configure your Strapi API URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

export class StrapiService {
  // Get all pages
  static async getPages(): Promise<PageData[]> {
    try {
      const response = await strapiApi.get<StrapiResponse<StrapiPage[]>>('/pages');
      return response.data.data.map(this.transformStrapiPage);
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  // Get single page by ID
  static async getPage(id: string): Promise<PageData> {
    try {
      const response = await strapiApi.get<StrapiResponse<StrapiPage>>(`/pages/${id}`);
      return this.transformStrapiPage(response.data.data);
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  // Get page by slug
  static async getPageBySlug(slug: string): Promise<PageData> {
    try {
      const response = await strapiApi.get<StrapiResponse<StrapiPage[]>>(`/pages?filters[slug][$eq]=${slug}`);
      if (response.data.data.length === 0) {
        throw new Error('Page not found');
      }
      return this.transformStrapiPage(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      throw error;
    }
  }

  // Create new page
  static async createPage(pageData: Omit<PageData, 'id' | 'createdAt' | 'updatedAt'>): Promise<PageData> {
    try {
      const response = await strapiApi.post<StrapiResponse<StrapiPage>>('/pages', {
        data: {
          title: pageData.title,
          slug: pageData.slug || pageData.title.toLowerCase().replace(/\s+/g, '-'),
          blocks: pageData.blocks,
          status: pageData.status || 'draft',
        },
      });
      return this.transformStrapiPage(response.data.data);
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  }

  // Update existing page
  static async updatePage(id: string, pageData: Partial<PageData>): Promise<PageData> {
    try {
      const response = await strapiApi.put<StrapiResponse<StrapiPage>>(`/pages/${id}`, {
        data: {
          title: pageData.title,
          slug: pageData.slug,
          blocks: pageData.blocks,
          status: pageData.status,
        },
      });
      return this.transformStrapiPage(response.data.data);
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  }

  // Delete page
  static async deletePage(id: string): Promise<void> {
    try {
      await strapiApi.delete(`/pages/${id}`);
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }

  // Publish page
  static async publishPage(id: string): Promise<PageData> {
    try {
      const response = await strapiApi.put<StrapiResponse<StrapiPage>>(`/pages/${id}`, {
        data: {
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
      });
      return this.transformStrapiPage(response.data.data);
    } catch (error) {
      console.error('Error publishing page:', error);
      throw error;
    }
  }

  // Unpublish page
  static async unpublishPage(id: string): Promise<PageData> {
    try {
      const response = await strapiApi.put<StrapiResponse<StrapiPage>>(`/pages/${id}`, {
        data: {
          status: 'draft',
          publishedAt: null,
        },
      });
      return this.transformStrapiPage(response.data.data);
    } catch (error) {
      console.error('Error unpublishing page:', error);
      throw error;
    }
  }

  // Transform Strapi page format to our PageData format
  private static transformStrapiPage(strapiPage: StrapiPage): PageData {
    return {
      id: strapiPage.id.toString(),
      title: strapiPage.attributes.title,
      slug: strapiPage.attributes.slug,
      blocks: strapiPage.attributes.blocks || [],
      createdAt: strapiPage.attributes.createdAt,
      updatedAt: strapiPage.attributes.updatedAt,
      publishedAt: strapiPage.attributes.publishedAt,
      status: strapiPage.attributes.status,
    };
  }
}
*/