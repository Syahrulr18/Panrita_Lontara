import React, { useState } from 'react';
import { lontaraData } from '../data/lontaraData';
import { generateSpeech } from '../utils/ttsService';
import LontaraCard from '../components/features/learning/LontaraCard';
import { Loader, Volume2, X } from 'lucide-react';

const LearningMode = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const basicChars = lontaraData.filter(item => item.type === 'basic');
  const vowels = lontaraData.filter(item => item.type === 'vowel');

  const handleCardClick = (char) => {
    setSelectedChar(char);
  };
  
  const playAudio = async (text) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const audio = await generateSpeech(text);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (error) {
      console.error("Failed to play audio", error);
      setIsPlaying(false);
      alert(`Gagal memutar audio: ${error.message}`);
    }
  };

  const closeModal = () => {
    setSelectedChar(null);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-amber-900 mb-2">Aksara Lontara</h1>
        <p className="text-amber-800/80 text-lg">Sentuh kartu untuk melihat detail dan variasi vokal.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {basicChars.map((item) => (
          <LontaraCard 
            key={item.id} 
            data={item} 
            onClick={() => handleCardClick(item)} 
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedChar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto custom-scrollbar" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Main Character Display */}
              <div className="flex-shrink-0 text-center">
                <div className="w-40 h-40 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-amber-200 mb-4 mx-auto">
                  <span className="text-8xl text-amber-900 font-buginese font-bold">{selectedChar.symbol}</span>
                </div>
                <h2 className="text-3xl font-bold text-stone-900">{selectedChar.char}</h2>
                <p className="text-xl text-stone-500">{selectedChar.latin}</p>
              </div>

              {/* Vowel Variations */}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-stone-700 mb-4 pb-2 border-b border-stone-200">
                  Variasi Vokal (Tanda Baca)
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {vowels.map((vowel) => (
                    <div 
                      key={vowel.id} 
                      onClick={() => playAudio(selectedChar.latin.replace(/a$/i, '') + vowel.latin.replace('-', ''))}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                         <span className="text-4xl text-amber-800 font-buginese w-12 text-center bg-amber-50 rounded px-2 group-hover:bg-amber-100 transition-colors">
                           {selectedChar.symbol}
                         </span>
                         <div>
                           <p className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                             Bunyi: <span className="text-amber-700 font-bold">{selectedChar.latin.replace(/a$/i, '')}{vowel.latin.replace('-', '')}</span>
                           </p>
                           <p className="text-xs text-stone-400">Tanda: {vowel.latin}</p>
                         </div>
                      </div>
                      <div className="text-amber-200 group-hover:text-amber-600 transition-colors">
                        <Volume2 size={20} />
                      </div>
                    </div>
                  ))}
                  
                  {/* Default/Base 'a' */}
                  <div 
                    onClick={() => playAudio(selectedChar.latin)}
                    className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors group"
                  >
                     <div className="flex items-center gap-4">
                         <span className="text-4xl text-amber-800 font-buginese w-12 text-center px-2">{selectedChar.symbol}</span>
                         <div>
                           <p className="font-semibold text-stone-800 group-hover:text-amber-800">
                             Bunyi: <span className="text-amber-700 font-bold">{selectedChar.latin} (Standard)</span>
                           </p>
                           <p className="text-xs text-stone-400">Tanpa tanda baca</p>
                         </div>
                      </div>
                      <div className="text-amber-300 group-hover:text-amber-600 transition-colors">
                        {isPlaying ? <Loader className="animate-spin" size={20} /> : <Volume2 size={20} />}
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMode;
