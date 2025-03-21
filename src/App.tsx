
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import FitPics from './pages/FitPics';
import Interviews from './pages/Interviews';
import SocialMedia from './pages/SocialMedia';
import SongList from './pages/SongList';
import SongDetail from './pages/SongDetail';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import './App.css';
import './styles/carti.css';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/songs/:id" element={<SongDetail />} />
          <Route path="/fit-pics" element={<FitPics />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
