import React from 'react';
import { BlockData } from '../../types';

interface CardGridBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  const cards = content.cards || [];
  
  return (
    <div
      className={`
        py-16 px-6 bg-gray-50 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        {content.title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.length > 0 ? cards.map((card: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {card.title || 'Card Title'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description || 'Card description goes here...'}
                </p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Click to add cards</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};