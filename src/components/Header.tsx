
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
