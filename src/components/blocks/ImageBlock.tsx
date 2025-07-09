import React from 'react';
import { BlockData } from '../../types';
import { Image } from 'lucide-react';

interface ImageBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  return (
    <div
      className={`
        py-8 px-6 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2 rounded-lg' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 hover:rounded-lg' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        {content.imageUrl ? (
          <img
            src={content.imageUrl}
            alt={content.alt || 'Image'}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Click to add an image</p>
          </div>
        )}
        {content.caption && (
          <p className="text-center text-gray-600 mt-4 italic">
            {content.caption}
          </p>
        )}
      </div>
    </div>
  );
};