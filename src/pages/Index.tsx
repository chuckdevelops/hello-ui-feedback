
import React from 'react';
import { Link } from 'react-router-dom';
import AudioProvider from '../components/AudioProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  Disc, 
  ListMusic, 
  Clock, 
  TrendingUp, 
  Trophy,
  Star,
  Sparkles,
  Music
} from 'lucide-react';
import { albums } from '@/data/albums';
import AlbumGrid from '@/components/AlbumGrid';

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

// Stats data
const stats = [
  { label: "Total Songs", value: 248, icon: <ListMusic className="h-5 w-5 text-white/60" /> },
  { label: "Total Albums", value: albums.length, icon: <Disc className="h-5 w-5 text-white/60" /> },
  { label: "Distinct Eras", value: new Set(albums.map(album => album.year.toString())).size, icon: <Clock className="h-5 w-5 text-white/60" /> },
  { label: "Latest Leaks", value: 12, icon: <TrendingUp className="h-5 w-5 text-white/60" /> },
];

const Index = () => {
  // Featured albums (latest 3)
  const featuredAlbums = albums.slice(0, 3);
  
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mt-8 fade-in">
          {/* Hero Section */}
          <div className="glass rounded-lg p-8 mb-12 mx-auto max-w-4xl scale-in relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/40 z-0"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-6 carti-font text-center text-glow">PLAYBOI CARTI</h1>
              <p className="text-center text-white/80 mb-8 max-w-xl mx-auto text-lg">
                Your comprehensive resource for Playboi Carti's entire discography, 
                videos, rare tracks, and exclusive content.
              </p>
              <hr className="my-6 border-white/10" />
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-black/40 border border-white/10 text-white card-glow hover-scale">
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center">
                      <div className="mb-2 mt-2">{stat.icon}</div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</h2>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 hover-scale">
                  <Link to="/songs" className="flex items-center">
                    <ListMusic className="mr-2 h-4 w-4" /> Browse Songs
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover-scale">
                  <Link to="/fit-pics" className="flex items-center">
                    <Music className="mr-2 h-4 w-4" /> Explore Albums
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Featured Albums */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold carti-font">FEATURED ALBUMS</h2>
              <Button asChild variant="link" className="text-white/70 hover:text-white">
                <Link to="/fit-pics" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAlbums.map((album) => (
                <Card key={album.id} className="bg-black/40 border border-white/10 text-white card-glow hover-scale overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={album.imageUrl} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{album.title}</h3>
                    <p className="text-white/60 mb-3">{album.year}</p>
                    <Link to={`/album/${album.id}`} className="text-white/80 hover:text-white text-sm inline-flex items-center">
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="recent" className="mb-12">
            <TabsList className="grid grid-cols-2 bg-black/60 border border-white/10 p-1 mb-6">
              <TabsTrigger value="recent" className="data-[state=active]:bg-white/10">Recently Added</TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-white/10">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="mt-0">
              <Card className="bg-black/40 border border-white/10 text-white card-glow">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white">Recently Added Songs</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left text-white">Name</th>
                          <th className="px-4 py-3 text-left text-white">Era</th>
                          <th className="px-4 py-3 text-left text-white hidden md:table-cell">Sheet Tab</th>
                          <th className="px-4 py-3 text-left text-white hidden md:table-cell">Type</th>
                          <th className="px-4 py-3 text-left text-white hidden sm:table-cell">Quality</th>
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
                            <td className="px-4 py-3 hidden md:table-cell">
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
                            <td className="px-4 py-3 text-white/70 hidden md:table-cell">{formatType(song.type)}</td>
                            <td className="px-4 py-3 text-white/70 hidden sm:table-cell">{song.quality}</td>
                            <td className="px-4 py-3 text-white/70">{song.leak_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center">
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Link to="/songs">View All Songs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="categories" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/40 border border-white/10 text-white card-glow">
                  <CardHeader className="flex flex-row items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Grails</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">Top tier unreleased songs that fans have been waiting for.</p>
                    <Link to="/songs" className="text-white/80 hover:text-white text-sm flex items-center">
                      Browse Grails <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/40 border border-white/10 text-white card-glow">
                  <CardHeader className="flex flex-row items-center">
                    <Star className="mr-2 h-5 w-5 text-amber-400" />
                    <h3 className="text-xl font-semibold text-white">Best Of</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">High quality tracks that showcase Carti's diverse sound.</p>
                    <Link to="/songs" className="text-white/80 hover:text-white text-sm flex items-center">
                      Browse Best Of <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/40 border border-white/10 text-white card-glow">
                  <CardHeader className="flex flex-row items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Special</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">Noteworthy tracks with unique qualities or historical significance.</p>
                    <Link to="/songs" className="text-white/80 hover:text-white text-sm flex items-center">
                      Browse Special <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/40 border border-white/10 text-white card-glow">
                  <CardHeader className="flex flex-row items-center">
                    <Music className="mr-2 h-5 w-5 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Released</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">Officially released songs available on streaming platforms.</p>
                    <Link to="/songs" className="text-white/80 hover:text-white text-sm flex items-center">
                      Browse Released <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-black border border-white/10 text-white card-glow mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-white/70">Get notified about new leaks, rare tracks, and catalog updates.</p>
                </div>
                <div className="w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-white text-black hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
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
