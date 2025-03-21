
import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="coming-soon-container flex justify-center items-center flex-grow">
        <h1 className="coming-soon-text carti-font text-white text-5xl md:text-7xl tracking-wider">
          Coming Soon
        </h1>
      </div>
      
      <div className="back-link text-center pb-5">
        <Link to="/" className="text-gray-600 hover:text-white no-underline carti-font text-base tracking-wide transition-colors">
          ← BACK TO CATALOG
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
