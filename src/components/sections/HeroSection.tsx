"use client";
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-8 z-10 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-offwhite">
            Find Harmony.<br />
            <span className="text-sage">Live Mindfully.</span>
          </h1>
          <p className="text-accent max-w-md mb-10 text-lg">
            Transform your body, calm your mind, and elevate your spirit with our guided yoga practices.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-sage text-background px-8 py-4 rounded-lg font-bold hover:bg-offwhite transition-all shadow-lg shadow-sage/10">
              EXPLORE CLASSES
            </button>
            <button className="border border-offwhite/20 px-8 py-4 rounded-lg font-bold hover:bg-white/5 transition-colors text-offwhite">
              OUR PHILOSOPHY
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            <div className="absolute inset-0 border border-sage/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <svg viewBox="0 0 200 200" className="w-4/5 h-4/5 text-sage">
              <path 
                fill="currentColor" 
                d="M100 30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 130c-25 0-45-12.5-45-12.5l8-12.5s12.5 7.5 37 7.5 37-7.5 37-7.5l8 12.5s-20 12.5-45 12.5zm-30-55c0-10 10-25 30-25s30 15 30 25-10 30-30 30-30-20-30-30z"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-0 w-full px-8 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between border-t border-offwhite/10 pt-8 text-accent text-xs uppercase tracking-widest">
           <span>Expert Instructors</span>
           <span>All Levels</span>
           <span>Flexible Schedule</span>
           <span>Holistic Approach</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
