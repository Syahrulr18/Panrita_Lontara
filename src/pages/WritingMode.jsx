import React from 'react';
import CanvasDraw from '../components/features/writing/CanvasDraw';
import { lontaraData } from '../data/lontaraData';

const WritingMode = () => {
  const basicChars = lontaraData.filter(i => i.type === 'basic');

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
       {/* Main Canvas Area */}
       <div className="lg:col-span-2 order-2 lg:order-1">
         <h1 className="text-3xl font-bold text-amber-900 mb-2">Latihan Menulis</h1>
         <p className="text-stone-600 mb-6">Tulis huruf Lontara di kanvas ini. Anda bisa menyimpan hasilnya.</p>
         
         <CanvasDraw />
       </div>

       {/* Cheatsheet Sidebar */}
       <div className="lg:col-span-1 order-1 lg:order-2">
         <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
           <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                Referensi Huruf
           </h2>
           
           <div className="grid grid-cols-4 gap-2">
             {basicChars.map(char => (
               <div key={char.id} className="aspect-square bg-white rounded-lg flex flex-col items-center justify-center p-2 border border-amber-100 shadow-sm hover:border-amber-300 transition-colors">
                 <span className="text-2xl font-buginese text-amber-800">{char.symbol}</span>
                 <span className="text-xs text-stone-500 font-medium">{char.latin}</span>
               </div>
             ))}
           </div>
         </div>
       </div>
    </div>
  );
};

export default WritingMode;
