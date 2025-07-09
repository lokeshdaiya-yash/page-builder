import React, { useState } from 'react';
import { BlockData } from '../../types';
import { Mail, Send } from 'lucide-react';

interface NewsletterBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const NewsletterBlock: React.FC<NewsletterBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEditing && email) {
      console.log('Newsletter signup:', email);
      setEmail('');
      // Handle newsletter signup here
    }
  };
  
  return (
    <div
      className={`
        py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
        ${isEditing ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto text-center">
        <Mail className="w-16 h-16 text-white mx-auto mb-6" />
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {content.title || 'Stay Updated'}
        </h2>
        
        <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
          {content.subtitle || 'Subscribe to our newsletter for the latest updates and exclusive content.'}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.placeholder || 'Enter your email address'}
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={(e) => e.stopPropagation()}
              required
            />
            <button
              type="submit"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Send className="w-5 h-5 mr-2" />
              {content.buttonText || 'Subscribe'}
            </button>
          </div>
        </form>
        
        {content.privacyText && (
          <p className="text-white opacity-75 text-sm mt-4">
            {content.privacyText}
          </p>
        )}
      </div>
    </div>
  );
};