import React from 'react';
import { usePageBuilder } from '../context/PageBuilderContext';
import { X, Trash2, Plus, Star } from 'lucide-react';

export const PropertyPanel: React.FC = () => {
  const { selectedBlockId, currentPage, updateBlock, deleteBlock, setSelectedBlockId } = usePageBuilder();

  if (!selectedBlockId) {
    return (
      <div className="bg-white border-l border-gray-200 w-80 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">No block selected</p>
          <p className="text-sm mt-1">Click on a block to edit its properties</p>
        </div>
      </div>
    );
  }

  const selectedBlock = currentPage.blocks.find(block => block.id === selectedBlockId);
  if (!selectedBlock) return null;

  const handleContentUpdate = (field: string, value: any) => {
    updateBlock(selectedBlockId, {
      content: {
        ...selectedBlock.content,
        [field]: value,
      },
    });
  };

  const handleArrayUpdate = (field: string, index: number, itemField: string, value: any) => {
    const array = [...(selectedBlock.content[field] || [])];
    array[index] = {
      ...array[index],
      [itemField]: value,
    };
    handleContentUpdate(field, array);
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    const array = [...(selectedBlock.content[field] || [])];
    array.push(defaultItem);
    handleContentUpdate(field, array);
  };

  const removeArrayItem = (field: string, index: number) => {
    const array = [...(selectedBlock.content[field] || [])];
    array.splice(index, 1);
    handleContentUpdate(field, array);
  };

  const renderFieldEditor = () => {
    switch (selectedBlock.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button</label>
              <input
                type="text"
                value={selectedBlock.content.primaryButtonText || ''}
                onChange={(e) => handleContentUpdate('primaryButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button</label>
              <input
                type="text"
                value={selectedBlock.content.secondaryButtonText || ''}
                onChange={(e) => handleContentUpdate('secondaryButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <input
                type="text"
                value={selectedBlock.content.backgroundImage || ''}
                onChange={(e) => handleContentUpdate('backgroundImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
              <textarea
                value={selectedBlock.content.text || ''}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={selectedBlock.content.imageUrl || ''}
                onChange={(e) => handleContentUpdate('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={selectedBlock.content.alt || ''}
                onChange={(e) => handleContentUpdate('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
              <input
                type="text"
                value={selectedBlock.content.caption || ''}
                onChange={(e) => handleContentUpdate('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'cardGrid':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Cards</label>
                <button
                  onClick={() => addArrayItem('cards', { title: 'New Card', description: 'Card description', image: '' })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Card
                </button>
              </div>
              <div className="space-y-3">
                {(selectedBlock.content.cards || []).map((card: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Card {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('cards', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card title"
                        value={card.title || ''}
                        onChange={(e) => handleArrayUpdate('cards', index, 'title', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Card description"
                        value={card.description || ''}
                        onChange={(e) => handleArrayUpdate('cards', index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={card.image || ''}
                        onChange={(e) => handleArrayUpdate('cards', index, 'image', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedBlock.content.buttonText || ''}
                onChange={(e) => handleContentUpdate('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Style</label>
              <select
                value={selectedBlock.content.backgroundColor || 'gradient'}
                onChange={(e) => handleContentUpdate('backgroundColor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gradient">Gradient</option>
                <option value="solid">Solid Color</option>
                <option value="image">Background Image</option>
              </select>
            </div>
          </div>
        );

      case 'twoColumn':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Column Title</label>
              <input
                type="text"
                value={selectedBlock.content.leftTitle || ''}
                onChange={(e) => handleContentUpdate('leftTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Column Content</label>
              <textarea
                value={selectedBlock.content.leftContent || ''}
                onChange={(e) => handleContentUpdate('leftContent', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Image URL</label>
              <input
                type="text"
                value={selectedBlock.content.imageLeft || ''}
                onChange={(e) => handleContentUpdate('imageLeft', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Column Title</label>
              <input
                type="text"
                value={selectedBlock.content.rightTitle || ''}
                onChange={(e) => handleContentUpdate('rightTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Column Content</label>
              <textarea
                value={selectedBlock.content.rightContent || ''}
                onChange={(e) => handleContentUpdate('rightContent', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Image URL</label>
              <input
                type="text"
                value={selectedBlock.content.imageRight || ''}
                onChange={(e) => handleContentUpdate('imageRight', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <textarea
                value={selectedBlock.content.quote || ''}
                onChange={(e) => handleContentUpdate('quote', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
              <input
                type="text"
                value={selectedBlock.content.author || ''}
                onChange={(e) => handleContentUpdate('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={selectedBlock.content.position || ''}
                onChange={(e) => handleContentUpdate('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input
                type="text"
                value={selectedBlock.content.avatar || ''}
                onChange={(e) => handleContentUpdate('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleContentUpdate('rating', star)}
                    className={`p-1 ${
                      star <= (selectedBlock.content.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">FAQ Items</label>
                <button
                  onClick={() => addArrayItem('faqs', { question: 'New Question?', answer: 'Answer goes here...' })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add FAQ
                </button>
              </div>
              <div className="space-y-3">
                {(selectedBlock.content.faqs || []).map((faq: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">FAQ {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('faqs', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question || ''}
                        onChange={(e) => handleArrayUpdate('faqs', index, 'question', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Answer"
                        value={faq.answer || ''}
                        onChange={(e) => handleArrayUpdate('faqs', index, 'answer', e.target.value)}
                        rows={3}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Pricing Plans</label>
                <button
                  onClick={() => addArrayItem('plans', { 
                    name: 'New Plan', 
                    price: '$0', 
                    period: 'month', 
                    features: ['Feature 1'], 
                    popular: false 
                  })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Plan
                </button>
              </div>
              <div className="space-y-4">
                {(selectedBlock.content.plans || []).map((plan: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Plan {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('plans', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Plan name"
                        value={plan.name || ''}
                        onChange={(e) => handleArrayUpdate('plans', index, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Price"
                          value={plan.price || ''}
                          onChange={(e) => handleArrayUpdate('plans', index, 'price', e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Period"
                          value={plan.period || ''}
                          onChange={(e) => handleArrayUpdate('plans', index, 'period', e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={plan.popular || false}
                          onChange={(e) => handleArrayUpdate('plans', index, 'popular', e.target.checked)}
                          className="rounded"
                        />
                        <label className="text-sm text-gray-700">Popular plan</label>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Features (one per line)</label>
                        <textarea
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                          value={(plan.features || []).join('\n')}
                          onChange={(e) => handleArrayUpdate('plans', index, 'features', e.target.value.split('\n').filter(f => f.trim()))}
                          rows={3}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Team Members</label>
                <button
                  onClick={() => addArrayItem('members', { 
                    name: 'New Member', 
                    position: 'Position', 
                    bio: 'Bio goes here...', 
                    image: '', 
                    social: {} 
                  })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Member
                </button>
              </div>
              <div className="space-y-4">
                {(selectedBlock.content.members || []).map((member: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Member {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('members', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name || ''}
                        onChange={(e) => handleArrayUpdate('members', index, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={member.position || ''}
                        onChange={(e) => handleArrayUpdate('members', index, 'position', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Bio"
                        value={member.bio || ''}
                        onChange={(e) => handleArrayUpdate('members', index, 'bio', e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={member.image || ''}
                        onChange={(e) => handleArrayUpdate('members', index, 'image', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="LinkedIn URL"
                          value={member.social?.linkedin || ''}
                          onChange={(e) => handleArrayUpdate('members', index, 'social', { ...member.social, linkedin: e.target.value })}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Twitter URL"
                          value={member.social?.twitter || ''}
                          onChange={(e) => handleArrayUpdate('members', index, 'social', { ...member.social, twitter: e.target.value })}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Statistics</label>
                <button
                  onClick={() => addArrayItem('stats', { number: '0', label: 'Statistic', icon: 'TrendingUp' })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {(selectedBlock.content.stats || []).map((stat: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Stat {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('stats', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Number (e.g., 10,000+)"
                        value={stat.number || ''}
                        onChange={(e) => handleArrayUpdate('stats', index, 'number', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={stat.label || ''}
                        onChange={(e) => handleArrayUpdate('stats', index, 'label', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={stat.icon || 'TrendingUp'}
                        onChange={(e) => handleArrayUpdate('stats', index, 'icon', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Users">Users</option>
                        <option value="Zap">Zap</option>
                        <option value="Globe">Globe</option>
                        <option value="Clock">Clock</option>
                        <option value="TrendingUp">Trending Up</option>
                        <option value="Award">Award</option>
                        <option value="Star">Star</option>
                        <option value="Target">Target</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={selectedBlock.content.description || ''}
                onChange={(e) => handleContentUpdate('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="text"
                value={selectedBlock.content.videoUrl || ''}
                onChange={(e) => handleContentUpdate('videoUrl', e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
              <input
                type="text"
                value={selectedBlock.content.thumbnailUrl || ''}
                onChange={(e) => handleContentUpdate('thumbnailUrl', e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                <button
                  onClick={() => addArrayItem('images', { url: '', alt: '', caption: '' })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Image
                </button>
              </div>
              <div className="space-y-3">
                {(selectedBlock.content.images || []).map((image: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Image {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('images', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={image.url || ''}
                        onChange={(e) => handleArrayUpdate('images', index, 'url', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Alt text"
                        value={image.alt || ''}
                        onChange={(e) => handleArrayUpdate('images', index, 'alt', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Caption"
                        value={image.caption || ''}
                        onChange={(e) => handleArrayUpdate('images', index, 'caption', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedBlock.content.buttonText || ''}
                onChange={(e) => handleContentUpdate('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Form Fields</label>
                <button
                  onClick={() => addArrayItem('fields', { name: 'field', label: 'Field Label', type: 'text', required: false })}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Add Field
                </button>
              </div>
              <div className="space-y-3">
                {(selectedBlock.content.fields || []).map((field: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Field {index + 1}</span>
                      <button
                        onClick={() => removeArrayItem('fields', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Field name"
                        value={field.name || ''}
                        onChange={(e) => handleArrayUpdate('fields', index, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Field label"
                        value={field.label || ''}
                        onChange={(e) => handleArrayUpdate('fields', index, 'label', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={field.type || 'text'}
                        onChange={(e) => handleArrayUpdate('fields', index, 'type', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="textarea">Textarea</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.required || false}
                          onChange={(e) => handleArrayUpdate('fields', index, 'required', e.target.checked)}
                          className="rounded"
                        />
                        <label className="text-sm text-gray-700">Required field</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder Text</label>
              <input
                type="text"
                value={selectedBlock.content.placeholder || ''}
                onChange={(e) => handleContentUpdate('placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedBlock.content.buttonText || ''}
                onChange={(e) => handleContentUpdate('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Text</label>
              <input
                type="text"
                value={selectedBlock.content.privacyText || ''}
                onChange={(e) => handleContentUpdate('privacyText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={selectedBlock.content.address || ''}
                onChange={(e) => handleContentUpdate('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={selectedBlock.content.phone || ''}
                onChange={(e) => handleContentUpdate('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={selectedBlock.content.email || ''}
                onChange={(e) => handleContentUpdate('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
              <textarea
                value={selectedBlock.content.mapUrl || ''}
                onChange={(e) => handleContentUpdate('mapUrl', e.target.value)}
                rows={3}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get embed URL from Google Maps → Share → Embed a map
              </p>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-500">No properties available for this block type.</p>;
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 w-80 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Block Properties</h3>
        <div className="flex gap-2">
          <button
            onClick={() => deleteBlock(selectedBlockId)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete block"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedBlockId(null)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Block Type: <span className="font-medium">{selectedBlock.type}</span></p>
        </div>
        {renderFieldEditor()}
      </div>
    </div>
  );
};