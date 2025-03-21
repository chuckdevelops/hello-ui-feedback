
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
import { Search, Filter, Volume2, Calendar, Disc, Info } from 'lucide-react';

// Mock data for songs - in a real app, this would come from your data source
const songs = [
  { id: 1, name: "HOMIXIDE", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 2, name: "BACKR00MS (ft. Travis Scott)", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 3, name: "KING BOB", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 4, name: "H00DBYAIR", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 5, name: "I'M SO CRAZY", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "Studio Session", quality: "256kbps", leak_date: "November 27, 2023" },
  { id: 6, name: "XTCY", era: "Die Lit", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "CDQ", quality: "320kbps", leak_date: "October 15, 2023" },
  { id: 7, name: "PLACE", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020" },
  { id: 8, name: "SKY", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020" },
  { id: 9, name: "MOLLY", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "September 5, 2022" },
  { id: 10, name: "CANCUN", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "July 12, 2022" }
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
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Get unique values for filters
  const uniqueEras = Array.from(new Set(songs.map(song => song.era)));
  const uniqueTypes = Array.from(new Set(songs.map(song => song.type)));
  const uniqueTabs = Array.from(new Set(songs.map(song => song.primary_tab_name))).filter(Boolean);
  const uniqueQualities = Array.from(new Set(songs.map(song => song.quality))).filter(Boolean);
  
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
    setActiveFilters(count);
  }, [eraFilter, typeFilter, tabFilter, qualityFilter]);
  
  // Filter songs based on search term and filters
  const filteredSongs = songs.filter(song => {
    const matchSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (song.era && song.era.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchEra = eraFilter === '' || song.era === eraFilter;
    const matchType = typeFilter === '' || song.type === typeFilter;
    const matchTab = tabFilter === '' || song.primary_tab_name === tabFilter;
    const matchQuality = qualityFilter === '' || song.quality === qualityFilter;
    
    return matchSearch && matchEra && matchType && matchTab && matchQuality;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setEraFilter('');
    setTypeFilter('');
    setTabFilter('');
    setQualityFilter('');
    setIsFilterExpanded(false);
  };
  
  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded);
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
                {filteredSongs.length} Songs
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
              placeholder="Search by song name or era..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/80 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
          
          {/* Filter toggle button */}
          <div className="mb-4">
            <Button 
              onClick={toggleFilters} 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
              {activeFilters > 0 && (
                <Badge className="ml-2 bg-white text-black">{activeFilters}</Badge>
              )}
            </Button>
          </div>
          
          {/* Filters */}
          {isFilterExpanded && (
            <Card className="mb-6 bg-black border border-white/20 text-white scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Advanced Filters</h2>
                  {activeFilters > 0 && (
                    <Button onClick={clearFilters} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="era" className="block text-sm font-medium mb-1 text-white">
                      Era
                    </label>
                    <select
                      id="era"
                      className="w-full p-2 rounded-md bg-black border border-white/20 text-white"
                      value={eraFilter}
                      onChange={(e) => setEraFilter(e.target.value)}
                    >
                      <option value="">All Eras</option>
                      {uniqueEras.map(era => (
                        <option key={era} value={era}>{era}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-1 text-white">
                      Type
                    </label>
                    <select
                      id="type"
                      className="w-full p-2 rounded-md bg-black border border-white/20 text-white"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      {uniqueTypes.map(type => (
                        <option key={type} value={type}>{formatType(type)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tab" className="block text-sm font-medium mb-1 text-white">
                      Sheet Tab
                    </label>
                    <select
                      id="tab"
                      className="w-full p-2 rounded-md bg-black border border-white/20 text-white"
                      value={tabFilter}
                      onChange={(e) => setTabFilter(e.target.value)}
                    >
                      <option value="">All Tabs</option>
                      {uniqueTabs.map(tab => (
                        <option key={tab} value={tab}>{tab}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="quality" className="block text-sm font-medium mb-1 text-white">
                      Quality
                    </label>
                    <select
                      id="quality"
                      className="w-full p-2 rounded-md bg-black border border-white/20 text-white"
                      value={qualityFilter}
                      onChange={(e) => setQualityFilter(e.target.value)}
                    >
                      <option value="">All Qualities</option>
                      {uniqueQualities.map(quality => (
                        <option key={quality} value={quality}>{quality}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Songs Table */}
          <Card className="bg-black border border-white/20 text-white card-glow">
            <CardContent className="p-0">
              {filteredSongs.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-black/60">
                      <TableRow className="border-white/20">
                        <TableHead className="text-white">
                          <div className="flex items-center">
                            <span>Name</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden md:table-cell">
                          <div className="flex items-center">
                            <Disc className="mr-1 h-4 w-4" />
                            <span>Era</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden md:table-cell">
                          <div className="flex items-center">
                            <Info className="mr-1 h-4 w-4" />
                            <span>Sheet Tab</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden sm:table-cell">
                          <div className="flex items-center">
                            <Volume2 className="mr-1 h-4 w-4" />
                            <span>Type</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-white hidden lg:table-cell">Quality</TableHead>
                        <TableHead className="text-white hidden sm:table-cell">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>Date</span>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSongs.map((song, index) => (
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
                                {song.era || <em className="text-white/50">Unknown</em>}
                              </div>
                              <div className="text-xs text-white/70">
                                {formatType(song.type)} • {song.quality}
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
