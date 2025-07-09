import React from 'react';
import { BlockData } from '../../types';
import { Users, Zap, Globe, Clock, TrendingUp, Award, Star, Target } from 'lucide-react';

interface StatsBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const StatsBlock: React.FC<StatsBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  const getIcon = (iconName: string) => {
    const icons = {
      Users,
      Zap,
      Globe,
      Clock,
      TrendingUp,
      Award,
      Star,
      Target,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || TrendingUp;
    return <IconComponent className="w-8 h-8" />;
  };
  
  return (
    <div
      className={`
        py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {content.title || 'Our Impact in Numbers'}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-white opacity-90">
              {content.subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(content.stats || []).map((stat: any, index: number) => (
            <div
              key={index}
              className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="text-white mb-4 flex justify-center">
                {getIcon(stat.icon)}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number || '0'}
              </div>
              <div className="text-white opacity-90 font-medium">
                {stat.label || 'Statistic'}
              </div>
            </div>
          ))}
          
          {(!content.stats || content.stats.length === 0) && (
            <div className="col-span-full text-center py-12">
              <p className="text-white opacity-75 text-lg">Click to add statistics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};