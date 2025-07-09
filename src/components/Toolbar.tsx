import React, { useState } from 'react';
import { usePageBuilder } from '../context/PageBuilderContext';
import { useStrapiPages } from '../hooks/useStrapiPages';
import { Eye, Edit3, Download, Upload, Save, Globe, FileText, Plus, Loader2, ChevronDown } from 'lucide-react';

export const Toolbar: React.FC = () => {
  const { 
    mode, 
    setMode, 
    currentPage, 
    setCurrentPage, 
    pages, 
    createNewPage, 
    deletePage 
  } = usePageBuilder();
  const { updatePage, createPage, publishPage, loading } = useStrapiPages();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      if (currentPage.id === 'default') {
        // Create new page
        const newPage = await createPage({
          title: currentPage.title,
          slug: currentPage.title.toLowerCase().replace(/\s+/g, '-'),
          blocks: currentPage.blocks,
          status: 'draft',
        });
        setCurrentPage(newPage);
      } else {
        // Update existing page
        await updatePage(currentPage.id, {
          title: currentPage.title,
          blocks: currentPage.blocks,
        });
      }
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handlePublish = async () => {
    if (currentPage.id === 'default') {
      await handleSave();
    }
    
    try {
      await publishPage(currentPage.id);
      const updatedPage = { ...currentPage, status: 'published' as const, publishedAt: new Date().toISOString() };
      setCurrentPage(updatedPage);
    } catch (error) {
      console.error('Failed to publish page:', error);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(currentPage, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${currentPage.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPage = JSON.parse(e.target?.result as string);
          setCurrentPage(importedPage);
        } catch (error) {
          alert('Error importing page data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePageSwitch = (page: any) => {
    setCurrentPage(page);
    setShowPageDropdown(false);
  };

  const handleDeletePage = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pages.length <= 1) {
      alert('Cannot delete the last page');
      return;
    }
    if (window.confirm('Are you sure you want to delete this page?')) {
      deletePage(pageId);
    }
  };

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        );
      case 'saved':
        return (
          <>
            <Save className="w-4 h-4" />
            Saved!
          </>
        );
      case 'error':
        return (
          <>
            <Save className="w-4 h-4" />
            Error
          </>
        );
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            Save
          </>
        );
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Page Builder</h1>
          <div className="h-6 w-px bg-gray-300"></div>
          
          {/* Page Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              <span className="max-w-32 truncate">{currentPage.title}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showPageDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showPageDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button
                    onClick={() => {
                      createNewPage();
                      setShowPageDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Page
                  </button>
                </div>
                
                <div className="border-t border-gray-100 max-h-64 overflow-y-auto">
                  {pages.map((page) => (
                    <div
                      key={page.id}
                      className={`
                        flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer
                        ${currentPage.id === page.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                      `}
                      onClick={() => handlePageSwitch(page)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{page.title}</div>
                        <div className="text-xs text-gray-500">
                          {page.blocks.length} block{page.blocks.length !== 1 ? 's' : ''}
                          {page.status && (
                            <span className={`
                              ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium
                              ${page.status === 'published' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                              }
                            `}>
                              {page.status}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {pages.length > 1 && (
                        <button
                          onClick={(e) => handleDeletePage(page.id, e)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                          title="Delete page"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Page Title Editor */}
          <input
            type="text"
            value={currentPage.title}
            onChange={(e) => setCurrentPage({ ...currentPage, title: e.target.value })}
            className="text-sm font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-1 hover:bg-gray-50 rounded min-w-0"
            placeholder="Page title..."
          />
          
          {currentPage.status && (
            <span className={`
              px-2 py-1 text-xs font-medium rounded-full
              ${currentPage.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }
            `}>
              {currentPage.status}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('edit')}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${mode === 'edit' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${mode === 'preview' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <button
            onClick={handleSave}
            disabled={loading || saveStatus === 'saving'}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${saveStatus === 'saved' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : saveStatus === 'error'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {getSaveButtonContent()}
          </button>

          <button
            onClick={handlePublish}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Globe className="w-4 h-4" />
            {currentPage.status === 'published' ? 'Update' : 'Publish'}
          </button>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
            title="Export page"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <label className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer">
            <Upload className="w-4 h-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};