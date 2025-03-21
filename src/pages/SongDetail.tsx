
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Pause } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

// This is a placeholder - in a real app, you'd fetch song details from an API
const getSongById = (id: string) => {
  return {
    id,
    name: `Song #${id}`,
    era: "WLR V1",
    primary_tab_name: "⭐ Best Of",
    subsection_name: "Top Tier",
    type: "CDQ",
    quality: "320kbps",
    leak_date: "December 15, 2023",
    description: "This song was leaked in December 2023 and quickly became a fan favorite.",
    audioUrl: `/media/previews/${id}.mp3`,
  };
};

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playAudio, pauseAudio, activeAudioId } = useAudio();
  
  if (!id) {
    navigate('/songs');
    return null;
  }
  
  const song = getSongById(id);
  const isPlaying = activeAudioId === id;
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(id, song.audioUrl);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/songs')}
        >
          ← Back to Songs
        </Button>
        
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <h1 className="text-3xl font-bold">{song.name}</h1>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-1 bg-gray-100 rounded-full">{song.era}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{song.primary_tab_name}</span>
              {song.subsection_name && (
                <span className="px-2 py-1 bg-gray-100 rounded-full">{song.subsection_name}</span>
              )}
              <span className="px-2 py-1 bg-gray-100 rounded-full">{song.type}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{song.quality}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600">{song.description}</p>
              <p className="text-sm text-gray-500 mt-2">Leaked: {song.leak_date}</p>
            </div>
            
            <div className="flex items-center justify-center my-8 p-6 bg-gray-100 rounded-lg">
              <Button 
                onClick={handlePlayPause}
                size="lg"
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                {isPlaying ? 'Pause' : 'Play Preview'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SongDetail;
