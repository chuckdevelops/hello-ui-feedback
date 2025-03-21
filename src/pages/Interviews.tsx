
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Interview, InterviewsFilters } from '@/types/interviews';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Import mock data
import { interviews, eras, interviewTypes } from '@/data/interviews';

const ITEMS_PER_PAGE = 6;

const Interviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<InterviewsFilters>({
    era: searchParams.get('era') || '',
    type: searchParams.get('type') || '',
    available: searchParams.get('available') || '',
    query: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1
  });
  
  // Filter interviews based on current filters
  const filteredInterviews = interviews.filter(interview => {
    return (
      (filters.era === '' || interview.era === filters.era) &&
      (filters.type === '' || interview.interview_type === filters.type) &&
      (filters.available === '' || 
        (filters.available === 'yes' && interview.available) || 
        (filters.available === 'no' && !interview.available)
      ) &&
      (filters.query === '' || 
        interview.outlet.toLowerCase().includes(filters.query.toLowerCase()) ||
        interview.subject_matter.toLowerCase().includes(filters.query.toLowerCase()) ||
        interview.era.toLowerCase().includes(filters.query.toLowerCase())
      )
    );
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE);
  const currentPageItems = filteredInterviews.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE
  );
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.era) params.set('era', filters.era);
    if (filters.type) params.set('type', filters.type);
    if (filters.available) params.set('available', filters.available);
    if (filters.query) params.set('q', filters.query);
    if (filters.page > 1) params.set('page', filters.page.toString());
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
  // Handle filter changes
  const handleFilterChange = (name: keyof InterviewsFilters, value: string | number) => {
    setFilters(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset to page 1 when filters change (except when changing page)
      ...(name !== 'page' && { page: 1 })
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      era: '',
      type: '',
      available: '',
      query: '',
      page: 1
    });
  };
  
  const handleShowDetails = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsDialogOpen(true);
  };
  
  // Function to convert YouTube URLs to embed format
  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) return null;
    
    let videoId = '';
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Playboi Carti Interviews</h1>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="era-filter" className="block text-sm font-medium mb-2">Era</label>
                <Select
                  value={filters.era}
                  onValueChange={(value) => handleFilterChange('era', value)}
                >
                  <SelectTrigger id="era-filter">
                    <SelectValue placeholder="All Eras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Eras</SelectItem>
                    {eras.map(era => (
                      <SelectItem key={era} value={era}>{era}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium mb-2">Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange('type', value)}
                >
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {interviewTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="available-filter" className="block text-sm font-medium mb-2">Availability</label>
                <Select
                  value={filters.available}
                  onValueChange={(value) => handleFilterChange('available', value)}
                >
                  <SelectTrigger id="available-filter">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="yes">Available</SelectItem>
                    <SelectItem value="no">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
                <Input
                  id="search"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Search interviews..."
                />
              </div>
              
              <div className="md:col-span-4 flex items-center gap-2 mt-2">
                <Button onClick={() => handleFilterChange('page', 1)}>Apply Filters</Button>
                {(filters.era || filters.type || filters.available || filters.query) && (
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Interviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentPageItems.length > 0 ? (
            currentPageItems.map(interview => (
              <Card key={interview.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  {interview.thumbnail ? (
                    <img src={interview.thumbnail} alt={interview.subject_matter} className="w-full h-full object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-4xl">🎤</span>
                    </div>
                  )}
                </div>
                <CardContent className="flex-grow">
                  <h5 className="text-lg font-semibold">{interview.outlet}</h5>
                  <h6 className="text-sm text-gray-500 mb-2">{interview.date}</h6>
                  <p className="text-sm mb-3">{interview.subject_matter}</p>
                  <div className="flex justify-between items-center my-2">
                    <Badge variant="default">{interview.interview_type}</Badge>
                    <Badge variant={interview.available ? "success" : "secondary"}>
                      {interview.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Era: {interview.era}</p>
                  <div className="flex justify-center space-x-2 mt-auto">
                    <Button variant="outline" size="sm" onClick={() => handleShowDetails(interview)}>Details</Button>
                    {interview.source_links && (
                      <Button variant="secondary" size="sm" asChild>
                        <a href={interview.source_links} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full p-6 text-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">No interviews found. Try changing your filters.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="my-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => filters.page > 1 && handleFilterChange('page', Number(filters.page) - 1)}
                  className={filters.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Show current page and 2 pages on either side
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= Number(filters.page) - 2 && page <= Number(filters.page) + 2)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === Number(filters.page)}
                        onClick={() => handleFilterChange('page', page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  (page === Number(filters.page) - 3 && Number(filters.page) > 3) ||
                  (page === Number(filters.page) + 3 && Number(filters.page) < totalPages - 2)
                ) {
                  return <PaginationEllipsis key={page} />;
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => filters.page < totalPages && handleFilterChange('page', Number(filters.page) + 1)}
                  className={filters.page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {/* Details Dialog */}
        {selectedInterview && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedInterview.outlet} ({selectedInterview.date})</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {selectedInterview.thumbnail ? (
                    <img src={selectedInterview.thumbnail} alt={selectedInterview.subject_matter} className="w-full rounded-md" />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md">
                      <span className="text-gray-400 text-6xl">🎤</span>
                    </div>
                  )}
                  
                  {selectedInterview.source_links && getYoutubeEmbedUrl(selectedInterview.source_links) && (
                    <div className="aspect-video w-full">
                      <iframe 
                        src={getYoutubeEmbedUrl(selectedInterview.source_links)} 
                        title="YouTube video player" 
                        className="w-full h-full rounded-md"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="text-lg font-bold mb-4">Details</h5>
                  <div className="space-y-2">
                    <p><strong>Outlet:</strong> {selectedInterview.outlet}</p>
                    <p><strong>Subject:</strong> {selectedInterview.subject_matter}</p>
                    <p><strong>Era:</strong> {selectedInterview.era}</p>
                    <p><strong>Date:</strong> {selectedInterview.date}</p>
                    <p><strong>Type:</strong> {selectedInterview.interview_type}</p>
                    <p><strong>Available:</strong> {selectedInterview.available ? "Yes" : "No"}</p>
                  </div>
                  
                  {selectedInterview.special_notes && (
                    <>
                      <h5 className="text-lg font-bold mt-4 mb-2">Notes</h5>
                      <p>{selectedInterview.special_notes}</p>
                    </>
                  )}
                  
                  <h5 className="text-lg font-bold mt-4 mb-2">Links</h5>
                  <div className="space-y-1">
                    {selectedInterview.source_links ? (
                      <p>
                        <strong>Source:</strong>{" "}
                        <a 
                          href={selectedInterview.source_links} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {selectedInterview.source_links}
                        </a>
                      </p>
                    ) : (
                      <p><strong>Source:</strong> Not available</p>
                    )}
                    
                    {selectedInterview.archived_link ? (
                      <p>
                        <strong>Archive:</strong>{" "}
                        <a 
                          href={selectedInterview.archived_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {selectedInterview.archived_link}
                        </a>
                      </p>
                    ) : (
                      <p><strong>Archive:</strong> Not available</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Interviews;
