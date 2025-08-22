
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-amber-100/50 p-4 mt-8">
      <div className="container mx-auto text-center text-amber-800 text-sm">
        <p>&copy; {new Date().getFullYear()} Isaac Stories. All Rights Reserved.</p>
        <p className="mt-1">Stories generated with the help of Google's Gemini AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
