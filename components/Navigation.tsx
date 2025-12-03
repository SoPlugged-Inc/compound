
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (view: 'home' | 'eligibility' | 'contact' | 'about' | 'application') => void;
  currentView: 'home' | 'eligibility' | 'contact' | 'about' | 'application';
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView }) => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Force dark mode styles
  const isLightMode = false; 

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    isLightMode ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"] : ["rgba(25, 10, 0, 0)", "rgba(25, 10, 0, 0.9)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(16px)"]
  );

  const textColor = isLightMode ? "text-brand-dark" : "text-white";
  const hoverColor = "text-brand-orange";

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b ${isLightMode ? 'border-gray-200' : 'border-white/5'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => onNavigate('home')} className={`relative z-50 font-display font-bold text-xl tracking-tighter ${textColor} group`}>
            COMPOUND<span className="text-brand-orange group-hover:text-white transition-colors duration-300">.</span>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium ${currentView === 'about' ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              About
            </button>

            <button
              onClick={() => onNavigate('eligibility')}
              className={`text-sm font-medium ${currentView === 'eligibility' ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              Eligibility
            </button>
             <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium ${currentView === 'contact' ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              Contact
            </button>

            <button
               onClick={() => onNavigate('application')}
               className="relative group overflow-hidden px-6 py-3 bg-brand-dark text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-none"
            >
              {/* Border Beam Effect */}
              <div className="absolute inset-0 z-0">
                 <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#FD5F00_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Inner Background to mask the center of the beam */}
              <div className="absolute inset-[1px] bg-brand-orange z-0 group-hover:bg-brand-dark transition-colors duration-300" />
              
              <span className="relative z-10 group-hover:text-brand-orange transition-colors">Apply Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden relative z-50 ${textColor} focus:outline-none hover:text-brand-orange transition-colors`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <motion.button
                 onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
              >
                Home
              </motion.button>
              
              <motion.button
                 onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
              >
                About
              </motion.button>

              <motion.button
                 onClick={() => { onNavigate('eligibility'); setIsMobileMenuOpen(false); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
              >
                Eligibility
              </motion.button>
              
              <motion.button
                 onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.35 }}
                 className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
              >
                Contact
              </motion.button>

              <motion.button
                onClick={() => { onNavigate('application'); setIsMobileMenuOpen(false); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-8 py-4 bg-brand-orange text-white font-bold uppercase tracking-widest mt-4 rounded-none"
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
