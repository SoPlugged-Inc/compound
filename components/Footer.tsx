
import React from 'react';
import { Mail, MapPin, Instagram, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNav = (e: React.MouseEvent, path: string, sectionId?: string) => {
    e.preventDefault();
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView();
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        <div className="max-w-md">
          <h2 className="font-display font-bold text-2xl text-white mb-6">COMPOUND<span className="text-brand-orange">.</span></h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Compound is a safe space for Black entrepreneurs. We welcome anyone who identifies as Black, Mixed-race individuals, or part of the African diaspora.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@compoundaccelerator.ca"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-orange transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:text-brand-orange transition-colors" />
              hello@compoundaccelerator.ca
            </a>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MapPin className="w-4 h-4" />
              Toronto, Canada
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 w-full md:w-auto mt-8 md:mt-0">
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><button onClick={(e) => handleNav(e, '/', 'hero')} className="hover:text-brand-orange transition-colors text-left w-full">Home</button></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">About</Link></li>
              <li><Link to="/eligibility" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">Eligibility</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="https://www.linkedin.com/company/soplugged/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/soplugged/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                  Instagram
                </a>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 gap-4 md:gap-0 text-center md:text-left">
        <p>&copy; 2025 Compound Accelerator. All rights reserved.</p>
        <p>Originally <a href="https://www.soplugged.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SoPlugged</a>.</p>
      </div>
    </footer>
  );
};
