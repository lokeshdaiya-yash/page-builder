import React, { useState } from 'react';
import { useStrapiPages } from '../hooks/useStrapiPages';
import { usePageBuilder } from '../context/PageBuilderContext';
import { PageData } from '../types';
import { FileText, Plus, Edit, Trash2, Globe, Eye, Calendar, Loader2 } from 'lucide-react';

interface PageManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PageManager: React.FC<PageManagerProps> = ({ isOpen, onClose }) => {
  const { pages: strapiPages, loading, error, deletePage: deleteStrapiPage, publishPage } = useStrapiPages();
  const { pages: localPages, setCurrentPage, createNewPage, deletePage: deleteLocalPage } = usePageBuilder();
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [activeTab, setActiveTab] = useState<'local' | 'strapi'>('local');

  const handleLoadPage = (page: PageData) => {
    setCurrentPage(page);
    onClose();
  };

  const handleDeleteStrapiPage = async (pageId: string) => {
    if (window.confirm('Are you sure you want to delete this page from Strapi?')) {
      try {
        await deleteStrapiPage(pageId);
      } catch (error) {
        alert('Failed to delete page from Strapi');
      }
    }
  };

  const handleDeleteLocalPage = (pageId: string) => {
    if (localPages.length <= 1) {
      alert('Cannot delete the last page');
      return;
    }
    if (window.confirm('Are you sure you want to delete this local page?')) {
      deleteLocalPage(pageId);
    }
  };

  const handlePublishPage = async (pageId: string) => {
    try {
      await publishPage(pageId);
    } catch (error) {
      alert('Failed to publish page');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Page Manager</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={createNewPage}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                New Page
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('local')}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200
                ${activeTab === 'local' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              Local Pages ({localPages.length})
            </button>
            <button
              onClick={() => setActiveTab('strapi')}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200
                ${activeTab === 'strapi' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              Strapi Pages ({strapiPages.length})
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Local Pages Tab */}
          {activeTab === 'local' && (
            <div>
              {localPages.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No local pages</h3>
                  <p className="text-gray-600 mb-4">Create your first page to get started.</p>
                  <button
                    onClick={createNewPage}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Create First Page
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {localPages.map((page) => (
                    <div
                      key={page.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{page.title}</h3>
                            <span className={`
                              px-2 py-1 text-xs font-medium rounded-full
                              ${page.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                              }
                            `}>
                              {page.status || 'local'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Updated: {formatDate(page.updatedAt)}
                            </div>
                            <div>
                              {page.blocks.length} block{page.blocks.length !== 1 ? 's' : ''}
                            </div>
                            {page.slug && (
                              <div>
                                Slug: /{page.slug}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLoadPage(page)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200"
                            title="Load page"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          {localPages.length > 1 && (
                            <button
                              onClick={() => handleDeleteLocalPage(page.id)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                              title="Delete page"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Strapi Pages Tab */}
          {activeTab === 'strapi' && (
            <div>
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading pages...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600">Error: {error}</p>
                </div>
              )}

              {!loading && !error && strapiPages.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Strapi pages found</h3>
                  <p className="text-gray-600">Save a local page to create it in Strapi.</p>
                </div>
              )}

              {!loading && !error && strapiPages.length > 0 && (
                <div className="grid gap-4">
                  {strapiPages.map((page) => (
                    <div
                      key={page.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{page.title}</h3>
                            <span className={`
                              px-2 py-1 text-xs font-medium rounded-full
                              ${page.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                              }
                            `}>
                              {page.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Updated: {formatDate(page.updatedAt)}
                            </div>
                            <div>
                              {page.blocks.length} block{page.blocks.length !== 1 ? 's' : ''}
                            </div>
                            {page.slug && (
                              <div>
                                Slug: /{page.slug}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLoadPage(page)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200"
                            title="Load page"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          {page.status === 'draft' && (
                            <button
                              onClick={() => handlePublishPage(page.id)}
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-all duration-200"
                              title="Publish page"
                            >
                              <Globe className="w-4 h-4" />
                              Publish
                            </button>
                          )}

                          {page.publishedAt && (
                            <button
                              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                              title="View published page"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteStrapiPage(page.id)}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                            title="Delete page"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};