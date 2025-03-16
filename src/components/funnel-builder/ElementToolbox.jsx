
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ELEMENT_TYPES } from '../../constants/elementTypes';

const ElementToolbox = () => {
  return (
    <div className="bg-white p-6 border rounded shadow-sm mb-6">
      <h3 className="font-medium mb-4">Available Elements</h3>
      <Droppable droppableId="element-toolbox" isDropDisabled={true}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {Object.values(ELEMENT_TYPES).map((type, index) => (
              <Draggable key={type} draggableId={`toolbox-${type}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-gray-50 p-4 rounded border border-gray-200 hover:border-indigo-500 hover:shadow-sm transition-all ${
                      snapshot.isDragging ? 'shadow-lg' : ''
                    }`}
                  >
                    <span className="capitalize">{type}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ElementToolbox;
