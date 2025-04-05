
import React from 'react';
import { Link } from 'react-router-dom';
import AudioProvider from '../components/AudioProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { albums } from '@/data/albums';
import { ArrowRight, Play, Calendar, Music, Clock, Headphones, Award } from 'lucide-react';
import AlbumGrid from '../components/AlbumGrid';

// Mock data for recent songs
const recentSongs = [
  { id: 1, name: "HOMIXIDE", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 2, name: "BACKR00MS (ft. Travis Scott)", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 3, name: "KING BOB", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 4, name: "H00DBYAIR", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 5, name: "I'M SO CRAZY", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "Studio Session", quality: "256kbps", leak_date: "November 27, 2023" }
];

// Timeline for Carti's career
const careerTimeline = [
  { year: 2015, event: "First SoundCloud releases", description: "Began gaining attention on SoundCloud with tracks like 'Broke Boi'" },
  { year: 2017, event: "Self-titled debut album", description: "Released 'Playboi Carti' featuring 'Magnolia' and 'wokeuplikethis*'" },
  { year: 2018, event: "Die Lit", description: "Released sophomore album 'Die Lit' featuring 'Shoota' and 'Love Hurts'" },
  { year: 2020, event: "Whole Lotta Red", description: "Released highly anticipated album 'Whole Lotta Red' on Christmas Day" },
  { year: 2023, event: "New leaks and snippets", description: "Several unreleased tracks leaked while fans await new official music" }
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

const Index = () => {
  // Count distinct eras
  const uniqueEras = new Set(albums.map(album => album.year.toString()));
  const eraCount = uniqueEras.size;
  
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-8 fade-in">
          {/* Hero Section with Album Artwork */}
          <div className="glass rounded-lg p-8 mb-12 mx-auto max-w-4xl scale-in">
            <h1 className="text-4xl font-bold mb-4 carti-font text-center text-glow">PLAYBOI CARTI MUSIC CATALOG</h1>
            <p className="text-center text-white/70 mb-6 max-w-xl mx-auto">
              Your comprehensive resource for Playboi Carti's entire discography.
            </p>
            
            {/* Album Art Showcase */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {albums.slice(0, 3).map((album, index) => (
                <div key={album.id} className="relative group">
                  <img 
                    src={album.artwork} 
                    alt={album.title} 
                    className={`w-24 h-24 sm:w-32 sm:h-32 object-cover rounded transition-all duration-300 
                    ${index === 1 ? 'scale-110 z-10 shadow-lg' : 'group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
            
            <hr className="my-6 border-white/10" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-black/40 border border-white/10 text-white card-glow">
                <CardContent className="text-center py-8 flex flex-col items-center">
                  <h2 className="text-4xl font-bold text-white">{recentSongs.length}</h2>
                  <p className="text-white/60">Total Songs & Videos</p>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border border-white/10 text-white card-glow">
                <CardContent className="text-center py-8 flex flex-col items-center">
                  <h2 className="text-4xl font-bold text-white">{eraCount}</h2>
                  <p className="text-white/60">Distinct Eras</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 hover-scale">
                <Link to="/songs" className="flex items-center">
                  Browse Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Career Timeline */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 carti-font text-center">CAREER TIMELINE</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 h-full w-px bg-white/20 transform md:translate-x-0"></div>
              
              {/* Timeline events */}
              <div className="space-y-8">
                {careerTimeline.map((item, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2 pb-8">
                      <div className={`bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-4 mx-4 ${index % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'} card-glow`}>
                        <div className="flex items-center mb-2">
                          <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                          <span className="text-xl font-semibold text-purple-400">{item.year}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{item.event}</h3>
                        <p className="text-sm text-white/70">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bg-purple-400 p-1 rounded-full border-4 border-black z-10">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Recently Leaked */}
            <div className="lg:col-span-4">
              <Card className="bg-black/40 border border-white/10 text-white h-full card-glow">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-purple-400" /> Recently Leaked
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {recentSongs.slice(0, 5).map(song => (
                      <Link 
                        key={song.id}
                        to={`/songs/${song.id}`}
                        className="block p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center">
                          <Music className="h-4 w-4 mr-2 flex-shrink-0 text-purple-400" />
                          <span>{song.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sheet Tab Overview */}
            <div className="lg:col-span-8">
              <Card className="bg-black/40 border border-white/10 text-white h-full card-glow">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <Headphones className="mr-2 h-5 w-5 text-purple-400" /> Sheet Tab Overview
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-white/70 mb-4">Songs are organized into various sheet tabs based on their categorization:</p>
                  <div className="space-y-2">
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      🏆 Grails - Top tier unreleased songs
                    </div>
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      🥇 Wanted - Highly anticipated leaks
                    </div>
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      ⭐ Best Of - High quality tracks
                    </div>
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      ✨ Special - Noteworthy tracks
                    </div>
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      Released - Official releases
                    </div>
                    <div className="p-3 border border-white/10 rounded-md bg-white/5">
                      Unreleased - Unreleased songs
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Top Albums Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 carti-font text-center flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-purple-400" /> OFFICIAL ALBUMS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {albums.slice(0, 3).map((album) => (
                <Card key={album.id} className="bg-black/40 border border-white/10 text-white overflow-hidden hover:border-purple-400/50 transition-all card-glow">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={album.artwork} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-xl font-bold text-white">{album.title}</h3>
                        <p className="text-sm text-white/70">{album.year}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/songs" className="flex items-center">
                  View All Albums <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Recent Songs Table */}
          <Card className="bg-black/40 border border-white/10 text-white mb-10 card-glow">
            <CardHeader>
              <h3 className="text-xl font-semibold text-white">Recent Songs</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-white">Name</th>
                      <th className="px-4 py-3 text-left text-white">Era</th>
                      <th className="px-4 py-3 text-left text-white">Sheet Tab</th>
                      <th className="px-4 py-3 text-left text-white">Type</th>
                      <th className="px-4 py-3 text-left text-white">Quality</th>
                      <th className="px-4 py-3 text-left text-white">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSongs.map(song => (
                      <tr key={song.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <Link to={`/songs/${song.id}`} className="text-white hover:text-white/80 transition-colors">
                            {song.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          {song.era || <em className="text-white/40">Unknown</em>}
                        </td>
                        <td className="px-4 py-3">
                          {song.primary_tab_name && song.primary_tab_name !== "Unknown" ? (
                            <>
                              <span className="text-white">{song.primary_tab_name}</span>
                              {song.subsection_name && (
                                <small className="text-white/50 ml-1">({song.subsection_name})</small>
                              )}
                            </>
                          ) : (
                            <em className="text-white/40">Unknown</em>
                          )}
                        </td>
                        <td className="px-4 py-3 text-white/70">{formatType(song.type)}</td>
                        <td className="px-4 py-3 text-white/70">{song.quality}</td>
                        <td className="px-4 py-3 text-white/70">{song.leak_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
};

export default Index;
