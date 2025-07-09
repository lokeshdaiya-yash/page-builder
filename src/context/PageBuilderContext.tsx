import React, { createContext, useContext, useState, useCallback } from 'react';
import { BlockData, PageData } from '../types';

interface PageBuilderContextType {
  pages: PageData[];
  setPages: (pages: PageData[]) => void;
  currentPage: PageData;
  setCurrentPage: (page: PageData) => void;
  createNewPage: () => void;
  deletePage: (pageId: string) => void;
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  mode: 'edit' | 'preview';
  setMode: (mode: 'edit' | 'preview') => void;
  addBlock: (block: BlockData, index?: number) => void;
  updateBlock: (id: string, updates: Partial<BlockData>) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  duplicateBlock: (id: string) => void;
}

const PageBuilderContext = createContext<PageBuilderContextType | undefined>(undefined);

export const usePageBuilder = () => {
  const context = useContext(PageBuilderContext);
  if (!context) {
    throw new Error('usePageBuilder must be used within a PageBuilderProvider');
  }
  return context;
};

const createDefaultPage = (title: string = 'Untitled Page'): PageData => ({
  id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  title,
  slug: title.toLowerCase().replace(/\s+/g, '-'),
  blocks: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'draft',
});

export const PageBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<PageData[]>([createDefaultPage('Home Page')]);
  const [currentPage, setCurrentPage] = useState<PageData>(pages[0]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const createNewPage = useCallback(() => {
    const newPage = createDefaultPage();
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPage);
    setSelectedBlockId(null);
  }, []);

  const deletePage = useCallback((pageId: string) => {
    setPages(prev => {
      const filteredPages = prev.filter(page => page.id !== pageId);
      if (filteredPages.length === 0) {
        // Always keep at least one page
        const defaultPage = createDefaultPage('Home Page');
        setCurrentPage(defaultPage);
        return [defaultPage];
      }
      
      // If we're deleting the current page, switch to the first available page
      if (currentPage.id === pageId) {
        setCurrentPage(filteredPages[0]);
      }
      
      return filteredPages;
    });
    setSelectedBlockId(null);
  }, [currentPage.id]);

  // Update the current page in the pages array when it changes
  const updateCurrentPage = useCallback((updatedPage: PageData) => {
    setCurrentPage(updatedPage);
    setPages(prev => prev.map(page => 
      page.id === updatedPage.id ? updatedPage : page
    ));
  }, []);

  const addBlock = useCallback((block: BlockData, index?: number) => {
    const updatedPage = {
      ...currentPage,
      blocks: (() => {
        const newBlocks = [...currentPage.blocks];
        const blockWithOrder = { ...block, order: index ?? newBlocks.length };
        
        if (index !== undefined) {
          newBlocks.splice(index, 0, blockWithOrder);
        } else {
          newBlocks.push(blockWithOrder);
        }
        
        // Update order for all blocks
        newBlocks.forEach((b, i) => {
          b.order = i;
        });
        
        return newBlocks;
      })(),
      updatedAt: new Date().toISOString(),
    };
    
    updateCurrentPage(updatedPage);
  }, [currentPage, updateCurrentPage]);

  const updateBlock = useCallback((id: string, updates: Partial<BlockData>) => {
    const updatedPage = {
      ...currentPage,
      blocks: currentPage.blocks.map(block =>
        block.id === id ? { ...block, ...updates } : block
      ),
      updatedAt: new Date().toISOString(),
    };
    
    updateCurrentPage(updatedPage);
  }, [currentPage, updateCurrentPage]);

  const deleteBlock = useCallback((id: string) => {
    const updatedPage = {
      ...currentPage,
      blocks: (() => {
        const newBlocks = currentPage.blocks.filter(block => block.id !== id);
        // Update order for remaining blocks
        newBlocks.forEach((block, index) => {
          block.order = index;
        });
        return newBlocks;
      })(),
      updatedAt: new Date().toISOString(),
    };
    
    updateCurrentPage(updatedPage);
    
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [currentPage, selectedBlockId, updateCurrentPage]);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    const updatedPage = {
      ...currentPage,
      blocks: (() => {
        const newBlocks = [...currentPage.blocks];
        const [movedBlock] = newBlocks.splice(fromIndex, 1);
        newBlocks.splice(toIndex, 0, movedBlock);
        
        // Update order for all blocks
        newBlocks.forEach((block, index) => {
          block.order = index;
        });
        
        return newBlocks;
      })(),
      updatedAt: new Date().toISOString(),
    };
    
    updateCurrentPage(updatedPage);
  }, [currentPage, updateCurrentPage]);

  const duplicateBlock = useCallback((id: string) => {
    const blockToDuplicate = currentPage.blocks.find(block => block.id === id);
    if (!blockToDuplicate) return;

    const duplicatedBlock: BlockData = {
      ...blockToDuplicate,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const blockIndex = currentPage.blocks.findIndex(block => block.id === id);
    const updatedPage = {
      ...currentPage,
      blocks: (() => {
        const newBlocks = [...currentPage.blocks];
        newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
        
        // Update order for all blocks
        newBlocks.forEach((block, index) => {
          block.order = index;
        });

        return newBlocks;
      })(),
      updatedAt: new Date().toISOString(),
    };
    
    updateCurrentPage(updatedPage);
  }, [currentPage, updateCurrentPage]);

  // Override setCurrentPage to also update pages array
  const setCurrentPageWithUpdate = useCallback((page: PageData) => {
    setCurrentPage(page);
    setPages(prev => {
      const existingPageIndex = prev.findIndex(p => p.id === page.id);
      if (existingPageIndex >= 0) {
        const newPages = [...prev];
        newPages[existingPageIndex] = page;
        return newPages;
      } else {
        return [...prev, page];
      }
    });
  }, []);

  const value = {
    pages,
    setPages,
    currentPage,
    setCurrentPage: setCurrentPageWithUpdate,
    createNewPage,
    deletePage,
    selectedBlockId,
    setSelectedBlockId,
    mode,
    setMode,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    duplicateBlock,
  };

  return (
    <PageBuilderContext.Provider value={value}>
      {children}
    </PageBuilderContext.Provider>
  );
};