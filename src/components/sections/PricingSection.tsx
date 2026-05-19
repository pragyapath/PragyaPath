"use client";
import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "599",
    features: ["Unlimited Classes", "Access to Recordings", "Community Access"],
    cta: "GET STARTED",
    featured: false
  },
  {
    name: "Pro",
    price: "999",
    features: ["Unlimited Classes", "Access to Recordings", "1-on-1 Session (Monthly)", "Community Access"],
    cta: "GET STARTED",
    featured: true,
    tag: "Most Popular"
  },
  {
    name: "Premium",
    price: "1499",
    features: ["All Pro Features", "2-on-1 Session (Monthly)", "Personalized Plans", "Priority Support"],
    cta: "GET STARTED",
    featured: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-128 px-32" id="pricing">
      <div className="max-w-7xl mx-auto text-center mb-80">
        <h2 className="mb-16">Choose Your Plan</h2>
        <p className="text-accent max-w-xl mx-auto">Select a membership that fits your practice and goals perfectly.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-32">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`relative p-40 rounded-24 transition-all duration-300 ${
              plan.featured 
                ? 'bg-primary border-2 border-sage scale-105 shadow-2xl shadow-sage/10' 
                : 'glass-card border border-offwhite/10 hover:border-sage/40'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-16 left-1/2 -translate-x-1/2 bg-sage text-background px-16 py-4 rounded-full text-small font-bold">
                {plan.tag}
              </span>
            )}
            
            <div className="mb-40">
              <h3 className="text-h3 mb-16">{plan.name}</h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-h3 text-sage">₹</span>
                <span className="text-[48px] font-bold text-offwhite">{plan.price}</span>
                <span className="text-accent">/ month</span>
              </div>
            </div>

            <ul className="text-left space-y-16 mb-48">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-12 text-small text-accent">
                  <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-sage" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full py-16 rounded-12 font-bold transition-all ${
              plan.featured 
                ? 'bg-sage text-background hover:bg-offwhite' 
                : 'border border-sage text-sage hover:bg-sage/10'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
