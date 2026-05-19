"use client";
import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';

const classes = [
  { name: "Hatha Yoga", level: "Beginner", time: "60 min" },
  { name: "Vinyasa Flow", level: "Intermediate", time: "45 min" },
  { name: "Yin Yoga", level: "Restore", time: "60 min" },
  { name: "Power Yoga", level: "Advanced", time: "45 min" },
];

const PopularClasses = () => {
  return (
    <section className="py-128 px-32 bg-background" id="classes">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-64 gap-24">
          <div>
            <h2 className="mb-16 text-offwhite">Popular Classes</h2>
            <div className="w-64 h-4 bg-sage rounded-full" />
          </div>
          <button className="flex items-center gap-8 text-sage font-semibold group hover:text-offwhite transition-colors">
            VIEW ALL CLASSES <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
          {classes.map((cls, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-24 overflow-hidden mb-24 relative bg-primary/20 border border-offwhite/5 group-hover:border-sage/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                {/* Visual Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-sage/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sage/40">
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-24 left-24 right-24">
                   <h3 className="text-h3 text-offwhite mb-8 truncate">{cls.name}</h3>
                   <div className="flex justify-between items-center text-accent text-small">
                     <span className="flex items-center gap-4"><Clock size={14} /> {cls.time}</span>
                     <span className="px-8 py-2 bg-sage/10 rounded-4 text-sage border border-sage/20">{cls.level}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;
