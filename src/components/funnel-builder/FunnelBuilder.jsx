import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ELEMENT_TYPES } from '../../constants/elementTypes';
import FunnelPreview from './FunnelPreview';

const FunnelBuilder = () => {
  const [elements, setElements] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddElement = (type) => {
    const newElement = {
      id: uuidv4(),
      type,
      content: `New ${type} element`,
    };
    setElements([...elements, newElement]);
  };

  const handleUpdateElement = (id, updatedElement) => {
    setElements(elements.map(el => el.id === id ? updatedElement : el));
  };

  const handleDeleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElements(items);
  };

  const { saveFunnel, currentFunnel } = useFunnel();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currentFunnel) return;
    
    setIsSaving(true);
    try {
      const updatedFunnel = {
        ...currentFunnel,
        elements: elements,
        updatedAt: new Date().toISOString()
      };
      await saveFunnel(updatedFunnel);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Funnel Builder</h2>
      <ElementToolbox onAddElement={handleAddElement} />

      <div className="bg-white p-6 border rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Funnel Editor</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
        {showPreview ? (
          <FunnelPreview elements={elements} />
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="funnel-elements">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[300px] p-4 border-2 border-dashed border-gray-300 rounded bg-gray-50 transition-colors hover:border-indigo-300"
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
        )}
        <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center ${
                isSaving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Apply Changes'
              )}
            </button>
          </div>
      </div>
    </div>
  );
};

const FunnelElement = ({ element, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);

  const handleSave = () => {
    onUpdate(element.id, { ...element, content });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-4 rounded shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium capitalize">{element.type}</span>
            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={() => onDelete(element.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
              />
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="prose max-w-none">{element.content}</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

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

export default FunnelBuilder;