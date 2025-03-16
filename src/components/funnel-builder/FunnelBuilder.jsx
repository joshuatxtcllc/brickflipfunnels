import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Sample funnel elements
const ELEMENT_TYPES = {
  HEADER: 'header',
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  FORM: 'form',
  VIDEO: 'video',
};

// Generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial elements for demo
const initialElements = [
  { id: generateId(), type: ELEMENT_TYPES.HEADER, content: 'Welcome to Our Product' },
  { id: generateId(), type: ELEMENT_TYPES.TEXT, content: 'This amazing product will solve all your problems.' },
  { id: generateId(), type: ELEMENT_TYPES.BUTTON, content: 'Sign Up Now' },
];

// Funnel Element Component
const FunnelElement = ({ element, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);

  const handleSave = () => {
    onUpdate(element.id, { content });
    setIsEditing(false);
  };

  const renderElementContent = () => {
    switch (element.type) {
      case ELEMENT_TYPES.HEADER:
        return <h2 className="text-2xl font-bold">{element.content}</h2>;
      case ELEMENT_TYPES.TEXT:
        return <p>{element.content}</p>;
      case ELEMENT_TYPES.BUTTON:
        return (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            {element.content}
          </button>
        );
      case ELEMENT_TYPES.FORM:
        return (
          <div className="p-4 border rounded">
            <p className="mb-2">Form: {element.content}</p>
            <input type="text" className="border p-2 w-full mb-2" placeholder="Name" />
            <input type="email" className="border p-2 w-full mb-2" placeholder="Email" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          </div>
        );
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="bg-gray-200 p-4 text-center">
            [Image Placeholder: {element.content}]
          </div>
        );
      case ELEMENT_TYPES.VIDEO:
        return (
          <div className="bg-gray-200 p-4 text-center">
            [Video Placeholder: {element.content}]
          </div>
        );
      default:
        return <div>{element.content}</div>;
    }
  };

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`funnel-element bg-white p-4 mb-4 border rounded shadow-sm ${
            snapshot.isDragging ? 'opacity-50' : ''
          }`}
        >
          <div className="flex justify-between mb-2">
            <div className="font-medium text-gray-500 capitalize">{element.type}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-500 hover:text-blue-700"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={() => onDelete(element.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                rows="3"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="cursor-grab">{renderElementContent()}</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

// Element Toolbox Component
const ElementToolbox = ({ onAddElement }) => {
  return (
    <div className="bg-white p-4 border rounded shadow-sm mb-6">
      <h3 className="font-medium mb-2">Add Elements</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(ELEMENT_TYPES).map((type) => (
          <button
            key={type}
            onClick={() => onAddElement(type)}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded capitalize"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Funnel Builder Component
const FunnelBuilder = () => {
  const [elements, setElements] = useState(initialElements);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElements(items);
  };

  const handleAddElement = (type) => {
    const newElement = {
      id: generateId(),
      type,
      content: `New ${type} element`,
    };
    setElements([...elements, newElement]);
  };

  const handleUpdateElement = (id, data) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, ...data } : element
      )
    );
  };

  const handleDeleteElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Funnel Builder</h2>
      <ElementToolbox onAddElement={handleAddElement} />
      
      <div className="bg-white p-6 border rounded shadow-sm">
        <h3 className="font-medium mb-4">Funnel Preview</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="funnel-elements">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[300px] p-4 border border-dashed border-gray-300 rounded"
              >
                {elements.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">
                    Drag elements here to build your funnel
                  </p>
                ) : (
                  elements.map((element, index) => (
                    <FunnelElement
                      key={element.id}
                      element={element}
                      index={index}
                      onUpdate={handleUpdateElement}
                      onDelete={handleDeleteElement}
                    />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default FunnelBuilder;
