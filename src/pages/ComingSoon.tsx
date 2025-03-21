
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="coming-soon-container flex justify-center items-center flex-grow glass">
        <div className="text-center scale-in px-4">
          <h1 className="coming-soon-text carti-font text-white text-5xl md:text-7xl tracking-wider text-glow mb-8">
            Coming Soon
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-white/20 my-6"></div>
          <p className="text-white/60 max-w-md mx-auto">
            This section is currently under development. Check back later for updates.
          </p>
        </div>
      </div>
      
      <div className="back-link text-center pb-8 pt-4">
        <Link to="/" className="text-white/50 hover:text-white no-underline carti-font text-base tracking-wide transition-colors inline-flex items-center hover-scale">
          <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO CATALOG
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
