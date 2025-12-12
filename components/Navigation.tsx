
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b ${isLightMode ? 'border-gray-200' : 'border-white/5'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className={`relative z-50 font-display font-bold text-xl tracking-tighter ${textColor} group`}>
            COMPOUND<span className="text-brand-orange group-hover:text-white transition-colors duration-300">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              to="/about"
              className={`text-sm font-medium ${isActive('/about') ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              About
            </Link>

            <Link
              to="/eligibility"
              className={`text-sm font-medium ${isActive('/eligibility') ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              Eligibility
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium ${isActive('/blog') ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              Stories
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${isActive('/contact') ? 'text-brand-orange' : (isLightMode ? 'text-gray-600' : 'text-white/70')} hover:${hoverColor} transition-colors uppercase tracking-widest`}
            >
              Contact
            </Link>

            <Link
              to="/application"
              className="relative group overflow-hidden px-6 py-3 bg-brand-dark text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-none"
            >
              {/* Border Beam Effect */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#FD5F00_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Inner Background to mask the center of the beam */}
              <div className="absolute inset-[1px] bg-brand-orange z-0 group-hover:bg-brand-dark transition-colors duration-300" />

              <span className="relative z-10 group-hover:text-brand-orange transition-colors">Apply Now</span>
            </Link>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                >
                  Home
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                >
                  About
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/eligibility"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                >
                  Eligibility
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                >
                  Stories
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                >
                  Contact
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/application"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block px-8 py-4 bg-brand-orange text-white font-bold uppercase tracking-widest mt-4 rounded-none"
                >
                  Apply Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
