import React from 'react';
import { BlockData } from '../../types';
import { Check, Star } from 'lucide-react';

interface PricingBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const PricingBlock: React.FC<PricingBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {content.title || 'Choose Your Plan'}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600">
              {content.subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(content.plans || []).map((plan: any, index: number) => (
            <div
              key={index}
              className={`
                relative bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl
                ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name || 'Plan Name'}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price || '$0'}
                  </span>
                  <span className="text-gray-600">
                    /{plan.period || 'month'}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {(plan.features || []).map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
                  ${plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }
                `}
              >
                Get Started
              </button>
            </div>
          ))}
          
          {(!content.plans || content.plans.length === 0) && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Click to add pricing plans</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};