import { useState, useEffect } from 'react';
import { PageData } from '../types';
import { StrapiService } from '../services/strapiService';

export const useStrapiPages = () => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPages = await StrapiService.getPages();
      setPages(fetchedPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData: Omit<PageData, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newPage = await StrapiService.createPage(pageData);
      setPages(prev => [...prev, newPage]);
      return newPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (id: string, pageData: Partial<PageData>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPage = await StrapiService.updatePage(id, pageData);
      setPages(prev => prev.map(page => page.id === id ? updatedPage : page));
      return updatedPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update page');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await StrapiService.deletePage(id);
      setPages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete page');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const publishPage = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const publishedPage = await StrapiService.publishPage(id);
      setPages(prev => prev.map(page => page.id === id ? publishedPage : page));
      return publishedPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish page');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    error,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    publishPage,
  };
};