
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FitPic, FitPicsFilters } from '@/types/fitpics';
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
import { fitpics, eras, picTypes, qualities } from '@/data/fitpics';

const ITEMS_PER_PAGE = 6;

const FitPics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFitPic, setSelectedFitPic] = useState<FitPic | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<FitPicsFilters>({
    era: searchParams.get('era') || '',
    type: searchParams.get('type') || '',
    quality: searchParams.get('quality') || '',
    query: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1
  });
  
  // Filter fitpics based on current filters
  const filteredFitPics = fitpics.filter(pic => {
    return (
      (filters.era === '' || pic.era === filters.era) &&
      (filters.type === '' || pic.pic_type === filters.type) &&
      (filters.quality === '' || pic.quality === filters.quality) &&
      (filters.query === '' || 
        pic.caption.toLowerCase().includes(filters.query.toLowerCase()) ||
        (pic.photographer && pic.photographer.toLowerCase().includes(filters.query.toLowerCase())) ||
        pic.era.toLowerCase().includes(filters.query.toLowerCase())
      )
    );
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredFitPics.length / ITEMS_PER_PAGE);
  const currentPageItems = filteredFitPics.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE
  );
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.era) params.set('era', filters.era);
    if (filters.type) params.set('type', filters.type);
    if (filters.quality) params.set('quality', filters.quality);
    if (filters.query) params.set('q', filters.query);
    if (filters.page > 1) params.set('page', filters.page.toString());
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
  // Handle filter changes
  const handleFilterChange = (name: keyof FitPicsFilters, value: string | number) => {
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
      quality: '',
      query: '',
      page: 1
    });
  };
  
  const handleShowDetails = (fitpic: FitPic) => {
    setSelectedFitPic(fitpic);
    setIsDialogOpen(true);
  };
  
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg'; // Use default placeholder
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Playboi Carti Fit Pics</h1>
        
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
                    {picTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="quality-filter" className="block text-sm font-medium mb-2">Quality</label>
                <Select
                  value={filters.quality}
                  onValueChange={(value) => handleFilterChange('quality', value)}
                >
                  <SelectTrigger id="quality-filter">
                    <SelectValue placeholder="All Qualities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Qualities</SelectItem>
                    {qualities.map(quality => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
                <Input
                  id="search"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Search fit pics..."
                />
              </div>
              
              <div className="md:col-span-4 flex items-center gap-2 mt-2">
                <Button onClick={() => handleFilterChange('page', 1)}>Apply Filters</Button>
                {(filters.era || filters.type || filters.quality || filters.query) && (
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Fit Pics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentPageItems.length > 0 ? (
            currentPageItems.map(fitpic => (
              <Card key={fitpic.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-64 overflow-hidden">
                  {fitpic.thumbnail ? (
                    <img 
                      src={fitpic.thumbnail} 
                      alt={fitpic.caption} 
                      className="w-full h-full object-cover"
                      onError={handleImageError} 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-4xl">👕</span>
                    </div>
                  )}
                </div>
                <CardContent className="flex-grow">
                  <h5 className="text-lg font-semibold">{fitpic.caption || "Fit Pic"}</h5>
                  <h6 className="text-sm text-gray-500 mb-2">{fitpic.release_date}</h6>
                  {fitpic.photographer && (
                    <p className="text-sm">📸: {fitpic.photographer}</p>
                  )}
                  <div className="flex justify-between items-center my-2">
                    <Badge variant="default">{fitpic.pic_type}</Badge>
                    <Badge variant="secondary">{fitpic.quality}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Era: {fitpic.era}</p>
                  <div className="flex justify-center space-x-2 mt-auto">
                    <Button variant="outline" size="sm" onClick={() => handleShowDetails(fitpic)}>Details</Button>
                    {fitpic.source_links.length > 0 && (
                      <Button variant="secondary" size="sm" asChild>
                        <a href={fitpic.source_links[0]} target="_blank" rel="noopener noreferrer">View Source</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full p-6 text-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">No fit pics found. Try changing your filters.</p>
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
        {selectedFitPic && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedFitPic.caption || "Fit Pic"} ({selectedFitPic.release_date})</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {selectedFitPic.thumbnail ? (
                    <img 
                      src={selectedFitPic.thumbnail} 
                      alt={selectedFitPic.caption} 
                      className="w-full rounded-md"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md">
                      <span className="text-gray-400 text-6xl">👕</span>
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="text-lg font-bold mb-4">Details</h5>
                  <div className="space-y-2">
                    <p><strong>Caption:</strong> {selectedFitPic.caption || "N/A"}</p>
                    <p><strong>Era:</strong> {selectedFitPic.era}</p>
                    <p><strong>Date:</strong> {selectedFitPic.release_date}</p>
                    <p><strong>Type:</strong> {selectedFitPic.pic_type}</p>
                    <p><strong>Portion:</strong> {selectedFitPic.portion}</p>
                    <p><strong>Quality:</strong> {selectedFitPic.quality}</p>
                    <p><strong>Photographer:</strong> {selectedFitPic.photographer || "Unknown"}</p>
                  </div>
                  
                  {selectedFitPic.notes && (
                    <>
                      <h5 className="text-lg font-bold mt-4 mb-2">Notes</h5>
                      <p>{selectedFitPic.notes}</p>
                    </>
                  )}
                  
                  <h5 className="text-lg font-bold mt-4 mb-2">Links</h5>
                  {selectedFitPic.source_links.length > 0 ? (
                    <div className="space-y-1">
                      {selectedFitPic.source_links.map((link, index) => (
                        <p key={index}>
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {link}
                          </a>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p>No links available</p>
                  )}
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

export default FitPics;
