import React from 'react';
import DesignerCard from './DesignerCard';
import type { Designer } from '../data/designers';

interface DesignerListProps {
  designers: Designer[];
  shortlistedIds: number[];
  onToggleShortlist: (id: number) => void;
  showOnlyShortlisted: boolean;
}

const DesignerList: React.FC<DesignerListProps> = ({ 
  designers, 
  shortlistedIds, 
  onToggleShortlist,
  showOnlyShortlisted
}) => {
  const filteredDesigners = showOnlyShortlisted
    ? designers.filter(designer => shortlistedIds.includes(designer.id))
    : designers;

  if (filteredDesigners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4">
        <p className="text-[#666666] text-center">
          {showOnlyShortlisted 
            ? "You haven't shortlisted any designers yet." 
            : "No designers found."}
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {filteredDesigners.map((designer, index) => (
        <div key={designer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
          <DesignerCard
            designer={designer}
            isShortlisted={shortlistedIds.includes(designer.id)}
            onToggleShortlist={onToggleShortlist}
          />
        </div>
      ))}
    </div>
  );
};

export default DesignerList;