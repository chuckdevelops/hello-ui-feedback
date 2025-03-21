
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar w-full py-4 px-6 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="navbar-brand">
          CARTI CATALOG
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Albums</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Singles</Link>
            </li>
            <li className="nav-item flex items-center">
              <Link to="/coming-soon" className="nav-link flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
