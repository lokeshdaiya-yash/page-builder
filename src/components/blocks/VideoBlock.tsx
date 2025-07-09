import React, { useState } from 'react';
import { BlockData } from '../../types';
import { Play, Video } from 'lucide-react';

interface VideoBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsPlaying(true);
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
        <div className="text-center mb-8">
          {content.title && (
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {content.title}
            </h2>
          )}
          {content.description && (
            <p className="text-xl text-gray-600">
              {content.description}
            </p>
          )}
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          {content.videoUrl && isPlaying ? (
            <div className="aspect-video">
              <iframe
                src={content.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video bg-gray-900">
              {content.thumbnailUrl ? (
                <img
                  src={content.thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Video className="w-24 h-24 text-gray-400" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <Play className="w-12 h-12 text-gray-900 ml-1" />
                </button>
              </div>
              
              {!content.videoUrl && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-sm opacity-75">
                    Add a video URL to enable playback
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};