
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Manifesto } from './components/Manifesto';
import { EligibilityAI } from './components/EligibilityAI';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EligibilityPage } from './components/EligibilityPage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ApplicationWorkflow } from './components/ApplicationWorkflow';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'eligibility' | 'contact' | 'about' | 'application'>('home');

  useEffect(() => {
    // Simulate a heavy aesthetic load for drama
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (view: 'home' | 'eligibility' | 'contact' | 'about' | 'application') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

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
          <main className="relative z-10">
            {currentView === 'home' && (
               /* Global Background Noise Texture only for home page dark theme usually, but let's keep it */
               <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay" />
            )}
            
            <Navigation onNavigate={navigateTo} currentView={currentView} />
            
            <AnimatePresence mode="wait">
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <section id="hero">
                    <Hero onNavigate={navigateTo} />
                  </section>

                  <section id="manifesto" className="relative z-10">
                    <Manifesto />
                  </section>

                  <section id="journey" className="relative z-10">
                    <Journey />
                  </section>

                  <section id="ai-check" className="relative z-10">
                    <EligibilityAI onNavigate={navigateTo} />
                  </section>
                </motion.div>
              )}
              
              {currentView === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-20"
                >
                  <AboutPage onNavigate={navigateTo} />
                </motion.div>
              )}
              
              {currentView === 'eligibility' && (
                <motion.div
                  key="eligibility"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-20"
                >
                  <EligibilityPage onNavigate={navigateTo} />
                </motion.div>
              )}

              {currentView === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-20"
                >
                  <ContactPage />
                </motion.div>
              )}

               {currentView === 'application' && (
                <motion.div
                  key="application"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-20"
                >
                  <ApplicationWorkflow onNavigate={navigateTo} />
                </motion.div>
              )}
            </AnimatePresence>

            <Footer onNavigate={navigateTo} />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
