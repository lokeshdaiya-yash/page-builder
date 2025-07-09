import React from 'react';
import { BlockData } from '../../types';
import { Linkedin, Twitter, Github, Globe } from 'lucide-react';

interface TeamBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
  const getSocialIcon = (platform: string) => {
    const icons = {
      linkedin: Linkedin,
      twitter: Twitter,
      github: Github,
      dribbble: Globe,
    };
    const IconComponent = icons[platform as keyof typeof icons] || Globe;
    return <IconComponent className="w-5 h-5" />;
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {content.title || 'Meet Our Team'}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600">
              {content.subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(content.members || []).map((member: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name || 'Team member'}
                  className="w-full h-64 object-cover"
                />
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name || 'Team Member'}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position || 'Position'}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio || 'Bio goes here...'}
                </p>
                
                {member.social && (
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {(!content.members || content.members.length === 0) && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Click to add team members</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};