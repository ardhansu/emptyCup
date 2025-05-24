import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FilterToggle from './components/FilterToggle';
import DesignerList from './components/DesignerList';
import { api } from './services/api';
import useLocalStorage from './hooks/useLocalStorage';
import type { Designer } from './data/designers';

function App() {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('contact');
  const [shortlistedIds, setShortlistedIds] = useLocalStorage<number[]>('shortlistedDesigners', []);
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const data = await api.getDesigners();
        setDesigners(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load designers. Please try again later.');
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  const handleToggleShortlist = (id: number) => {
    setShortlistedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(designerId => designerId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleFilter = () => {
    setShowOnlyShortlisted(prev => !prev);
  };

  // Auto-switch to appropriate tab when filter is toggled
  useEffect(() => {
    if (showOnlyShortlisted) {
      setActiveTab('shortlisted');
    }
  }, [showOnlyShortlisted]);

  // Switch filter mode when the shortlisted tab is selected
  useEffect(() => {
    if (activeTab === 'shortlisted') {
      setShowOnlyShortlisted(true);
    } else if (activeTab === 'contact') {
      setShowOnlyShortlisted(false);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <FilterToggle 
        showOnlyShortlisted={showOnlyShortlisted} 
        toggleFilter={toggleFilter} 
      />

      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading designers...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">
            {error}
          </div>
        ) : (
          <DesignerList
            designers={designers}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
            showOnlyShortlisted={showOnlyShortlisted}
          />
        )}
      </main>

      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;