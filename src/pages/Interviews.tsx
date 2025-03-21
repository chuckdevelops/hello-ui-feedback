
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';
import Header from '@/components/Header';
import { interviews } from '@/data/interviews';
import { Interview } from '@/types/interviews';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [filters, setFilters] = useState({
    era: 'all',
    type: 'all',
    query: '',
    page: 1
  });
  
  // Items per page
  const itemsPerPage = 10;
  
  useEffect(() => {
    // Fetch data
    setInterviews(interviews);
  }, []);
  
  useEffect(() => {
    // Apply filters
    let results = interviews;
    
    // Filter by era
    if (filters.era !== 'all') {
      results = results.filter(interview => interview.era === filters.era);
    }
    
    // Filter by type
    if (filters.type !== 'all') {
      results = results.filter(interview => interview.interview_type === filters.type);
    }
    
    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(interview => 
        interview.title.toLowerCase().includes(query) || 
        interview.outlet.toLowerCase().includes(query)
      );
    }
    
    setFilteredInterviews(results);
  }, [interviews, filters]);
  
  // Get current page items
  const indexOfLastItem = filters.page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInterviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center carti-font tracking-wide text-gradient">CARTI INTERVIEWS</h1>
        
        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-zinc-200">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Era Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-zinc-400">Era</h3>
              <ToggleGroup 
                type="single" 
                value={filters.era} 
                onValueChange={(value) => value && setFilters(prev => ({ ...prev, era: value, page: 1 }))}
                className="justify-start flex-wrap"
              >
                <ToggleGroupItem value="all" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="Self-Titled" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  Self-Titled
                </ToggleGroupItem>
                <ToggleGroupItem value="Die Lit" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  Die Lit
                </ToggleGroupItem>
                <ToggleGroupItem value="WLR" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  WLR
                </ToggleGroupItem>
                <ToggleGroupItem value="NARCISSIST" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  NARCISSIST
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-medium mb-2 text-zinc-400">Type</h3>
              <ToggleGroup 
                type="single" 
                value={filters.type} 
                onValueChange={(value) => value && setFilters(prev => ({ ...prev, type: value, page: 1 }))}
                className="justify-start flex-wrap"
              >
                <ToggleGroupItem value="all" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  All
                </ToggleGroupItem>
                <ToggleGroupItem value="Text" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  Text
                </ToggleGroupItem>
                <ToggleGroupItem value="Video" className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white">
                  Video
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Search */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-medium mb-2 text-zinc-400">Search</h3>
              <Input 
                type="search" 
                placeholder="Search by title or outlet..." 
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value, page: 1 }))}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-200">Results</h2>
            <Badge variant="outline" className="bg-zinc-800 text-zinc-300">
              {filteredInterviews.length} interviews found
            </Badge>
          </div>
          
          <div className="p-3">
            <Table>
              <TableHeader className="bg-zinc-950">
                <TableRow>
                  <TableHead className="text-zinc-300">Title</TableHead>
                  <TableHead className="text-zinc-300">Date</TableHead>
                  <TableHead className="text-zinc-300">Era</TableHead>
                  <TableHead className="text-zinc-300">Media Outlet</TableHead>
                  <TableHead className="text-zinc-300">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((interview) => (
                    <TableRow key={interview.id} className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableCell className="font-medium">
                        {interview.link ? (
                          <a 
                            href={interview.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {interview.title}
                          </a>
                        ) : (
                          <span>{interview.title}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-zinc-400">
                        {interview.date}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-zinc-800">
                          {interview.era}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {interview.outlet}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={interview.interview_type === "Video" ? "outline" : "secondary"} 
                          className={interview.interview_type === "Video" ? "bg-zinc-900 border-zinc-700" : "bg-zinc-800"}
                        >
                          {interview.interview_type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-zinc-400">
                      No interviews match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4 border-t border-zinc-800 flex justify-center">
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Prev
                </button>
                <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded">
                  Page {filters.page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Interviews;
