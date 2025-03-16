import React from 'react';
import { Link } from 'react-router-dom';
import { useFunnel } from '../context/FunnelContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FunnelList from '../components/dashboard/FunnelList';
import Analytics from '../components/dashboard/Analytics';

const Dashboard = () => {
  const { funnels, loading, error, createNewFunnel } = useFunnel();

  const handleCreateFunnel = () => {
    createNewFunnel();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Manage your marketing funnels</p>
        </div>
        <button
          onClick={handleCreateFunnel}
          className="mt-4 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="admin-card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Total Funnels
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {loading ? '...' : funnels.length}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Active Campaigns
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {loading ? '...' : Math.floor(funnels.length * 0.7)}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Total Conversions
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {loading ? '...' : Math.floor(Math.random() * 1000)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="admin-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Funnels</h2>
              <Link
                to="/builder"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : funnels.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't created any funnels yet.</p>
                <button
                  onClick={handleCreateFunnel}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create Your First Funnel
                </button>
              </div>
            ) : (
              <FunnelList funnels={funnels} />
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics</h2>
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
