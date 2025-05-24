import React from 'react';
import { Filter } from 'lucide-react';

interface FilterToggleProps {
  showOnlyShortlisted: boolean;
  toggleFilter: () => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ 
  showOnlyShortlisted, 
  toggleFilter 
}) => {
  return (
    <div className="bg-white sticky top-16 z-10 px-4 py-3 border-b border-gray-200">
      <button 
        onClick={toggleFilter}
        className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
          showOnlyShortlisted 
            ? 'bg-orange-100 text-orange-600 border border-orange-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}
      >
        <Filter size={14} className="mr-1" />
        {showOnlyShortlisted ? 'Showing Shortlisted' : 'Show All'}
      </button>
    </div>
  );
};

export default FilterToggle;