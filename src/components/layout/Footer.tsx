"use client";
import React from 'react';
import { Home, User, Mail, Send } from 'lucide-react';

const Footer = () => {
  const SocialIcons = [
    { Icon: Home, href: "#" },
    { Icon: User, href: "#" },
    { Icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-primary/30 pt-128 pb-48 px-32 border-t border-offwhite/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-64 mb-80">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-8 mb-24">
            <div className="w-32 h-32 bg-sage rounded-full flex items-center justify-center">
              <span className="text-background font-bold">Y</span>
            </div>
            <span className="text-h3 font-bold uppercase tracking-wider">Yoga Balance</span>
          </div>
          <p className="text-accent text-small leading-relaxed mb-32 max-w-sm">
            Yoga Balance is a holistic platform dedicated to helping you achieve balance in mind, body and soul.
          </p>
          <div className="flex gap-16">
            {SocialIcons.map(({ Icon, href }, i) => (
              <a key={i} href={href} className="w-40 h-40 border border-offwhite/10 rounded-full flex items-center justify-center text-accent hover:text-sage hover:border-sage transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-32 text-offwhite">Quick Links</h4>
          <ul className="space-y-16 text-accent text-small">
            <li><a href="#" className="hover:text-sage transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-sage transition-colors">Classes</a></li>
            <li><a href="#" className="hover:text-sage transition-colors">Instructors</a></li>
            <li><a href="#" className="hover:text-sage transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-32 text-offwhite">Contact Us</h4>
          <ul className="space-y-16 text-accent text-small">
            <li>+91 98765 43210</li>
            <li>hello@yogabalance.com</li>
            <li>123 Yoga Street, Rishikesh, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-32 text-offwhite">Newsletter</h4>
          <p className="text-accent text-small mb-24">Stay updated with our latest classes and offers.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-background border border-offwhite/10 rounded-12 px-16 py-12 text-small focus:outline-none focus:border-sage transition-colors"
            />
            <button className="absolute right-8 top-1/2 -translate-y-1/2 text-sage hover:text-offwhite">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-32 border-t border-offwhite/5 text-center text-accent text-small">
        © 2024 Yoga Balance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
