import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { usePageBuilder } from '../context/PageBuilderContext';

interface DragDropProviderProps {
  children: React.ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({ children }) => {
  const { moveBlock, currentPage } = usePageBuilder();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // If no destination, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Handle block reordering within the canvas
    if (type === 'BLOCK' && source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      moveBlock(source.index, destination.index);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
};