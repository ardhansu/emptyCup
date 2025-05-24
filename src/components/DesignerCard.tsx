import React from 'react';
import { ArrowRight, Eye, Bookmark, Flag, Phone } from 'lucide-react';
import StarRating from './StarRating';
import type { Designer } from '../data/designers';

interface DesignerCardProps {
  designer: Designer;
  isShortlisted: boolean;
  onToggleShortlist: (id: number) => void;
}

const DesignerCard: React.FC<DesignerCardProps> = ({ 
  designer, 
  isShortlisted, 
  onToggleShortlist 
}) => {
  const { id, name, description, rating, projects, years, price, phone } = designer;
  
  return (
    <div className="px-4 py-5">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">{name}</h2>
          <StarRating rating={rating} />
          <p className="text-sm text-[#666666] mt-2 pr-6">
            {description}
          </p>
        </div>
        <ArrowRight size={18} className="text-[#666666]" />
      </div>
      
      <div className="metrics">
        <div className="metric">
          <p className="metric-value">{projects}</p>
          <p className="metric-label">Projects</p>
        </div>
        <div className="metric">
          <p className="metric-value">{years}</p>
          <p className="metric-label">Years</p>
        </div>
        <div className="metric">
          <p className="metric-value">{'$'.repeat(price)}</p>
          <p className="metric-label">Price</p>
        </div>
      </div>
      
      <div className="mt-4">
        {phone.map((num, index) => (
          <div key={index} className="phone-number">
            <Phone size={14} className="text-[#666666] mr-2" />
            <span>{num}</span>
          </div>
        ))}
      </div>
      
      <div className="action-buttons">
        <button className="action-button">
          <ArrowRight size={18} />
          <span>Details</span>
        </button>
        <button className="action-button">
          <Eye size={18} />
          <span>Hide</span>
        </button>
        <button 
          className={`action-button ${isShortlisted ? 'active' : ''}`}
          onClick={() => onToggleShortlist(id)}
        >
          <Bookmark size={18} fill={isShortlisted ? 'currentColor' : 'none'} />
          <span>Shortlist</span>
        </button>
        <button className="action-button">
          <Flag size={18} />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
};

export default DesignerCard;