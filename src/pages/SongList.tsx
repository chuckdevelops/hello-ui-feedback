
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioProvider from '../components/AudioProvider';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Volume2, 
  Calendar, 
  Disc, 
  Info, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Star,
  Music,
  FilterX,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for songs - in a real app, this would come from your data source
const songs = [
  { id: 1, name: "HOMIXIDE", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "F1LTHY", features: null, year: "2023", popularity: "High" },
  { id: 2, name: "BACKR00MS (ft. Travis Scott)", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "Wheezy", features: "Travis Scott", year: "2023", popularity: "High" },
  { id: 3, name: "KING BOB", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "F1LTHY", features: null, year: "2023", popularity: "Medium" },
  { id: 4, name: "H00DBYAIR", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "Art Dealer", features: null, year: "2023", popularity: "Medium" },
  { id: 5, name: "I'M SO CRAZY", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "Studio Session", quality: "256kbps", leak_date: "November 27, 2023", producer: "Pi'erre Bourne", features: null, year: "2019", popularity: "High" },
  { id: 6, name: "XTCY", era: "Die Lit", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "CDQ", quality: "320kbps", leak_date: "October 15, 2023", producer: "Pi'erre Bourne", features: null, year: "2018", popularity: "Medium" },
  { id: 7, name: "PLACE", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "Art Dealer", features: null, year: "2020", popularity: "High" },
  { id: 8, name: "SKY", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "Art Dealer", features: null, year: "2020", popularity: "High" },
  { id: 9, name: "MOLLY", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "September 5, 2022", producer: "RonaBeats", features: null, year: "2019", popularity: "High" },
  { id: 10, name: "CANCUN", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "July 12, 2022", producer: "Richie Souf", features: null, year: "2019", popularity: "High" },
  { id: 11, name: "MONEY & DRUGS", era: "WLR V2", primary_tab_name: "🏆 Grails", subsection_name: null, type: "Snippet", quality: "128kbps", leak_date: "January 5, 2023", producer: "Jetson", features: "Post Malone", year: "2020", popularity: "Medium" },
  { id: 12, name: "PISSY PAMPER (ft. Young Nudy)", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "April 18, 2021", producer: "Pi'erre Bourne", features: "Young Nudy", year: "2019", popularity: "High" },
  { id: 13, name: "FELL IN LUV (ft. Bryson Tiller)", era: "Die Lit", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "May 11, 2018", producer: "Pi'erre Bourne", features: "Bryson Tiller", year: "2018", popularity: "Medium" },
  { id: 14, name: "FASHION KILLA", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "LQ", quality: "96kbps", leak_date: "March 12, 2022", producer: "F1LTHY", features: null, year: "2019", popularity: "Low" },
  { id: 15, name: "ROCKSTAR MADE", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "F1LTHY", features: null, year: "2020", popularity: "High" }
];

// Format song type for display
const formatType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'cdq':
      return 'CDQ';
    case 'lq':
      return 'LQ';
    case 'studio session':
      return 'Studio Session';
    case 'snippet':
      return 'Snippet';
    default:
      return type;
  }
};

