import React from 'react';
import { Home, Image, Search, ClipboardList, SlidersHorizontal } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'contact', icon: Home, label: 'Contact' },
    { id: 'gallery', icon: Image, label: 'Gallery' },
    { id: 'map', icon: Search, label: 'Map' },
    { id: 'shortlisted', icon: ClipboardList, label: 'Shortlisted' },
    { id: 'sort', icon: SlidersHorizontal, label: 'Sort' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon size={20} />
            <span className="mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;