import React from 'react';
import { BlockData } from '../../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <div
      className={`
        py-16 px-6 bg-gray-50 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
        
        <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
          "{content.quote || 'Add your testimonial quote here...'}"
        </blockquote>
        
        {content.rating && (
          <div className="flex justify-center mb-6">
            {renderStars(content.rating)}
          </div>
        )}
        
        <div className="flex items-center justify-center">
          {content.avatar && (
            <img
              src={content.avatar}
              alt={content.author || 'Testimonial author'}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
          )}
          <div className="text-left">
            <div className="font-semibold text-gray-900">
              {content.author || 'Author Name'}
            </div>
            <div className="text-gray-600">
              {content.position || 'Position, Company'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};