import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFunnel } from '../context/FunnelContext';
import FunnelBuilder from '../components/funnel-builder/FunnelBuilder';
import ElementToolbox from '../components/funnel-builder/ElementToolbox';
import AiChat from '../components/chat/AiChat';

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentFunnel,
    selectFunnel,
    createNewFunnel,
    saveFunnel,
    loading,
    error
  } = useFunnel();
  const [isSaving, setIsSaving] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Load funnel data if ID is provided
  useEffect(() => {
    if (id) {
      selectFunnel(id);
    } else if (!currentFunnel) {
      createNewFunnel();
    }
  }, [id, selectFunnel, createNewFunnel, currentFunnel]);

  const handleSave = async () => {
    if (!currentFunnel) return;
    
    setIsSaving(true);
    try {
      const savedFunnel = await saveFunnel(currentFunnel);
      if (!id) {
        // Redirect to the funnel's dedicated URL if it's a new funnel
        navigate(`/builder/${savedFunnel.id}`);
      }
    } catch (err) {
      console.error('Failed to save funnel:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  if (loading && !currentFunnel) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error && !currentFunnel) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Funnel</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentFunnel?.name || 'New Funnel'}
          </h1>
          <p className="text-gray-500">
            {currentFunnel?.description || 'Build your marketing funnel'}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toggleChat}
            className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            {showChat ? 'Hide AI Assistant' : 'Show AI Assistant'}
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
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Funnel'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Elements</h2>
          <ElementToolbox />
        </div>
        
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Funnel Preview</h2>
          {currentFunnel && <FunnelBuilder funnel={currentFunnel} />}
        </div>

        <div className={`lg:col-span-1 ${showChat ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm h-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">AI Assistant</h2>
            <AiChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
