import React from 'react';

const FunnelInsights = ({ insights, onApply }) => {
  if (!insights) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Industry Insights</h2>
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
          {insights.industry} • {insights.funnelType}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Conversion Statistics</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-green-700">
                {insights.insights.averageConversion}%
              </span>
            </div>
            <div>
              <p className="font-medium">Average Conversion Rate</p>
              <p className="text-sm text-gray-600">
                For {insights.industry} {insights.funnelType} funnels
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-md font-medium mb-2">Best Practices</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {insights.insights.bestPractices.map((practice, index) => (
              <li key={index} className="text-sm">{practice}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Recent Trends</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {insights.insights.recentTrends.map((trend, index) => (
              <li key={index} className="text-sm">{trend}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Recommended Funnel Structure</h3>
        <div className="flex overflow-x-auto pb-2">
          {insights.insights.topFunnelStructure.map((step, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md text-sm capitalize">
                {step}
              </div>
              {index < insights.insights.topFunnelStructure.length - 1 && (
                <div className="mx-2 text-gray-400 flex items-center">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 mb-6">
        <div className="flex items-start">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 mt-0.5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
          <div>
            <p className="font-medium mb-1">AI Recommendation</p>
            <p className="text-sm">
              Based on our analysis, this funnel structure is currently outperforming others in the {insights.industry} space by 15-20%.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onApply}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Apply This Template
        </button>
      </div>
    </div>
  );
};

export default FunnelInsights;
