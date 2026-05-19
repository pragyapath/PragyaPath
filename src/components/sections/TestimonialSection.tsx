"use client";
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "Yoga Balance has truly changed my life. I feel stronger, calmer and more focused.",
    author: "Priya S.",
    rating: 5
  },
  {
    text: "The instructors are amazing and the community is so supportive.",
    author: "Arjun M.",
    rating: 5
  },
  {
    text: "Flexible classes and peaceful environment. Highly recommend!",
    author: "Neha K.",
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-128 px-32" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-80">What Our Members Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-40 rounded-24 relative">
              <div className="flex gap-4 mb-24">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={16} className="fill-sage text-sage" />
                ))}
              </div>
              <p className="text-offwhite italic mb-32 leading-relaxed">"{t.text}"</p>
              <div className="text-sage font-bold text-small">— {t.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
