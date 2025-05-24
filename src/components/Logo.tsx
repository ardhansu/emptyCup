import React from 'react';
import { Coffee } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
      <Coffee size={18} color="white" />
    </div>
  );
};

export default Logo;