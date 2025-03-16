import React from 'react';
import {
import React from 'react';
import { ELEMENT_TYPES } from '../../constants/elementTypes';

const ElementToolbox = ({ onAddElement }) => {
  return (
    <div className="bg-white p-6 border rounded shadow-sm mb-6">
      <h3 className="font-medium mb-4">Available Elements</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(ELEMENT_TYPES).map((type) => (
          <div
            key={type}
            className="bg-gray-50 p-4 rounded cursor-move border border-gray-200 hover:border-indigo-500 hover:shadow-sm transition-all"
            draggable
            onDragEnd={() => onAddElement(type)}
          >
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementToolbox;
