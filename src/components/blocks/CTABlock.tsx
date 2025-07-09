import React from 'react';
import { BlockData } from '../../types';

interface CTABlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const CTABlock: React.FC<CTABlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  return (
    <div
      className={`
        py-20 bg-gradient-to-r from-green-500 to-blue-600 cursor-pointer
        transition-all duration-200 hover:shadow-lg
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {content.title || 'Ready to Get Started?'}
        </h2>
        <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
          {content.subtitle || 'Join thousands of users who are already using our platform.'}
        </p>
        <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-lg">
          {content.buttonText || 'Get Started Now'}
        </button>
      </div>
    </div>
  );
};