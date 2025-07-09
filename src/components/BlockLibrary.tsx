import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BlockComponent } from '../types';
import { 
  Layout, 
  Type, 
  Image, 
  Grid3X3, 
  Megaphone, 
  Users, 
  Star, 
  Quote, 
  Play, 
  Mail, 
  MapPin, 
  Calendar, 
  BarChart3, 
  CheckCircle, 
  MessageSquare, 
  Zap, 
  Award, 
  Clock, 
  Globe, 
  Smartphone 
} from 'lucide-react';

const blockTypes: BlockComponent[] = [
  // Layout Blocks
  {
    id: 'hero',
    name: 'Hero Section',
    icon: 'Layout',
    category: 'layout',
    defaultContent: {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing websites with our drag-and-drop page builder',
      primaryButtonText: 'Get Started',
      secondaryButtonText: 'Learn More',
      backgroundImage: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  },
  {
    id: 'cardGrid',
    name: 'Card Grid',
    icon: 'Grid3X3',
    category: 'layout',
    defaultContent: {
      title: 'Our Features',
      subtitle: 'Discover what makes us different',
      cards: [
        {
          title: 'Feature 1',
          description: 'Description for feature 1',
          image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Feature 2',
          description: 'Description for feature 2',
          image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Feature 3',
          description: 'Description for feature 3',
          image: 'https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
  },
  {
    id: 'cta',
    name: 'Call to Action',
    icon: 'Megaphone',
    category: 'layout',
    defaultContent: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of users who are already using our platform.',
      buttonText: 'Get Started Now',
      backgroundColor: 'gradient',
    },
  },
  {
    id: 'twoColumn',
    name: 'Two Column Layout',
    icon: 'Layout',
    category: 'layout',
    defaultContent: {
      leftTitle: 'Left Column Title',
      leftContent: 'Content for the left column goes here. You can add text, images, or other elements.',
      rightTitle: 'Right Column Title',
      rightContent: 'Content for the right column goes here. Perfect for comparisons or side-by-side content.',
      imageLeft: '',
      imageRight: '',
    },
  },

  // Content Blocks
  {
    id: 'text',
    name: 'Text Block',
    icon: 'Type',
    category: 'content',
    defaultContent: {
      title: 'Section Title',
      text: 'Add your content here. This is a text block where you can add any content you want.',
    },
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    icon: 'Quote',
    category: 'content',
    defaultContent: {
      quote: 'This product has completely transformed how we work. The results speak for themselves.',
      author: 'John Smith',
      position: 'CEO, Company Name',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    icon: 'MessageSquare',
    category: 'content',
    defaultContent: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our service',
      faqs: [
        {
          question: 'How does this work?',
          answer: 'Our platform uses advanced technology to provide seamless integration and user-friendly experience.',
        },
        {
          question: 'What are the pricing options?',
          answer: 'We offer flexible pricing plans to suit businesses of all sizes. Contact us for a custom quote.',
        },
        {
          question: 'Is there customer support?',
          answer: 'Yes, we provide 24/7 customer support through multiple channels including chat, email, and phone.',
        },
      ],
    },
  },
  {
    id: 'pricing',
    name: 'Pricing Table',
    icon: 'BarChart3',
    category: 'content',
    defaultContent: {
      title: 'Choose Your Plan',
      subtitle: 'Select the perfect plan for your needs',
      plans: [
        {
          name: 'Basic',
          price: '$9',
          period: 'month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          popular: false,
        },
        {
          name: 'Pro',
          price: '$29',
          period: 'month',
          features: ['Everything in Basic', 'Feature 4', 'Feature 5', 'Priority Support'],
          popular: true,
        },
        {
          name: 'Enterprise',
          price: '$99',
          period: 'month',
          features: ['Everything in Pro', 'Custom Integration', 'Dedicated Manager', 'SLA'],
          popular: false,
        },
      ],
    },
  },
  {
    id: 'team',
    name: 'Team Section',
    icon: 'Users',
    category: 'content',
    defaultContent: {
      title: 'Meet Our Team',
      subtitle: 'The talented people behind our success',
      members: [
        {
          name: 'Sarah Johnson',
          position: 'CEO & Founder',
          bio: 'Passionate about creating innovative solutions that make a difference.',
          image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
          social: { linkedin: '#', twitter: '#' },
        },
        {
          name: 'Mike Chen',
          position: 'CTO',
          bio: 'Technology enthusiast with 15+ years of experience in software development.',
          image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
          social: { linkedin: '#', github: '#' },
        },
        {
          name: 'Emily Davis',
          position: 'Head of Design',
          bio: 'Creative designer focused on user experience and beautiful interfaces.',
          image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
          social: { linkedin: '#', dribbble: '#' },
        },
      ],
    },
  },
  {
    id: 'stats',
    name: 'Statistics',
    icon: 'BarChart3',
    category: 'content',
    defaultContent: {
      title: 'Our Impact in Numbers',
      subtitle: 'See how we\'re making a difference',
      stats: [
        { number: '10,000+', label: 'Happy Customers', icon: 'Users' },
        { number: '99.9%', label: 'Uptime', icon: 'Zap' },
        { number: '50+', label: 'Countries', icon: 'Globe' },
        { number: '24/7', label: 'Support', icon: 'Clock' },
      ],
    },
  },

  // Media Blocks
  {
    id: 'image',
    name: 'Image Block',
    icon: 'Image',
    category: 'media',
    defaultContent: {
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Image description',
      caption: 'Image caption goes here',
    },
  },
  {
    id: 'video',
    name: 'Video Block',
    icon: 'Play',
    category: 'media',
    defaultContent: {
      videoUrl: '',
      thumbnailUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Watch Our Video',
      description: 'Learn more about our product in this short video.',
    },
  },
  {
    id: 'gallery',
    name: 'Image Gallery',
    icon: 'Image',
    category: 'media',
    defaultContent: {
      title: 'Gallery',
      subtitle: 'Browse through our collection',
      images: [
        {
          url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          alt: 'Gallery image 1',
          caption: 'Image 1',
        },
        {
          url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
          alt: 'Gallery image 2',
          caption: 'Image 2',
        },
        {
          url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
          alt: 'Gallery image 3',
          caption: 'Image 3',
        },
        {
          url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          alt: 'Gallery image 4',
          caption: 'Image 4',
        },
      ],
    },
  },

  // Interactive Blocks
  {
    id: 'contact',
    name: 'Contact Form',
    icon: 'Mail',
    category: 'interactive',
    defaultContent: {
      title: 'Get in Touch',
      subtitle: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'subject', label: 'Subject', type: 'text', required: false },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
      ],
      buttonText: 'Send Message',
    },
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    icon: 'Mail',
    category: 'interactive',
    defaultContent: {
      title: 'Stay Updated',
      subtitle: 'Subscribe to our newsletter for the latest updates and exclusive content.',
      placeholder: 'Enter your email address',
      buttonText: 'Subscribe',
      privacyText: 'We respect your privacy. Unsubscribe at any time.',
    },
  },
  {
    id: 'map',
    name: 'Location Map',
    icon: 'MapPin',
    category: 'interactive',
    defaultContent: {
      title: 'Find Us',
      address: '123 Business Street, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'contact@company.com',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuMyJX!5e0!3m2!1sen!2sus!4v1234567890',
    },
  },
];

const getIcon = (iconName: string) => {
  const icons = {
    Layout,
    Type,
    Image,
    Grid3X3,
    Megaphone,
    Users,
    Star,
    Quote,
    Play,
    Mail,
    MapPin,
    Calendar,
    BarChart3,
    CheckCircle,
    MessageSquare,
    Zap,
    Award,
    Clock,
    Globe,
    Smartphone,
  };
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
};

interface BlockLibraryProps {
  onAddBlock: (blockType: BlockComponent) => void;
}

export const BlockLibrary: React.FC<BlockLibraryProps> = ({ onAddBlock }) => {
  const categories = ['layout', 'content', 'media', 'interactive'] as const;

  const getCategoryTitle = (category: string) => {
    const titles = {
      layout: 'Layout',
      content: 'Content',
      media: 'Media',
      interactive: 'Interactive',
    };
    return titles[category as keyof typeof titles] || category;
  };

  return (
    <div className="bg-white border-r border-gray-200 w-80 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Block Library</h2>
        <p className="text-sm text-gray-600 mt-1">Drag blocks to build your page</p>
      </div>

      <div className="p-4">
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">
              {getCategoryTitle(category)}
            </h3>
            <Droppable droppableId={`library-${category}`} type="LIBRARY_BLOCK" isDropDisabled>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {blockTypes
                    .filter((block) => block.category === category)
                    .map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={`library-${block.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 
                              hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 
                              text-left group cursor-grab active:cursor-grabbing
                              ${snapshot.isDragging ? 'shadow-lg bg-blue-50 border-blue-300 rotate-2' : ''}
                            `}
                            onClick={() => onAddBlock(block)}
                          >
                            <div className="text-gray-500 group-hover:text-blue-600">
                              {getIcon(block.icon)}
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                              {block.name}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
};

export { blockTypes };