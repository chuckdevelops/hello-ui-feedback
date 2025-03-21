
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FitPic, FitPicsFilters } from '@/types/fitpics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FitPicsFilterComponent from '@/components/fitpics/FitPicsFilters';
import FitPicGrid from '@/components/fitpics/FitPicGrid';
import FitPicDetails from '@/components/fitpics/FitPicDetails';

// Import mock data
import { fitpics } from '@/data/fitpics';

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
        
        {/* Filters Component */}
        <FitPicsFilterComponent 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        
        {/* Fit Pics Grid Component */}
        <FitPicGrid 
          fitpics={currentPageItems}
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => handleFilterChange('page', page)}
          onShowDetails={handleShowDetails}
          onImageError={handleImageError}
        />
        
        {/* Details Dialog Component */}
        <FitPicDetails 
          fitpic={selectedFitPic}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onImageError={handleImageError}
        />
      </main>
      <Footer />
    </div>
  );
};

export default FitPics;
