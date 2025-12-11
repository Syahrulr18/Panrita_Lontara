import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Box, PenTool, Menu, X, Info } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Materi', icon: <BookOpen size={20} /> },
    { path: '/quiz', label: 'Kuis 3D', icon: <Box size={20} /> },
    { path: '/write', label: 'Menggambar', icon: <PenTool size={20} /> },
    { path: '/about', label: 'Tentang', icon: <Info size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-amber-50 border-b border-amber-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-900 tracking-wider">PANRITA LONTARA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-amber-200 text-amber-900'
                    : 'text-amber-800 hover:bg-amber-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 hover:text-amber-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-b border-amber-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-amber-200 text-amber-900'
                    : 'text-amber-800 hover:bg-amber-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
