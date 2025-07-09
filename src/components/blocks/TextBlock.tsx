import React from 'react';
import { BlockData } from '../../types';

interface TextBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  return (
    <div
      className={`
        py-12 px-6 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2 rounded-lg' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 hover:rounded-lg' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {content.title}
          </h2>
        )}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>{content.text || 'Add your text content here...'}</p>
        </div>
      </div>
    </div>
  );
};