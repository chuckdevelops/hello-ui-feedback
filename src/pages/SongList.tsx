
import React, { useState } from 'react';
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
  
  // Get unique eras and types for filters
  const uniqueEras = Array.from(new Set(songs.map(song => song.era)));
  const uniqueTypes = Array.from(new Set(songs.map(song => song.type)));
  
  // Filter songs based on search term and filters
  const filteredSongs = songs.filter(song => {
    const matchSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (song.era && song.era.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchEra = eraFilter === '' || song.era === eraFilter;
    const matchType = typeFilter === '' || song.type === typeFilter;
    
    return matchSearch && matchEra && matchType;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setEraFilter('');
    setTypeFilter('');
  };
  
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 carti-font">Song Catalog</h1>
          
          {/* Filters */}
          <Card className="mb-6 bg-black border border-white/20 text-white">
            <CardHeader>
              <h2 className="text-xl font-semibold text-white">Filters</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium mb-1 text-white">
                    Search
                  </label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or era..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/80 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
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
                
                <div className="flex items-end">
                  <Button onClick={clearFilters} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Songs Table */}
          <Card className="bg-black border border-white/20 text-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-black">
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Era</TableHead>
                    <TableHead className="text-white">Sheet Tab</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Quality</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSongs.map(song => (
                    <TableRow key={song.id} className="hover:bg-white/5 border-white/20">
                      <TableCell>
                        <Link to={`/coming-soon?song=${song.id}`} className="text-white hover:text-white/80 transition-colors">
                          {song.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-white">
                        {song.era || <em className="text-white/50">Unknown</em>}
                      </TableCell>
                      <TableCell>
                        {song.primary_tab_name && song.primary_tab_name !== "Unknown" ? (
                          <>
                            <span className="text-white">{song.primary_tab_name}</span>
                            {song.subsection_name && (
                              <small className="text-white/70 ml-1">({song.subsection_name})</small>
                            )}
                          </>
                        ) : (
                          <em className="text-white/50">Unknown</em>
                        )}
                      </TableCell>
                      <TableCell className="text-white">{formatType(song.type)}</TableCell>
                      <TableCell className="text-white">{song.quality}</TableCell>
                      <TableCell className="text-white">{song.leak_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
};

export default SongList;
