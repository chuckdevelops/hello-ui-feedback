
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
import Footer from '@/components/Footer';
import { interviews, eras, interviewTypes } from '@/data/interviews';
import { Interview } from '@/types/interviews';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Interviews = () => {
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
  }, [filters]);
  
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
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center carti-font tracking-wide text-gradient">CARTI INTERVIEWS</h1>
        
        {/* Filters */}
        <Card className="glass mb-8 shadow-lg">
          <div className="p-5">
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
                  {eras.map((era) => (
                    <ToggleGroupItem 
                      key={era} 
                      value={era}
                      className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white"
                    >
                      {era}
                    </ToggleGroupItem>
                  ))}
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
                  {interviewTypes.map((type) => (
                    <ToggleGroupItem 
                      key={type} 
                      value={type}
                      className="bg-zinc-800 text-xs data-[state=on]:bg-purple-900 data-[state=on]:text-white"
                    >
                      {type}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              {/* Search */}
              <div className="md:col-span-1">
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
        </Card>
        
        {/* Results */}
        <Card className="glass overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-200">Results</h2>
            <Badge variant="outline" className="bg-black/60 border-white/20 text-white/80">
              {filteredInterviews.length} interviews found
            </Badge>
          </div>
          
          <div className="p-3">
            <Table>
              <TableHeader className="bg-black/60">
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
                    <TableRow key={interview.id} className="border-white/5 hover:bg-white/5">
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
                        <Badge variant="outline" className="bg-black/60 border-white/20 text-white/80">
                          {interview.era}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {interview.outlet}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant={interview.interview_type === "Video" ? "outline" : "secondary"} 
                                className={interview.interview_type === "Video" ? "bg-black/60 border-white/20" : "bg-white/10 hover:bg-white/15"}
                              >
                                {interview.interview_type}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black/90 border-white/10 text-white/90">
                              {interview.interview_type === "Video" 
                                ? "Video interview" 
                                : `${interview.interview_type} interview`}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
            <div className="px-4 py-4 border-t border-white/10 flex justify-center">
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className={`px-3 py-1 rounded ${
                    filters.page === 1
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Prev
                </button>
                <span className="px-3 py-1 glass text-zinc-300 rounded">
                  Page {filters.page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed'
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={filters.page === totalPages}
                  className={`px-3 py-1 rounded ${
                    filters.page === totalPages
                      ? 'bg-black/40 text-zinc-500 cursor-not-allowed' 
                      : 'glass text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interviews;
