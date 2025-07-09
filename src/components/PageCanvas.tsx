import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { usePageBuilder } from '../context/PageBuilderContext';
import { BlockRenderer } from './BlockRenderer';
import { Plus, GripVertical } from 'lucide-react';

interface PageCanvasProps {
  onAddBlock?: () => void;
}

export const PageCanvas: React.FC<PageCanvasProps> = ({ onAddBlock }) => {
  const { currentPage, selectedBlockId, setSelectedBlockId, mode } = usePageBuilder();

  if (currentPage.blocks.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <Droppable droppableId="canvas" type="BLOCK">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                w-full h-full flex items-center justify-center transition-all duration-200
                ${snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
              `}
            >
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Page</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Add your first block from the library to begin creating your page.
                </p>
                {onAddBlock && (
                  <button
                    onClick={onAddBlock}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Your First Block
                  </button>
                )}
                {snapshot.isDraggingOver && (
                  <div className="mt-4 text-blue-600 font-medium">
                    Drop your block here to get started!
                  </div>
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <Droppable droppableId="canvas" type="BLOCK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-full transition-all duration-200
              ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}
            `}
          >
            {currentPage.blocks.map((block, index) => (
              <Draggable
                key={block.id}
                draggableId={block.id}
                index={index}
                isDragDisabled={mode === 'preview'}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`
                      relative group transition-all duration-200
                      ${snapshot.isDragging ? 'shadow-2xl rotate-1 z-50' : ''}
                      ${mode === 'edit' ? 'hover:shadow-lg' : ''}
                    `}
                  >
                    {mode === 'edit' && (
                      <div
                        {...provided.dragHandleProps}
                        className={`
                          absolute top-2 left-2 z-10 bg-white rounded-md p-2 shadow-md 
                          opacity-0 group-hover:opacity-100 transition-all duration-200
                          cursor-grab active:cursor-grabbing hover:bg-gray-50
                          ${selectedBlockId === block.id ? 'opacity-100' : ''}
                        `}
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                    
                    <BlockRenderer
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      isEditing={mode === 'edit'}
                      onClick={() => mode === 'edit' && setSelectedBlockId(block.id)}
                    />
                    
                    {snapshot.isDragging && (
                      <div className="absolute inset-0 bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center">
                        <div className="text-blue-600 font-medium">Moving block...</div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            {snapshot.isDraggingOver && (
              <div className="h-20 bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg m-4 flex items-center justify-center">
                <div className="text-blue-600 font-medium">Drop block here</div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};