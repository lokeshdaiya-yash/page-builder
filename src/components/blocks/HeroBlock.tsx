import React from 'react';
import { BlockData } from '../../types';

interface HeroBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  return (
    <div
      className={`
        relative min-h-[500px] bg-gradient-to-br from-blue-600 to-purple-700 
        flex items-center justify-center text-white cursor-pointer
        transition-all duration-200 hover:shadow-lg
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {content.title || 'Hero Title'}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
          {content.subtitle || 'Hero subtitle description goes here'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
            {content.primaryButtonText || 'Get Started'}
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
            {content.secondaryButtonText || 'Learn More'}
          </button>
        </div>
      </div>
    </div>
  );
};