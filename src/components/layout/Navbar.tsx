"use client";
import React from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
            <span className="text-background font-bold">Y</span>
          </div>
          <span className="text-xl font-bold uppercase tracking-wider text-offwhite">Yoga Balance</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Classes', 'About', 'Instructors', 'Blog', 'Contact'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm text-accent hover:text-sage transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-offwhite hover:bg-white/10 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="bg-sage text-background px-6 py-2 rounded-lg font-semibold hover:bg-offwhite transition-colors">
            JOIN NOW
          </button>
          <button className="md:hidden p-2 text-offwhite">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
