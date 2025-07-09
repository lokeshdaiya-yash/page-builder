import React from 'react';
import { BlockData } from '../types';
import { 
  HeroBlock, 
  TextBlock, 
  ImageBlock, 
  CardGridBlock, 
  CTABlock,
  TwoColumnBlock,
  TestimonialBlock,
  FAQBlock,
  PricingBlock,
  TeamBlock,
  StatsBlock,
  VideoBlock,
  GalleryBlock,
  ContactBlock,
  NewsletterBlock,
  MapBlock
} from './blocks';

interface BlockRendererProps {
  block: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
}) => {
  const blockProps = {
    data: block,
    isSelected,
    isEditing,
    onClick,
  };

  switch (block.type) {
    case 'hero':
      return <HeroBlock {...blockProps} />;
    case 'text':
      return <TextBlock {...blockProps} />;
    case 'image':
      return <ImageBlock {...blockProps} />;
    case 'cardGrid':
      return <CardGridBlock {...blockProps} />;
    case 'cta':
      return <CTABlock {...blockProps} />;
    case 'twoColumn':
      return <TwoColumnBlock {...blockProps} />;
    case 'testimonial':
      return <TestimonialBlock {...blockProps} />;
    case 'faq':
      return <FAQBlock {...blockProps} />;
    case 'pricing':
      return <PricingBlock {...blockProps} />;
    case 'team':
      return <TeamBlock {...blockProps} />;
    case 'stats':
      return <StatsBlock {...blockProps} />;
    case 'video':
      return <VideoBlock {...blockProps} />;
    case 'gallery':
      return <GalleryBlock {...blockProps} />;
    case 'contact':
      return <ContactBlock {...blockProps} />;
    case 'newsletter':
      return <NewsletterBlock {...blockProps} />;
    case 'map':
      return <MapBlock {...blockProps} />;
    default:
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Unknown block type: {block.type}</p>
        </div>
      );
  }
};