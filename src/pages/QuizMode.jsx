import React, { useState, useEffect } from 'react';
import Lontara3DViewer from '../components/features/quiz/Lontara3DViewer';
import { lontaraData } from '../data/lontaraData';
import { Shuffle, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizMode = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const basicChars = lontaraData.filter(i => i.type === 'basic');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    // 1. Select random correct answer
    const randomIdx = Math.floor(Math.random() * basicChars.length);
    const correct = basicChars[randomIdx];

    // 2. Select 3 random distractors
    const distractors = basicChars
      .filter(item => item.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // 3. Shuffle options
    const allOptions = [correct, ...distractors].sort(() => 0.5 - Math.random());

    setCurrentQuestion(correct);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return; // Prevent double click

    setSelectedOption(option);
    
    if (option.id === currentQuestion.id) {
      setIsCorrect(true);
      setScore(s => s + 10);
      setStreak(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#D97706', '#92400E'] // Amber shades
      });
    } else {
      setIsCorrect(false);
      setStreak(0);
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  if (!currentQuestion) return <div className="p-8 text-center text-amber-900">Loading Quiz...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-amber-900 border-b border-amber-200 pb-4">
        <div>
           <h1 className="text-3xl font-bold">Kuis 3D</h1>
           <p className="text-sm text-amber-700">Putar balok 3D dan tebak hurufnya!</p>
        </div>
        <div className="text-right">
           <div className="text-2xl font-bold">{score} <span className="text-sm font-normal">pts</span></div>
           <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Streak: {streak}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left: 3D Viewer */}
        <div className="relative">
           {/* Fallback to symbol if fontChar missing (to avoid crash), but data should have it */}
           <Lontara3DViewer symbol={currentQuestion.fontChar || currentQuestion.symbol} />
           <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-amber-800 shadow-sm pointer-events-none">
             Drag to rotate
           </div>
        </div>

        {/* Right: Options */}
        <div className="space-y-4">
           <h2 className="text-xl font-medium text-stone-800 mb-4">Huruf apakah ini?</h2>
           
           <div className="grid grid-cols-1 gap-3">
             {options.map((option) => (
               <button
                 key={option.id}
                 onClick={() => handleOptionClick(option)}
                 disabled={!!selectedOption}
                 className={`
                   w-full p-4 rounded-xl text-left transition-all duration-200 border-2 flex justify-between items-center
                   ${selectedOption === option 
                      ? (option.id === currentQuestion.id 
                          ? 'bg-green-50 border-green-500 text-green-800' 
                          : 'bg-red-50 border-red-500 text-red-800')
                      : (selectedOption && option.id === currentQuestion.id 
                          ? 'bg-green-50 border-green-500 text-green-800' 
                          : 'bg-white border-amber-100 text-stone-700 hover:border-amber-300 hover:bg-amber-50')
                   }
                 `}
               >
                 <span className="font-bold text-lg">{option.latin} ({option.char})</span>
                 
                 {selectedOption === option && (
                    option.id === currentQuestion.id 
                      ? <CheckCircle className="text-green-600" /> 
                      : <XCircle className="text-red-500" />
                 )}
               </button>
             ))}
           </div>

           {selectedOption && (
             <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <button
                 onClick={handleNext}
                 className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-lg shadow-amber-200 transition-all flex items-center justify-center gap-2"
               >
                 <RefreshCw size={20} />
                 Soal Selanjutnya
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default QuizMode;
