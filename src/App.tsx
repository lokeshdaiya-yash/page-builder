import React, { useState } from 'react';
import { PageBuilderProvider, usePageBuilder } from './context/PageBuilderContext';
import { DragDropProvider } from './components/DragDropProvider';
import { BlockLibrary, blockTypes } from './components/BlockLibrary';
import { PageCanvas } from './components/PageCanvas';
import { PropertyPanel } from './components/PropertyPanel';
import { Toolbar } from './components/Toolbar';
import { PageManager } from './components/PageManager';
import { BlockData } from './types';
import { FileText } from 'lucide-react';

const PageBuilderContent: React.FC = () => {
  const { addBlock, mode } = usePageBuilder();
  const [showLibrary, setShowLibrary] = useState(true);
  const [showPageManager, setShowPageManager] = useState(false);

  const handleAddBlock = (blockType: any) => {
    const newBlock: BlockData = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: blockType.id,
      content: blockType.defaultContent,
    };
    addBlock(newBlock);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.page-dropdown')) {
        // This will be handled by the Toolbar component
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DragDropProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        <Toolbar />
        
        <div className="flex-1 flex overflow-hidden">
          {mode === 'edit' && showLibrary && (
            <BlockLibrary onAddBlock={handleAddBlock} />
          )}
          
          <PageCanvas onAddBlock={() => setShowLibrary(true)} />
          
          {mode === 'edit' && <PropertyPanel />}
        </div>
        
        {mode === 'edit' && (
          <>
            <button
              onClick={() => setShowLibrary(!showLibrary)}
              className="fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 z-40"
              title={showLibrary ? 'Hide Library' : 'Show Library'}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${showLibrary ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button
              onClick={() => setShowPageManager(true)}
              className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 z-40"
              title="Manage Pages"
            >
              <FileText className="w-5 h-5" />
            </button>
          </>
        )}

        <PageManager 
          isOpen={showPageManager} 
          onClose={() => setShowPageManager(false)} 
        />
      </div>
    </DragDropProvider>
  );
};

function App() {
  return (
    <PageBuilderProvider>
      <PageBuilderContent />
    </PageBuilderProvider>
  );
}

export default App;