import React, { useState } from 'react';
import { BlockData } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    if (!isEditing) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };
  
  return (
    <div
      className={`
        py-16 px-6 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {content.title || 'Frequently Asked Questions'}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600">
              {content.subtitle}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          {(content.faqs || []).map((faq: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFAQ(index);
                }}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question || `Question ${index + 1}`}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer || 'Answer goes here...'}
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {(!content.faqs || content.faqs.length === 0) && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">Click to add FAQ items</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};