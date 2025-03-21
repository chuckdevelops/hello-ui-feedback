
import React from 'react';
import { Link } from 'react-router-dom';
import AudioProvider from '../components/AudioProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { albums } from '@/data/albums';

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
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8 mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-2 carti-font text-center">Playboi Carti Music Catalog</h1>
            <p className="text-center text-gray-600 mb-6">
              Your comprehensive resource for Playboi Carti's entire discography.
            </p>
            <hr className="my-4" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="text-center py-6">
                  <h2 className="text-4xl font-bold">{recentSongs.length}</h2>
                  <p className="text-gray-500">Total Songs & Videos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center py-6">
                  <h2 className="text-4xl font-bold">{eraCount}</h2>
                  <p className="text-gray-500">Distinct Eras</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/songs">Browse Catalog</Link>
              </Button>
            </div>
          </div>
          
          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Recently Leaked */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Recently Leaked</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {recentSongs.slice(0, 5).map(song => (
                      <Link 
                        key={song.id}
                        to={`/songs/${song.id}`}
                        className="block p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
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
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Sheet Tab Overview</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">Songs are organized into various sheet tabs based on their categorization:</p>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-100 rounded-md">
                      🏆 Grails - Top tier unreleased songs
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      🥇 Wanted - Highly anticipated leaks
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      ⭐ Best Of - High quality tracks
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      ✨ Special - Noteworthy tracks
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      Released - Official releases
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      Unreleased - Unreleased songs
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recent Songs Table */}
          <Card className="mt-8">
            <CardHeader>
              <h3 className="text-xl font-semibold">Recent Songs</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Era</th>
                      <th className="px-4 py-3 text-left">Sheet Tab</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Quality</th>
                      <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSongs.map(song => (
                      <tr key={song.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Link to={`/songs/${song.id}`} className="text-blue-600 hover:underline">
                            {song.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {song.era || <em className="text-gray-500">Unknown</em>}
                        </td>
                        <td className="px-4 py-3">
                          {song.primary_tab_name && song.primary_tab_name !== "Unknown" ? (
                            <>
                              {song.primary_tab_name}
                              {song.subsection_name && (
                                <small className="text-gray-500 ml-1">({song.subsection_name})</small>
                              )}
                            </>
                          ) : (
                            <em className="text-gray-500">Unknown</em>
                          )}
                        </td>
                        <td className="px-4 py-3">{formatType(song.type)}</td>
                        <td className="px-4 py-3">{song.quality}</td>
                        <td className="px-4 py-3">{song.leak_date}</td>
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
