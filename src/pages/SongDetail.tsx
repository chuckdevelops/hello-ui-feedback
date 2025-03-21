
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlayCircle, Pause, Calendar, Music, Volume2, Clock, Disc, Tag, Star, Heart, Share2, User, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { songs } from '../data/songs';
import AudioProvider from '../components/AudioProvider';
import { useToast } from "@/hooks/use-toast";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playAudio, pauseAudio, activeAudioId } = useAudio();
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<'like' | 'dislike' | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!id) {
      navigate('/songs');
      return;
    }
    
    try {
      // Find the song in our data
      const songId = parseInt(id);
      const foundSong = songs.find(s => s.id === songId);
      
      if (foundSong) {
        setSong({
          ...foundSong,
          audioUrl: `/media/previews/${foundSong.id}.mp3`
        });
      } else {
        setError("Song not found");
      }
    } catch (err) {
      setError("Error loading song data");
      console.error("Error loading song:", err);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !song) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:bg-white/10"
            onClick={() => navigate('/songs')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Songs
          </Button>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl mb-4">{error || "Song not found"}</p>
            <Button onClick={() => navigate('/songs')}>View All Songs</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const isPlaying = activeAudioId === id;
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(id, song.audioUrl);
    }
  };

  const handleRate = (rating: 'like' | 'dislike') => {
    setUserRating(rating);
    
    // Show toast notification based on rating
    if (rating === 'like') {
      toast({
        title: "Thanks for your feedback!",
        description: `You liked "${song.name}"`,
      });
    } else {
      toast({
        title: "Thanks for your feedback!",
        description: `You disliked "${song.name}"`,
        variant: "destructive",
      });
    }
    
    // In a real app, you would send this rating to your backend
    console.log(`User rated song ${song.id} as ${rating}`);
  };
  
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:bg-white/10"
            onClick={() => navigate('/songs')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Songs
          </Button>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Album Art / Song Visualizer */}
              <div className="md:col-span-1">
                <Card className="bg-black/60 border border-white/20">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-purple-900/80 to-black flex items-center justify-center overflow-hidden rounded-t-lg">
                      <Music className="h-24 w-24 text-white/30" />
                    </div>
                    <div className="p-4">
                      <Button 
                        onClick={handlePlayPause}
                        className="w-full bg-white text-black hover:bg-white/90 flex items-center justify-center py-6"
                      >
                        {isPlaying ? 
                          <><Pause className="h-5 w-5 mr-2" /> Pause</> : 
                          <><PlayCircle className="h-5 w-5 mr-2" /> Play Preview</>
                        }
                      </Button>
                      
                      {/* Rating Buttons */}
                      <div className="mt-4 flex justify-between">
                        <Button
                          variant={userRating === 'like' ? 'default' : 'outline'}
                          size="lg"
                          className={`w-[48%] ${userRating === 'like' ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-white hover:bg-white/10'}`}
                          onClick={() => handleRate('like')}
                        >
                          <ThumbsUp className="mr-2 h-5 w-5" />
                          Like
                        </Button>
                        <Button
                          variant={userRating === 'dislike' ? 'default' : 'outline'}
                          size="lg"
                          className={`w-[48%] ${userRating === 'dislike' ? 'bg-red-600 hover:bg-red-700' : 'border-white/20 text-white hover:bg-white/10'}`}
                          onClick={() => handleRate('dislike')}
                        >
                          <ThumbsDown className="mr-2 h-5 w-5" />
                          Dislike
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Song Details */}
              <div className="md:col-span-2">
                <Card className="bg-black/60 border border-white/20 h-full">
                  <CardHeader>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-3xl font-bold carti-font tracking-wide">{song.name}</h1>
                      {song.features && (
                        <p className="text-white/70 text-sm">featuring {song.features}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className="bg-purple-800/80 hover:bg-purple-700/80">{song.era}</Badge>
                        <Badge className="bg-white/10 hover:bg-white/20">{song.primary_tab_name}</Badge>
                        {song.subsection_name && (
                          <Badge className="bg-white/10 hover:bg-white/20">{song.subsection_name}</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Type:</span>
                          <span className="font-medium">{song.type}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Quality:</span>
                          <span className="font-medium">{song.quality}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Producer:</span>
                          <span className="font-medium">{song.producer || "Unknown"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Features:</span>
                          <span className="font-medium">{song.features || "None"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Year:</span>
                          <span className="font-medium">{song.year}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/50" />
                          <span className="text-white/70">Leaked:</span>
                          <span className="font-medium">{song.leak_date}</span>
                        </div>
                      </div>
                      
                      <Separator className="bg-white/10" />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">About This Track</h3>
                        <p className="text-white/80">
                          {song.description || `"${song.name}" is a ${song.type} track from Playboi Carti's ${song.era} era. 
                          It was leaked on ${song.leak_date}${song.producer ? ` and produced by ${song.producer}` : ''}.
                          ${song.features ? ` The track features ${song.features}.` : ''}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-4 border-t border-white/10">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Heart className="h-4 w-4 mr-1" /> Favorite
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </Button>
                    </div>
                    <Badge variant="outline" className="bg-white/5 border-white/20">
                      Popularity: {song.popularity || "Medium"}
                    </Badge>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Related songs section - could be expanded in the future */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4 carti-font">Related Tracks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {songs
                  .filter(s => s.id !== song.id && (s.era === song.era || s.producer === song.producer))
                  .slice(0, 4)
                  .map(relatedSong => (
                    <Card 
                      key={relatedSong.id} 
                      className="bg-black/60 border border-white/20 hover:border-white/40 transition-all cursor-pointer hover-scale"
                      onClick={() => navigate(`/songs/${relatedSong.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-purple-900/80 to-black rounded-full flex items-center justify-center">
                            <Music className="h-5 w-5 text-white/50" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{relatedSong.name}</h3>
                            <p className="text-sm text-white/70">{relatedSong.era}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
};

export default SongDetail;