const SongList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [tabFilter, setTabFilter] = useState('');
  const [qualityFilter, setQualityFilter] = useState('');
  const [producerFilter, setProducerFilter] = useState('');
  const [featuresFilter, setFeaturesFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [popularityFilter, setPopularityFilter] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isMounted, setIsMounted] = useState(false);
  
  // Get unique values for filters
  const uniqueEras = Array.from(new Set(songs.map(song => song.era))).sort();
  const uniqueTypes = Array.from(new Set(songs.map(song => song.type))).sort();
  const uniqueTabs = Array.from(new Set(songs.map(song => song.primary_tab_name))).filter(Boolean).sort();
  const uniqueQualities = Array.from(new Set(songs.map(song => song.quality))).filter(Boolean).sort();
  const uniqueProducers = Array.from(new Set(songs.map(song => song.producer))).filter(Boolean).sort();
  const uniqueFeatures = Array.from(new Set(songs.map(song => song.features))).filter(Boolean).sort();
  const uniqueYears = Array.from(new Set(songs.map(song => song.year))).filter(Boolean).sort();
  const uniquePopularity = Array.from(new Set(songs.map(song => song.popularity))).filter(Boolean).sort();
  
  // Animation mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
      const matchFeatures = featuresFilter === '' || song.features === featuresFilter;
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

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />;
  };
  
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
          
          {/* Search bar - always visible */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/50" />
            </div>
            <Input
              type="text"
              placeholder="Search by song name, era, producer, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/80 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
          
          {/* Filters toggle */}
          <Collapsible className="space-y-2 mb-6">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
              >
                {isFilterExpanded ? <FilterX className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
                {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
                {activeFilters > 0 && (
                  <Badge className="ml-2 bg-white text-black">{activeFilters}</Badge>
                )}
                {isFilterExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-2">
              <Card className="bg-black border border-white/20 text-white scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Filters</h2>
                    {activeFilters > 0 && (
                      <Button onClick={clearFilters} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <FilterX className="mr-2 h-4 w-4" />
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Era Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="era-filter" className="flex items-center">
                        <Disc className="mr-2 h-4 w-4" />
                        Era
                      </Label>
                      <Select value={eraFilter} onValueChange={setEraFilter}>
                        <SelectTrigger id="era-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Eras" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Eras</SelectItem>
                          {uniqueEras.map(era => (
                            <SelectItem key={era} value={era}>{era}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Type Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="type-filter" className="flex items-center">
                        <Volume2 className="mr-2 h-4 w-4" />
                        Type
                      </Label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger id="type-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Types</SelectItem>
                          {uniqueTypes.map(type => (
                            <SelectItem key={type} value={type}>{formatType(type)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sheet Tab Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="tab-filter" className="flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        Sheet Tab
                      </Label>
                      <Select value={tabFilter} onValueChange={setTabFilter}>
                        <SelectTrigger id="tab-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Tabs" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Tabs</SelectItem>
                          {uniqueTabs.map(tab => (
                            <SelectItem key={tab} value={tab}>{tab}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Quality Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="quality-filter" className="flex items-center">
                        <Music className="mr-2 h-4 w-4" />
                        Quality
                      </Label>
                      <Select value={qualityFilter} onValueChange={setQualityFilter}>
                        <SelectTrigger id="quality-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Qualities" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Qualities</SelectItem>
                          {uniqueQualities.map(quality => (
                            <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Producer Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="producer-filter" className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        Producer
                      </Label>
                      <Select value={producerFilter} onValueChange={setProducerFilter}>
                        <SelectTrigger id="producer-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Producers" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Producers</SelectItem>
                          {uniqueProducers.map(producer => (
                            <SelectItem key={producer} value={producer}>{producer}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Features Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="features-filter" className="flex items-center">
                        <Star className="mr-2 h-4 w-4" />
                        Features
                      </Label>
                      <Select value={featuresFilter} onValueChange={setFeaturesFilter}>
                        <SelectTrigger id="features-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Features" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Features</SelectItem>
                          <SelectItem value="null">No Features</SelectItem>
                          {uniqueFeatures.map(feature => (
                            <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Year Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="year-filter" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Year
                      </Label>
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger id="year-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Years" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Years</SelectItem>
                          {uniqueYears.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Popularity Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="popularity-filter" className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Popularity
                      </Label>
                      <Select value={popularityFilter} onValueChange={setPopularityFilter}>
                        <SelectTrigger id="popularity-filter" className="bg-black border-white/20 text-white">
                          <SelectValue placeholder="All Popularity Levels" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20 text-white">
                          <SelectItem value="">All Popularity Levels</SelectItem>
                          {uniquePopularity.map(pop => (
                            <SelectItem key={pop} value={pop}>{pop}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Active Filters Display */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {eraFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Era: {eraFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setEraFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {typeFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Type: {typeFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setTypeFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {tabFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Tab: {tabFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setTabFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {qualityFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Quality: {qualityFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setQualityFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {producerFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Producer: {producerFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setProducerFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {featuresFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Features: {featuresFilter === "null" ? "None" : featuresFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setFeaturesFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {yearFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Year: {yearFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setYearFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {popularityFilter && (
                <Badge className="bg-white/10 text-white hover:bg-white/15 flex items-center gap-1 pr-1">
                  <span>Popularity: {popularityFilter}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 hover:bg-white/20 rounded-full"
                    onClick={() => setPopularityFilter('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {activeFilters > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 text-xs h-7"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
          )}
          
          {/* Songs Table */}
          <Card className="bg-black border border-white/20 text-white card-glow">
            <CardContent className="p-0">
              {filteredAndSortedSongs.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-black/60">
                      <TableRow className="border-white/20">
                        <TableHead className="text-white cursor-pointer" onClick={() => handleSort('name')}>
                          <div className="flex items-center">
                            <span>Name</span>
                            {getSortIcon('name')}
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden md:table-cell cursor-pointer" onClick={() => handleSort('era')}>
                          <div className="flex items-center">
                            <Disc className="mr-1 h-4 w-4" />
                            <span>Era</span>
                            {getSortIcon('era')}
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden md:table-cell">
                          <div className="flex items-center">
                            <Info className="mr-1 h-4 w-4" />
                            <span>Sheet Tab</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden sm:table-cell cursor-pointer" onClick={() => handleSort('type')}>
                          <div className="flex items-center">
                            <Volume2 className="mr-1 h-4 w-4" />
                            <span>Type</span>
                            {getSortIcon('type')}
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden lg:table-cell">Quality</TableHead>
                        <TableHead className="text-white hidden md:table-cell cursor-pointer" onClick={() => handleSort('producer')}>
                          <div className="flex items-center">
                            <Tag className="mr-1 h-4 w-4" />
                            <span>Producer</span>
                            {getSortIcon('producer')}
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden lg:table-cell cursor-pointer" onClick={() => handleSort('year')}>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>Year</span>
                            {getSortIcon('year')}
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden sm:table-cell cursor-pointer" onClick={() => handleSort('leak_date')}>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Leak Date</span>
                            {getSortIcon('leak_date')}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedSongs.map((song, index) => (
                        <TableRow 
                          key={song.id} 
                          className={`hover-scale hover:bg-white/5 border-white/20 transition-all`}
                        >
                          <TableCell>
                            <Link to={`/coming-soon?song=${song.id}`} className="text-white hover:text-white/80 transition-colors font-medium">
                              {song.name}
                            </Link>
                            <div className="md:hidden mt-1 space-y-1">
                              <div className="text-xs text-white/70">
                                {song.era || <em className="text-white/50">Unknown Era</em>}
                                {song.producer && <span> • {song.producer}</span>}
                              </div>
                              <div className="text-xs text-white/70">
                                {formatType(song.type)} • {song.quality}
                                {song.features && <span> • ft. {song.features}</span>}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/90 hidden md:table-cell">
                            {song.era ? (
                              <Badge variant="outline" className="bg-black/60 border-white/20">
                                {song.era}
                              </Badge>
                            ) : (
                              <em className="text-white/50">Unknown</em>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {song.primary_tab_name && song.primary_tab_name !== "Unknown" ? (
                              <div>
                                <span className="text-white">{song.primary_tab_name}</span>
                                {song.subsection_name && (
                                  <div>
                                    <small className="text-white/70">{song.subsection_name}</small>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <em className="text-white/50">Unknown</em>
                            )}
                          </TableCell>
                          <TableCell className="text-white/90 hidden sm:table-cell">
                            <Badge className="bg-white/10 text-white hover:bg-white/15">
                              {formatType(song.type)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white/90 hidden lg:table-cell">{song.quality}</TableCell>
                          <TableCell className="text-white/90 hidden md:table-cell">
                            {song.producer || <em className="text-white/50">Unknown</em>}
                          </TableCell>
                          <TableCell className="text-white/90 hidden lg:table-cell">
                            {song.year || <em className="text-white/50">Unknown</em>}
                          </TableCell>
                          <TableCell className="text-white/90 hidden sm:table-cell">{song.leak_date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
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
