import React from 'react';
import { Heart, Github, Instagram, Mail } from 'lucide-react';

import syahrulImg from '../assets/syahrul.jpg';
import baqirImg from '../assets/baqir.jpg';
import salwaImg from '../assets/salwa.jpg';

const TeamMember = ({ name, role, color = "bg-amber-100 text-amber-900", image, instagram, github }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center group">
    <div className={`w-32 h-32 rounded-full mb-4 flex items-center justify-center overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300 ${color}`}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl font-bold">{name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
      )}
    </div>
    <h3 className="text-xl font-bold text-stone-800 mb-1 group-hover:text-amber-700 transition-colors">{name}</h3>
    <p className="text-stone-500 text-sm font-medium mb-4">{role}</p>
    <div className="flex gap-4 text-stone-400">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 cursor-pointer transition-colors p-1">
          <Github size={20} />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 cursor-pointer transition-colors p-1">
          <Instagram size={20} />
        </a>
      )}
      {/* <Mail size={20} className="hover:text-amber-600 cursor-pointer transition-colors p-1" /> */}
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
          Tentang <span className="text-amber-700">Panrita Lontara</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Platform interaktif untuk melestarikan dan memperkenalkan aksara Lontara Bugis-Makassar kepada generasi digital melalui teknologi modern.
        </p>
      </section>
 
      {/* Mission / Description */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                    Misi Kami
                </h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                Panrita Lontara hadir sebagai jembatan antara warisan budaya masa lalu dan teknologi masa depan. Kami percaya bahwa belajar aksara daerah tidak harus membosankan. Dengan menggabungkan <strong>3D Interaktif</strong>, <strong>Kuis Gamifikasi</strong>, dan <strong>Audio AI</strong>, kami menciptakan pengalaman belajar yang menyenangkan dan mudah diakses oleh siapa saja, di mana saja.
                </p>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-10">Tim Pengembang</h2>
        <div className="grid md:grid-cols-3 gap-8 px-4">
          <TeamMember 
            name="Muh Baqir Hasis Dawi" 
            role="UI/UX Designer"
            color="bg-orange-100"
            image={baqirImg}
            instagram="https://www.instagram.com/baqirrhd._/"
          />
          <TeamMember 
            name="Muh Syahrul Ramadhan" 
            role="Fullstack Developer & 3D Logic"
            color="bg-amber-100"
            image={syahrulImg}
            instagram="https://www.instagram.com/syahrul_.r4/"
            github="https://github.com/Syahrulr18"
          />
          <TeamMember 
            name="Salwa Dwi Ningsih" 
            role="UI/UX Researcher & Content"
            color="bg-yellow-100"
            image={salwaImg}
            instagram="https://www.instagram.com/jiw_.wwaa/"
          />
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-stone-200">
        <p className="text-stone-400 text-sm">© 2024 Panrita Lontara Project. Dibuat dengan bangga di Makassar.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
