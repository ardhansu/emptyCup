import React from 'react';
import { MoreVertical } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white z-20 px-4 py-3 flex items-center justify-between border-b border-[#E5E5E5]">
      <div className="flex items-center">
        <Logo />
        <h1 className="text-lg font-semibold ml-2 text-[#1A1A1A]">EmptyCup</h1>
      </div>
      <button className="p-1 hover:bg-[#F5F5F5] rounded-full">
        <MoreVertical size={20} className="text-[#666666]" />
      </button>
    </header>
  );
};

export default Header;