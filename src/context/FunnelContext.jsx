import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFunnels, saveFunnel, deleteFunnel } from '../services/funnelService';

const FunnelContext = createContext();

export const useFunnel = () => useContext(FunnelContext);

export const FunnelProvider = ({ children }) => {
  const [funnels, setFunnels] = useState([]);
  const [currentFunnel, setCurrentFunnel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load funnels on mount
  useEffect(() => {
    const loadFunnels = async () => {
      setLoading(true);
      try {
        const data = await getFunnels();
        setFunnels(data);
        setError(null);
      } catch (err) {
        setError('Failed to load funnels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFunnels();
  }, []);

  // Create or update a funnel
  const saveFunnelData = async (funnelData) => {
    setLoading(true);
    try {
      const savedFunnel = await saveFunnel(funnelData);
      
      if (funnelData.id) {
        // Update existing funnel
        setFunnels(funnels.map(f => f.id === savedFunnel.id ? savedFunnel : f));
      } else {
        // Add new funnel
        setFunnels([...funnels, savedFunnel]);
      }
      
      setCurrentFunnel(savedFunnel);
      setError(null);
      return savedFunnel;
    } catch (err) {
      setError('Failed to save funnel');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a funnel
  const removeFunnel = async (id) => {
    setLoading(true);
    try {
      await deleteFunnel(id);
      setFunnels(funnels.filter(f => f.id !== id));
      if (currentFunnel && currentFunnel.id === id) {
        setCurrentFunnel(null);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete funnel');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set the current funnel for editing
  const selectFunnel = (id) => {
    const funnel = funnels.find(f => f.id === id);
    setCurrentFunnel(funnel || null);
  };

  // Create a new empty funnel
  const createNewFunnel = () => {
    const newFunnel = {
      name: 'New Funnel',
      description: '',
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentFunnel(newFunnel);
    return newFunnel;
  };

  // Update elements in the current funnel
  const updateFunnelElements = (elements) => {
    if (!currentFunnel) return;
    
    const updatedFunnel = {
      ...currentFunnel,
      elements,
      updatedAt: new Date().toISOString()
    };
    
    setCurrentFunnel(updatedFunnel);
    return updatedFunnel;
  };

  const value = {
    funnels,
    currentFunnel,
    loading,
    error,
    saveFunnel: saveFunnelData,
    deleteFunnel: removeFunnel,
    selectFunnel,
    createNewFunnel,
    updateFunnelElements
  };

  return (
    <FunnelContext.Provider value={value}>
      {children}
    </FunnelContext.Provider>
  );
};
