import React, { useState } from 'react';
import { INDUSTRIES, FUNNEL_TYPES, generateIndustryFunnel } from '../../services/funnelAnalyzer';

const FunnelGenerator = ({ onGenerate }) => {
  const [industry, setIndustry] = useState('');
  const [funnelType, setFunnelType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!industry || !funnelType) {
      setError('Please select both an industry and funnel type');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      const generatedFunnel = await generateIndustryFunnel(industry, funnelType);
      onGenerate(generatedFunnel);
    } catch (err) {
      console.error('Funnel generation error:', err);
      setError('Failed to generate funnel. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">AI Funnel Generator</h2>
      <p className="text-gray-600 mb-4">
        Generate a high-converting funnel based on current industry data and best practices.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isGenerating}
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Funnel Type
          </label>
          <select
            value={funnelType}
            onChange={(e) => setFunnelType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isGenerating}
          >
            <option value="">Select a funnel type</option>
            {FUNNEL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <strong>Note:</strong> Industry analysis is updated weekly.
          </div>
          <button
            type="submit"
            className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isGenerating}
          >
            {isGenerating ? (
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
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Generate Funnel
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FunnelGenerator;
