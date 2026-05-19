"use client";
import React from 'react';
import { ShieldCheck, Wind, Clock, Users } from 'lucide-react';

const features = [
  {
    title: "Mind & Body Balance",
    desc: "Yoga helps to unite mind and body for a healthier and happier you.",
    icon: ShieldCheck
  },
  {
    title: "Stress Relief",
    desc: "Reduce stress, anxiety and improve your mental clarity.",
    icon: Wind
  },
  {
    title: "Flexible Anytime",
    desc: "Join classes anytime, anywhere with our flexible schedule.",
    icon: Clock
  },
  {
    title: "Community Support",
    desc: "Be part of a supportive community that uplifts and motivates.",
    icon: Users
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-128 px-32 bg-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-32 rounded-16 border-t-2 border-t-sage/20 hover:border-t-sage transition-all group">
            <div className="w-48 h-48 bg-background rounded-8 flex items-center justify-center mb-24 group-hover:scale-110 transition-transform">
              <f.icon className="text-sage" size={24} />
            </div>
            <h3 className="mb-16 text-offwhite">{f.title}</h3>
            <p className="text-accent text-small">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureHighlights;
