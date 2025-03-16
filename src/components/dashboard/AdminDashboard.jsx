import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample funnel data
const SAMPLE_FUNNELS = [
  {
    id: '1',
    name: 'Product Launch Funnel',
    status: 'active',
    conversion: 4.7,
    visitors: 1245,
    created: '2025-03-01',
  },
  {
    id: '2',
    name: 'Email Signup Funnel',
    status: 'active',
    conversion: 8.2,
    visitors: 3689,
    created: '2025-02-15',
  },
  {
    id: '3',
    name: 'Free Trial Funnel',
    status: 'draft',
    conversion: 0,
    visitors: 0,
    created: '2025-03-10',
  },
];

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

// Funnel Table Component
const FunnelTable = ({ funnels, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Conversion
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Visitors
          </th>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created
          </th>
          <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {funnels.map((funnel) => (
          <tr key={funnel.id} className="hover:bg-gray-50">
            <td className="py-4 px-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{funnel.name}</div>
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  funnel.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {funnel.status}
              </span>
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {funnel.conversion > 0 ? `${funnel.conversion}%` : 'N/A'}
              </div>
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {funnel.visitors.toLocaleString()}
              </div>
            </td>
            <td className="py-4 px-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{funnel.created}</div>
            </td>
            <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
              <Link
                to={`/builder/${funnel.id}`}
                className="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(funnel.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Dashboard Component
const AdminDashboard = () => {
  const [funnels, setFunnels] = useState(SAMPLE_FUNNELS);

  const handleDeleteFunnel = (id) => {
    if (window.confirm('Are you sure you want to delete this funnel?')) {
      setFunnels(funnels.filter((funnel) => funnel.id !== id));
    }
  };

  const handleCreateFunnel = () => {
    // In a real app, this would navigate to the builder with a new funnel
    console.log('Create new funnel');
  };

  // Calculate dashboard metrics
  const totalFunnels = funnels.length;
  const activeFunnels = funnels.filter((funnel) => funnel.status === 'active').length;
  const totalVisitors = funnels.reduce((sum, funnel) => sum + funnel.visitors, 0);
  const avgConversion = funnels
    .filter((funnel) => funnel.conversion > 0)
    .reduce((sum, funnel, _, arr) => sum + funnel.conversion / arr.length, 0)
    .toFixed(1);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleCreateFunnel}
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
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Funnel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Funnels"
          value={totalFunnels}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="bg-blue-500"
        />
        <StatsCard
          title="Active Funnels"
          value={activeFunnels}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
          color="bg-green-500"
        />
        <StatsCard
          title="Total Visitors"
          value={totalVisitors.toLocaleString()}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="bg-purple-500"
        />
        <StatsCard
          title="Avg. Conversion"
          value={`${avgConversion}%`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          color="bg-yellow-500"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Funnels</h2>
        <FunnelTable funnels={funnels} onDelete={handleDeleteFunnel} />
      </div>
    </div>
  );
};

export default AdminDashboard;
