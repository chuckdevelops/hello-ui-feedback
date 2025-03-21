
import React, { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

interface AlbumProps {
  album: {
    id: string;
    title: string;
    year: number;
    coverImage: string;
    audioPreview: string;
  };
}

const Album = ({ album }: AlbumProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTemporarySpinning, setIsTemporarySpinning] = useState(false);
  const { playAudio } = useAudio();

  const handleMouseEnter = () => {
    if (!isSpinning) {
      setIsTemporarySpinning(true);
    }
  };

  const handleMouseLeave = () => {
    setIsTemporarySpinning(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Toggle permanent spinning with Ctrl/Cmd+Click
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setIsSpinning(!isSpinning);
      setIsTemporarySpinning(false);
    } else {
      // Normal click plays the audio
      playAudio(album.id, album.audioPreview);
    }
  };

  const spinClass = isSpinning 
    ? 'spin' 
    : isTemporarySpinning 
      ? 'spin-temp' 
      : '';

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="p-4">
        <div 
          className="relative aspect-square cursor-pointer overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <img 
            src={album.coverImage} 
            alt={album.title} 
            className={`album-img w-full h-full object-cover ${spinClass}`}
          />
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg">{album.title}</h3>
          <p className="text-gray-600">{album.year}</p>
        </div>
      </div>
    </div>
  );
};

export default Album;
