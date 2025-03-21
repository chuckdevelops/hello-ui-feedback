
import { useState, useEffect } from 'react';

interface Song {
  id: number;
  name: string;
  era: string;
  primary_tab_name: string;
  subsection_name: string | null;
  type: string;
  quality: string;
  leak_date: string;
  producer: string | null;
  features: string | null;
  year: string;
  popularity: string;
}

export const useSongFiltering = (songs: Song[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [tabFilter, setTabFilter] = useState('');
  const [qualityFilter, setQualityFilter] = useState('');
  const [producerFilter, setProducerFilter] = useState('');
  const [featuresFilter, setFeaturesFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [popularityFilter, setPopularityFilter] = useState('');
  const [activeFilters, setActiveFilters] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Get unique values for filters
  const uniqueEras = Array.from(new Set(songs.map(song => song.era))).sort();
  const uniqueTypes = Array.from(new Set(songs.map(song => song.type))).sort();
  const uniqueTabs = Array.from(new Set(songs.map(song => song.primary_tab_name))).filter(Boolean).sort();
  const uniqueQualities = Array.from(new Set(songs.map(song => song.quality))).filter(Boolean).sort();
  const uniqueProducers = Array.from(new Set(songs.map(song => song.producer))).filter(Boolean).sort();
  const uniqueFeatures = Array.from(new Set(songs.map(song => song.features))).filter(Boolean).sort();
  const uniqueYears = Array.from(new Set(songs.map(song => song.year))).filter(Boolean).sort();
  const uniquePopularity = Array.from(new Set(songs.map(song => song.popularity))).filter(Boolean).sort();
  
  // Count active filters
  useEffect(() => {
    let count = 0;
    if (eraFilter) count++;
    if (typeFilter) count++;
    if (tabFilter) count++;
    if (qualityFilter) count++;
    if (producerFilter) count++;
    if (featuresFilter) count++;
    if (yearFilter) count++;
    if (popularityFilter) count++;
    setActiveFilters(count);
  }, [eraFilter, typeFilter, tabFilter, qualityFilter, producerFilter, featuresFilter, yearFilter, popularityFilter]);
  
  // Filter and sort songs
  const filteredAndSortedSongs = songs
    .filter(song => {
      const matchSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (song.era && song.era.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (song.features && song.features.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (song.producer && song.producer.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchEra = eraFilter === '' || song.era === eraFilter;
      const matchType = typeFilter === '' || song.type === typeFilter;
      const matchTab = tabFilter === '' || song.primary_tab_name === tabFilter;
      const matchQuality = qualityFilter === '' || song.quality === qualityFilter;
      const matchProducer = producerFilter === '' || song.producer === producerFilter;
      const matchFeatures = featuresFilter === '' || 
                          (featuresFilter === 'null' && !song.features) || 
                          song.features === featuresFilter;
      const matchYear = yearFilter === '' || song.year === yearFilter;
      const matchPopularity = popularityFilter === '' || song.popularity === popularityFilter;
      
      return matchSearch && matchEra && matchType && matchTab && matchQuality && 
             matchProducer && matchFeatures && matchYear && matchPopularity;
    })
    .sort((a, b) => {
      let valueA, valueB;
      
      // Handle different field types
      switch(sortField) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'era':
          valueA = a.era ? a.era.toLowerCase() : '';
          valueB = b.era ? b.era.toLowerCase() : '';
          break;
        case 'leak_date':
          valueA = a.leak_date ? a.leak_date : '';
          valueB = b.leak_date ? b.leak_date : '';
          break;
        case 'type':
          valueA = a.type ? a.type.toLowerCase() : '';
          valueB = b.type ? b.type.toLowerCase() : '';
          break;
        case 'producer':
          valueA = a.producer ? a.producer.toLowerCase() : '';
          valueB = b.producer ? b.producer.toLowerCase() : '';
          break;
        case 'year':
          valueA = a.year ? a.year : '';
          valueB = b.year ? b.year : '';
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }
      
      // Compare the values based on sort direction
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const clearFilters = () => {
    setSearchTerm('');
    setEraFilter('');
    setTypeFilter('');
    setTabFilter('');
    setQualityFilter('');
    setProducerFilter('');
    setFeaturesFilter('');
    setYearFilter('');
    setPopularityFilter('');
  };
  
  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
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
  };
};
