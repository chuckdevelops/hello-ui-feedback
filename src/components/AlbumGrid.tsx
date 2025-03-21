
import React from 'react';
import Album from './Album';
import { albums } from '../data/albums';

const AlbumGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;
