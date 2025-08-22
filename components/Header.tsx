
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-amber-400 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-center">
        <BookOpenIcon className="h-8 w-8 text-white mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider" style={{ fontFamily: "'Times New Roman', serif" }}>
          Isaac Stories
        </h1>
      </div>
    </header>
  );
};

export default Header;
