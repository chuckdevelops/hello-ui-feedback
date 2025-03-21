
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioProvider from '../components/AudioProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Import the new components
import SearchBar from '../components/songs/SearchBar';
import FilterToggle from '../components/songs/FilterToggle';
import FilterPanel from '../components/songs/FilterPanel';
import ActiveFilters from '../components/songs/ActiveFilters';
import SongTable from '../components/songs/SongTable';

// Import the hook and data
import { useSongFiltering } from '../hooks/useSongFiltering';
import { songs } from '../data/songs';

const SongList = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use our custom hook for filtering and sorting
  const {
    searchTerm,
    setSearchTerm,
    eraFilter,
    setEraFilter,
    typeFilter,
    setTypeFilter,
    tabFilter,
    setTabFilter,
    qualityFilter,
    setQualityFilter,
    producerFilter,
    setProducerFilter,
    featuresFilter,
    setFeaturesFilter,
    yearFilter,
    setYearFilter,
    popularityFilter,
    setPopularityFilter,
    activeFilters,
    sortField,
    sortDirection,
    isFilterExpanded,
    setIsFilterExpanded,
    uniqueEras,
    uniqueTypes,
    uniqueTabs,
    uniqueQualities,
    uniqueProducers,
    uniqueFeatures,
    uniqueYears,
    uniquePopularity,
    filteredAndSortedSongs,
    clearFilters,
    toggleFilters,
    handleSort
  } = useSongFiltering(songs);
  
  // Animation mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <AudioProvider>
      <div className={`min-h-screen flex flex-col bg-black text-white ${isMounted ? 'fade-in' : 'opacity-0'}`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h1 className="text-3xl font-bold carti-font text-glow">Song Catalog</h1>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <Badge variant="outline" className="bg-white/5 border-white/20 text-white">
                {filteredAndSortedSongs.length} Songs
              </Badge>
              {activeFilters > 0 && (
                <Badge className="bg-white text-black">
                  {activeFilters} {activeFilters === 1 ? 'Filter' : 'Filters'} Active
                </Badge>
              )}
            </div>
          </div>
          
          {/* Search bar component */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* Filters toggle component */}
          <FilterToggle isFilterExpanded={isFilterExpanded} activeFilters={activeFilters}>
            <FilterPanel 
              eraFilter={eraFilter}
              typeFilter={typeFilter}
              tabFilter={tabFilter}
              qualityFilter={qualityFilter}
              producerFilter={producerFilter}
              featuresFilter={featuresFilter}
              yearFilter={yearFilter}
              popularityFilter={popularityFilter}
              uniqueEras={uniqueEras}
              uniqueTypes={uniqueTypes}
              uniqueTabs={uniqueTabs}
              uniqueQualities={uniqueQualities}
              uniqueProducers={uniqueProducers}
              uniqueFeatures={uniqueFeatures}
              uniqueYears={uniqueYears}
              uniquePopularity={uniquePopularity}
              activeFilters={activeFilters}
              setEraFilter={setEraFilter}
              setTypeFilter={setTypeFilter}
              setTabFilter={setTabFilter}
              setQualityFilter={setQualityFilter}
              setProducerFilter={setProducerFilter}
              setFeaturesFilter={setFeaturesFilter}
              setYearFilter={setYearFilter}
              setPopularityFilter={setPopularityFilter}
              clearFilters={clearFilters}
            />
          </FilterToggle>
          
          {/* Active filters display */}
          <ActiveFilters 
            eraFilter={eraFilter}
            typeFilter={typeFilter}
            tabFilter={tabFilter}
            qualityFilter={qualityFilter}
            producerFilter={producerFilter}
            featuresFilter={featuresFilter}
            yearFilter={yearFilter}
            popularityFilter={popularityFilter}
            activeFilters={activeFilters}
            setEraFilter={setEraFilter}
            setTypeFilter={setTypeFilter}
            setTabFilter={setTabFilter}
            setQualityFilter={setQualityFilter}
            setProducerFilter={setProducerFilter}
            setFeaturesFilter={setFeaturesFilter}
            setYearFilter={setYearFilter}
            setPopularityFilter={setPopularityFilter}
            clearFilters={clearFilters}
          />
          
          {/* Songs Table */}
          <Card className="bg-black border border-white/20 text-white card-glow">
            <CardContent className="p-0">
              <SongTable 
                songs={filteredAndSortedSongs} 
                sortField={sortField} 
                sortDirection={sortDirection} 
                handleSort={handleSort} 
              />
              {filteredAndSortedSongs.length === 0 && (
                <div className="flex flex-col items-center justify-center p-10 text-center">
                  <div className="text-white/50 mb-4">No songs found matching your filters</div>
                  <Button onClick={clearFilters} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
};

export default SongList;
