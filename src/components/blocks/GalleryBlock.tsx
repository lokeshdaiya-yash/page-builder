import React, { useState } from 'react';
import { BlockData } from '../../types';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setSelectedImage(index);
    }
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null || !content.images) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + content.images.length) % content.images.length
      : (selectedImage + 1) % content.images.length;
    
    setSelectedImage(newIndex);
  };
  
  return (
    <>
      <div
        className={`
          py-16 px-6 cursor-pointer transition-all duration-200
          ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
        `}
        onClick={onClick}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {content.title || 'Gallery'}
            </h2>
            {content.subtitle && (
              <p className="text-xl text-gray-600">
                {content.subtitle}
              </p>
            )}
          </div>
          
          {content.images && content.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {content.images.map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white rounded-full p-2">
                        <Image className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white text-sm font-medium">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Click to add gallery images</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage !== null && content.images && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={content.images[selectedImage].url}
              alt={content.images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {content.images[selectedImage].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg">
                  {content.images[selectedImage].caption}
                </p>
              </div>
            )}
            
            {content.images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};