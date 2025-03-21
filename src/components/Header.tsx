
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/coming-soon?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <header className="navbar w-full py-4 px-6 border-b border-zinc-800 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="navbar-brand mb-3 md:mb-0 text-white hover:text-purple-300 transition-colors">
          CARTI CATALOG
        </Link>
        
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <nav className="mb-3 md:mb-0 md:mr-4">
            <ul className="flex space-x-6">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/coming-soon" className="nav-link">Music</Link>
              </li>
              <li className="nav-item">
                <Link to="/fit-pics" className="nav-link">Fit Pics</Link>
              </li>
              <li className="nav-item">
                <Link to="/interviews" className="nav-link">Interviews</Link>
              </li>
              <li className="nav-item">
                <Link to="/social-media" className="nav-link">Social Media</Link>
              </li>
              <li className="nav-item flex items-center peace-sign-nav">
                <Link to="/coming-soon" className="nav-link flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-110 transition-transform text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input 
              type="search" 
              placeholder="Search" 
              className="px-3 py-1 bg-zinc-900 text-white border border-zinc-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-3 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700 border-l-0 rounded-r-md hover:bg-zinc-700 text-sm transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
