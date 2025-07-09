import React from 'react';
import { BlockData } from '../../types';

interface TwoColumnBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const TwoColumnBlock: React.FC<TwoColumnBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  return (
    <div
      className={`
        py-16 px-6 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {content.leftTitle && (
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {content.leftTitle}
              </h2>
            )}
            {content.imageLeft && (
              <img
                src={content.imageLeft}
                alt={content.leftTitle || 'Left column image'}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="prose prose-lg text-gray-700">
              <p>{content.leftContent || 'Left column content goes here...'}</p>
            </div>
          </div>
          
          <div>
            {content.rightTitle && (
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {content.rightTitle}
              </h2>
            )}
            {content.imageRight && (
              <img
                src={content.imageRight}
                alt={content.rightTitle || 'Right column image'}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="prose prose-lg text-gray-700">
              <p>{content.rightContent || 'Right column content goes here...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};