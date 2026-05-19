"use client";
import React from 'react';
import { User, Mail } from 'lucide-react';

const instructors = [
  { name: "Aarohi Sharma", role: "Yoga Expert", img: "/t1.jpg" },
  { name: "Rohan Mehta", role: "Meditation Coach", img: "/t2.jpg" },
  { name: "Meera Joshi", role: "Wellness Guide", img: "/t3.jpg" },
  { name: "Kabir Verma", role: "Ashtanga Teacher", img: "/t4.jpg" },
];

const InstructorSection = () => {
  return (
    <section className="py-128 px-32 bg-primary/10" id="instructors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-80">
          <div>
            <h2 className="mb-16 text-offwhite">Our Instructors</h2>
            <div className="w-64 h-4 bg-sage rounded-full" />
          </div>
          <button className="text-sage font-bold hover:text-offwhite transition-colors">MEET ALL INSTRUCTORS</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32">
          {instructors.map((ins, i) => (
            <div key={i} className="text-center group">
              <div className="aspect-square rounded-full border-2 border-offwhite/10 p-16 mb-24 relative group-hover:border-sage transition-all duration-500">
                <div className="w-full h-full rounded-full bg-secondary/30 overflow-hidden flex items-center justify-center">
                   {/* Placeholder for instructor image */}
                   <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sage/30">
                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                   </svg>
                </div>
                <div className="absolute bottom-16 right-16 flex flex-col gap-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-32 h-32 bg-sage rounded-full flex items-center justify-center text-background">
                    <Mail size={14} />
                  </div>
                </div>
              </div>
              <h3 className="text-h3 mb-8">{ins.name}</h3>
              <p className="text-accent text-small">{ins.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
