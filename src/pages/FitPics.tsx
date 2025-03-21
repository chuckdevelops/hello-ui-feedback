
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FitPic, FitPicsFilters } from '@/types/fitpics';
import { getFilteredFitPics, getUniqueEras, getUniquePicTypes, getUniqueQualities } from '@/data/fitpics';

const FitPics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FitPicsFilters>({
    era: searchParams.get('era') || '',
    type: searchParams.get('type') || '',
    quality: searchParams.get('quality') || '',
    query: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1
  });
  
  const [fitPics, setFitPics] = useState<FitPic[]>([]);
  const [selectedFitPic, setSelectedFitPic] = useState<FitPic | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Constants for filter options
  const eras = getUniqueEras();
  const picTypes = getUniquePicTypes();
  const qualities = getUniqueQualities();
  
  // Constants for pagination
  const itemsPerPage = 6;
  const totalItems = getFilteredFitPics({
    era: filters.era,
    type: filters.type,
    quality: filters.quality,
    query: filters.query
  }).length;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  useEffect(() => {
    // Apply filters and pagination
    const filteredData = getFilteredFitPics({
      era: filters.era,
      type: filters.type,
      quality: filters.quality,
      query: filters.query
    });
    
    // Calculate pagination
    const startIndex = (filters.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    setFitPics(filteredData.slice(startIndex, endIndex));
  }, [filters]);
  
  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (filters.era) params.set('era', filters.era);
    if (filters.type) params.set('type', filters.type);
    if (filters.quality) params.set('quality', filters.quality);
    if (filters.query) params.set('q', filters.query);
    if (filters.page > 1) params.set('page', filters.page.toString());
    
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
  const handleFilterChange = (filterKey: keyof FitPicsFilters, value: string | number) => {
    setFilters({ ...filters, [filterKey]: value, page: filterKey === 'page' ? value : 1 });
  };
  
  const handleClearFilters = () => {
    setFilters({
      era: '',
      type: '',
      quality: '',
      query: '',
      page: 1
    });
  };
  
  const openDetailDialog = (fitPic: FitPic) => {
    setSelectedFitPic(fitPic);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 carti-font text-center">PLAYBOI CARTI FIT PICS</h1>
        
        {/* Filters Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="era-filter">Era</Label>
                <Select
                  value={filters.era}
                  onValueChange={(value) => handleFilterChange('era', value)}
                >
                  <SelectTrigger id="era-filter">
                    <SelectValue placeholder="All Eras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Eras</SelectItem>
                    {eras.map((era) => (
                      <SelectItem key={era} value={era}>{era}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange('type', value)}
                >
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {picTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quality-filter">Quality</Label>
                <Select
                  value={filters.quality}
                  onValueChange={(value) => handleFilterChange('quality', value)}
                >
                  <SelectTrigger id="quality-filter">
                    <SelectValue placeholder="All Qualities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Qualities</SelectItem>
                    {qualities.map((quality) => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="flex items-center">
                  <Input
                    id="search"
                    placeholder="Search fit pics..."
                    value={filters.query}
                    onChange={(e) => handleFilterChange('query', e.target.value)}
                    className="w-full"
                  />
                  <Search className="ml-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              {(filters.era || filters.type || filters.quality || filters.query) && (
                <Button variant="outline" onClick={handleClearFilters}>
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Fit Pics Grid */}
        {fitPics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {fitPics.map((fitPic) => (
              <Card key={fitPic.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-[300px] overflow-hidden">
                  {fitPic.thumbnail ? (
                    <img 
                      src={fitPic.thumbnail} 
                      alt={fitPic.caption} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  )}
                </div>
                <CardContent className="flex-grow py-4">
                  <h3 className="text-lg font-semibold mb-1">{fitPic.caption || "Fit Pic"}</h3>
                  <h4 className="text-sm text-gray-500 mb-2">{fitPic.release_date}</h4>
                  {fitPic.photographer && (
                    <p className="text-sm mb-2">📸: {fitPic.photographer}</p>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="default">{fitPic.pic_type}</Badge>
                    <Badge variant="secondary">{fitPic.quality}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">Era: {fitPic.era}</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-0 pb-4">
                  <Button variant="outline" size="sm" onClick={() => openDetailDialog(fitPic)}>
                    Details
                  </Button>
                  {fitPic.source_links.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={fitPic.source_links[0]} target="_blank" rel="noopener noreferrer">
                        View Source
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
            No fit pics found. Try changing your filters.
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (filters.page > 1) {
                      handleFilterChange('page', filters.page - 1);
                    }
                  }}
                  className={filters.page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show only current page, first, last, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= filters.page - 1 && pageNumber <= filters.page + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleFilterChange('page', pageNumber);
                        }}
                        isActive={pageNumber === filters.page}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  (pageNumber === 2 && filters.page > 3) ||
                  (pageNumber === totalPages - 1 && filters.page < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (filters.page < totalPages) {
                      handleFilterChange('page', filters.page + 1);
                    }
                  }}
                  className={filters.page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {selectedFitPic && (
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedFitPic.caption || "Fit Pic"} ({selectedFitPic.release_date})
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {selectedFitPic.thumbnail ? (
                    <img 
                      src={selectedFitPic.thumbnail} 
                      alt={selectedFitPic.caption} 
                      className="w-full rounded-md"
                    />
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Caption:</span> {selectedFitPic.caption || "N/A"}</p>
                    <p><span className="font-medium">Era:</span> {selectedFitPic.era}</p>
                    <p><span className="font-medium">Date:</span> {selectedFitPic.release_date}</p>
                    <p><span className="font-medium">Type:</span> {selectedFitPic.pic_type}</p>
                    <p><span className="font-medium">Portion:</span> {selectedFitPic.portion}</p>
                    <p><span className="font-medium">Quality:</span> {selectedFitPic.quality}</p>
                    <p><span className="font-medium">Photographer:</span> {selectedFitPic.photographer || "Unknown"}</p>
                  </div>
                  
                  {selectedFitPic.notes && (
                    <>
                      <h3 className="text-lg font-medium mt-4 mb-2">Notes</h3>
                      <p className="text-gray-700">{selectedFitPic.notes}</p>
                    </>
                  )}
                  
                  <h3 className="text-lg font-medium mt-4 mb-2">Links</h3>
                  {selectedFitPic.source_links.length > 0 ? (
                    <div className="space-y-1">
                      {selectedFitPic.source_links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline block text-sm overflow-hidden text-ellipsis"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No links available</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default FitPics;
