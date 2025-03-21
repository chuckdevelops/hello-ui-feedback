
import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="coming-soon-container flex justify-center items-center flex-grow glass">
        <h1 className="coming-soon-text carti-font text-white text-5xl md:text-7xl tracking-wider text-gradient">
          Coming Soon
        </h1>
      </div>
      
      <div className="back-link text-center pb-5">
        <Link to="/" className="text-gray-500 hover:text-purple-400 no-underline carti-font text-base tracking-wide transition-colors">
          ← BACK TO CATALOG
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
