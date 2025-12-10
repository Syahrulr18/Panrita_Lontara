import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { Volume2, VolumeX } from 'lucide-react';
import backsound from '../../assets/backsound.mp3';

const Layout = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play attempt with initial volume
    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(e => {
          console.log("Audio autoplay prevented by browser, waiting for interaction");
          // If autoplay fails, listen for the first interaction to play
          const playOnInteraction = () => {
            audioRef.current.play();
            // Remove listener after success
            window.removeEventListener('click', playOnInteraction);
            window.removeEventListener('touchstart', playOnInteraction);
            window.removeEventListener('keydown', playOnInteraction);
          };
          
          window.addEventListener('click', playOnInteraction);
          window.addEventListener('touchstart', playOnInteraction);
          window.addEventListener('keydown', playOnInteraction);
        });
      }
    };
    
    tryPlay();
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
         audioRef.current.muted = false;
         setIsMuted(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Navbar />
      
      {/* Background Audio */}
      <audio ref={audioRef} src={backsound} loop />

      {/* Floating Audio Controls */}
      <div 
        className={`fixed bottom-6 left-6 z-50 flex items-center bg-white/90 backdrop-blur shadow-lg border border-amber-200 rounded-full transition-all duration-300 ease-in-out ${isExpanded ? 'p-2 pl-4 pr-4 gap-3' : 'p-2'}`}
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`rounded-full text-amber-800 hover:bg-amber-50 transition-colors relative z-10 ${isExpanded ? '' : 'p-2'}`}
          title="Music Controls"
        >
          {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        
        {/* Animated Slider Container */}
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            title="Volume"
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="bg-amber-900 text-amber-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Panrita Lontara. Melestarikan Budaya Sulawesi Selatan.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
