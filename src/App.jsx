import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Mock components - replace with real implementations
import FunnelBuilder from './components/funnel-builder/FunnelBuilder';
import AiChat from './components/chat/AiChat';
import AdminDashboard from './components/dashboard/AdminDashboard';

// Simple auth state
const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return { user, login, logout, isAuth: !!user };
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
};

// Navigation component
const Navigation = () => {
  const { user, logout, isAuth } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-indigo-600">Kickflip Funnels</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
          {isAuth && (
            <>
              <Link to="/builder" className="text-gray-600 hover:text-indigo-600">Builder</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
              <button onClick={logout} className="text-gray-600 hover:text-indigo-600">Logout</button>
            </>
          )}
          {!isAuth && (
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// Home page
const Home = () => {
  const { isAuth } = useAuth();
  
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Build Smart Marketing Funnels with AI</h1>
      <p className="text-xl text-gray-600 mb-8">Create high-converting funnels with drag-and-drop simplicity and AI assistance.</p>
      {isAuth ? (
        <Link to="/builder" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
          Start Building
        </Link>
      ) : (
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
          Get Started
        </Link>
      )}
    </div>
  );
};

// Login page
const Login = () => {
  const { login } = useAuth();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in a real app, you'd validate credentials
    login({ id: 1, name: 'Demo User', email: 'demo@example.com' });
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            defaultValue="demo@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            defaultValue="password"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// App component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/builder" element={
              <ProtectedRoute>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-3/4">
                    <FunnelBuilder />
                  </div>
                  <div className="w-full md:w-1/4">
                    <AiChat />
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
