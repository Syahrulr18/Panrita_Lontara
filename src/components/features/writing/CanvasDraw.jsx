import React, { useRef,  useEffect, useState } from 'react';
import { Eraser, Download, RotateCcw } from 'lucide-react';

const CanvasDraw = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Support high DPI screens
    const scale = window.devicePixelRatio * 2;
    canvas.width = canvas.parentElement.offsetWidth * scale;
    canvas.height = 500 * scale; // Fixed height for now
    canvas.style.width = '100%';
    canvas.style.height = '500px';

    const context = canvas.getContext('2d');
    context.scale(scale, scale);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    contextRef.current = context;
  }, []);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event
    if (event.touches) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
      };
    }
    
    // Mouse event
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const startDrawing = (event) => {
    const coords = getCoordinates(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    event.preventDefault(); // Prevent scrolling on touch
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    
    const coords = getCoordinates(event);
    contextRef.current.lineTo(coords.x, coords.y);
    contextRef.current.stroke();
    event.preventDefault(); // Prevent scrolling
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    
    // Create a temporary canvas to add white background
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Fill white background
    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw original canvas over it
    tempCtx.drawImage(canvas, 0, 0);
    
    const link = document.createElement('a');
    link.download = `lontara-art-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex gap-2 justify-end mb-2">
        <button 
          onClick={clearCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
        >
          <RotateCcw size={18} /> Clear
        </button>
        <button 
          onClick={downloadCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm transition-colors"
        >
          <Download size={18} /> Simpan
        </button>
      </div>

      {/* Canvas Area */}
      <div className="border-4 border-amber-900/10 rounded-3xl overflow-hidden shadow-inner bg-white cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          className="w-full h-[500px] block"
        />
      </div>
      
      <p className="text-center text-stone-400 text-sm mt-2">Gunakan mouse atau jari untuk menulis di atas kanvas</p>
    </div>
  );
};

export default CanvasDraw;
