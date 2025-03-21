
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                <Link to="/songs" className="nav-link">Music</Link>
              </li>
              <li className="nav-item">
                <DropdownMenu>
                  <DropdownMenuTrigger className="nav-link flex items-center">
                    Media <ChevronDown className="h-4 w-4 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-900 border border-zinc-700 text-zinc-200">
                    <DropdownMenuItem asChild>
                      <Link to="/fit-pics" className="w-full hover:bg-zinc-800">Fit Pics</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/interviews" className="w-full hover:bg-zinc-800">Interviews</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/social-media" className="w-full hover:bg-zinc-800">Social Media</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li className="nav-item peace-sign-nav">
                <Link to="/coming-soon" className="nav-link flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#9b87f5" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="12" />
                    <path d="M12 12 8 16" />
                    <path d="M12 12 16 16" />
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
