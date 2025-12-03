
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'home' | 'eligibility' | 'about' | 'application') => void;
}

const ColumnBackground = () => (
  <div className="absolute inset-0 z-0 flex w-full h-full pointer-events-none opacity-20">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.2, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 border-r border-brand-orange/20 h-full bg-gradient-to-b from-brand-orange/5 to-transparent"
      />
    ))}
  </div>
);

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ text, className, delay = 0 }) => {
  return (
    <div className={`flex overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", filter: "blur(10px)", opacity: 0 }}
          animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 pt-20 md:pt-0 bg-brand-dark">
      <ColumnBackground />

      {/* Background Atmospheric Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full bg-brand-orange blur-[120px] opacity-10 animate-pulse" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-brand-brown blur-[100px] opacity-20" />
      </div>

      <div className="relative z-10 w-full mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <span className="text-white/50 uppercase tracking-[0.2em] text-xs sm:text-sm">From SoPlugged</span>
          <div className="hidden sm:block h-[1px] w-12 bg-brand-orange/50" />
          <span className="text-brand-orange uppercase tracking-[0.2em] text-xs sm:text-sm font-bold">To Compound</span>
        </motion.div>

        {/* Marquee Headline with Alpha Mask */}
        <div className="w-full overflow-hidden mb-8 md:mb-12 flex flex-col gap-2 md:gap-4 pointer-events-none relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark w-full h-full pointer-events-none" />
          
          {/* Row 1: GROWTH (Scrolls Left) */}
          <div className="flex whitespace-nowrap mask-linear-fade">
            <motion.div
              className="flex gap-4 md:gap-12"
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity
              }}
            >
              {[...Array(8)].map((_, i) => (
                <StaggeredText 
                  key={`growth-${i}`} 
                  text="GROWTH" 
                  delay={0.5}
                  className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white" 
                />
              ))}
            </motion.div>
          </div>

          {/* Row 2: ACCELERATED (Scrolls Right) */}
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex gap-4 md:gap-12"
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity
              }}
            >
              {[...Array(8)].map((_, i) => (
                <span key={`accel-${i}`} className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-peach to-white">
                  ACCELERATED
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light px-4"
        >
          We have evolved. SoPlugged is now <strong className="text-white">Compound Accelerator</strong>.
          A world where bootstrapped consumer brands get the capital, community, and clarity to scale sustainably.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto px-4"
        >
          <button
            onClick={() => onNavigate('eligibility')}
            className="group relative px-8 py-4 bg-brand-orange overflow-hidden w-full sm:w-auto flex justify-center rounded-none"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative font-bold text-white uppercase tracking-widest flex items-center gap-2">
              Check Eligibility <ArrowRight className="w-4 h-4" />
            </span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-white/60 hover:text-white uppercase tracking-widest text-sm font-medium transition-colors border-b border-transparent hover:border-brand-orange pb-1"
          >
            Explore the Journey
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-orange to-transparent" />
      </motion.div>
    </div>
  );
};
