
import React from 'react';
import AlbumGrid from '../components/AlbumGrid';
import AudioProvider from '../components/AudioProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-6 carti-font text-center">PLAYBOI CARTI</h1>
            <p className="text-lg text-center text-gray-600 mb-8">
              Explore the discography of Playboi Carti, featuring his iconic albums and tracks
            </p>
            <AlbumGrid />
          </section>
        </main>
        <Footer />
      </div>
    </AudioProvider>
  );
};

export default Index;
