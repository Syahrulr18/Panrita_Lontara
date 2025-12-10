import React from 'react';

const LontaraCard = ({ data, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col items-center justify-center aspect-square group"
    >
      <div className="flex-1 flex items-center justify-center">
        <span className="text-6xl text-amber-900 font-buginese font-bold group-hover:scale-110 transition-transform duration-300">
          {data.symbol}
        </span>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-bold text-stone-800">{data.char}</p>
        <p className="text-sm text-stone-500">{data.latin}</p>
      </div>
    </div>
  );
};

export default LontaraCard;
