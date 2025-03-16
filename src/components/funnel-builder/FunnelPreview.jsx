
import React from 'react';

const FunnelPreview = ({ elements }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="border-2 p-4 min-h-[500px] rounded">
        {elements.map((element, index) => (
          <div key={element.id} className="preview-element mb-4">
            {element.type === 'heading' && (
              <h2 className="text-2xl font-bold">{element.content}</h2>
            )}
            {element.type === 'text' && <p>{element.content}</p>}
            {element.type === 'button' && (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                {element.content}
              </button>
            )}
            {element.type === 'input' && (
              <input
                type="text"
                placeholder={element.content}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelPreview;
