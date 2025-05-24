import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? '#f59e0b' : 'none'}
          color={index < rating ? '#f59e0b' : '#cbd5e1'}
        />
      ))}
    </div>
  );
};

export default StarRating;