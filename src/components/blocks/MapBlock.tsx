import React from 'react';
import { BlockData } from '../../types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface MapBlockProps {
  data: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const MapBlock: React.FC<MapBlockProps> = ({ 
  data, 
  isSelected = false, 
  isEditing = false, 
  onClick 
}) => {
  const { content } = data;
  
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
            {content.title || 'Find Us'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="relative">
            {content.mapUrl ? (
              <iframe
                src={content.mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Add map URL to display location</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {content.address && (
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Address</p>
                      <p className="text-gray-600 leading-relaxed">
                        {content.address}
                      </p>
                    </div>
                  </div>
                )}
                
                {content.phone && (
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{content.phone}</p>
                    </div>
                  </div>
                )}
                
                {content.email && (
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{content.email}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Business Hours</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};