
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EligibilityPage } from './components/EligibilityPage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ApplicationWorkflow } from './components/ApplicationWorkflow';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/eligibility" element={<EligibilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/application" element={<ApplicationWorkflow />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a heavy aesthetic load for drama
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark font-body text-brand-cream selection:bg-brand-orange selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-brand-orange font-display font-bold text-4xl tracking-tighter"
            >
              COMPOUND
            </motion.div>
          </motion.div>
        ) : (
          <Router>
            <main className="relative z-10">
              {/* Global Background Noise Texture */}
              <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay" />

              <Navigation />
              <AnimatedRoutes />
              <Footer />
            </main>
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}
