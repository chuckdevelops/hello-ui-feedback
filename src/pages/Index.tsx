
import React from 'react';
import { Link } from 'react-router-dom';
import AudioProvider from '../components/AudioProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { albums } from '@/data/albums';
import { ArrowRight } from 'lucide-react';
import CartiFigure from '../components/CartiFigure';

// Mock data for recent songs
const recentSongs = [
  { id: 1, name: "HOMIXIDE", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 2, name: "BACKR00MS (ft. Travis Scott)", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 3, name: "KING BOB", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 4, name: "H00DBYAIR", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023" },
  { id: 5, name: "I'M SO CRAZY", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "Studio Session", quality: "256kbps", leak_date: "November 27, 2023" }
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
          {/* Hero Section with 3D Carti Figure */}
          <div className="glass rounded-lg p-8 mb-12 mx-auto max-w-4xl scale-in">
            <h1 className="text-4xl font-bold mb-4 carti-font text-center text-glow">PLAYBOI CARTI MUSIC CATALOG</h1>
            <p className="text-center text-white/70 mb-6 max-w-xl mx-auto">
              Your comprehensive resource for Playboi Carti's entire discography.
            </p>
            
            {/* Interactive 3D Carti Figure */}
            <div className="mb-6">
              <CartiFigure />
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
          
          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Recently Leaked */}
            <div className="lg:col-span-4">
              <Card className="bg-black/40 border border-white/10 text-white h-full card-glow">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white">Recently Leaked</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {recentSongs.slice(0, 5).map(song => (
                      <Link 
                        key={song.id}
                        to={`/songs/${song.id}`}
                        className="block p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
                      >
                        {song.name}
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
                  <h3 className="text-xl font-semibold text-white">Sheet Tab Overview</h3>
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
