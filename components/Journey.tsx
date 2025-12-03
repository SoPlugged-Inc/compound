import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "2021",
    title: "SoPlugged Founded",
    description: "Started with a vision to empower Black entrepreneurs across Canada through community and connection."
  },
  {
    year: "2022",
    title: "First 200 Businesses",
    description: "Built Canada's largest directory of Black-owned businesses spanning major cities from coast to coast."
  },
  {
    year: "2023",
    title: "Community Expansion",
    description: "Launched The Business Mindset Podcast and PluggedIn events, connecting entrepreneurs nationwide."
  },
  {
    year: "2024",
    title: "500+ Success Stories",
    description: "Celebrated over 500 businesses growing through our platform, events, and community support."
  },
  {
    year: "2025",
    title: "Accelerator Launch",
    description: "Evolved into Compound - Canada's first consumer brand accelerator, combining capital with community."
  }
];

export const Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="py-20 md:py-32 px-4 md:px-6 bg-brand-dark overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center"
        >
          <h2 className="font-display font-bold text-4xl md:text-7xl text-brand-cream mb-4 md:mb-6">Our Journey</h2>
          <p className="text-brand-orange uppercase tracking-widest font-bold text-sm md:text-base">The path to Compound</p>
        </motion.div>

        <div className="relative">
          {/* Central Line - Left aligned on mobile, Center on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-orange/0 via-brand-orange to-brand-orange/0 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box */}
                <div className="flex-1 pl-12 md:pl-0 md:w-1/2">
                   <div className={`md:p-8 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-cream mb-2">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base">{item.description}</p>
                   </div>
                </div>

                {/* Year Bubble */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 md:w-12 md:h-12 -translate-x-1/2 rounded-full bg-brand-orange border md:border-4 border-brand-dark z-10 flex items-center justify-center mt-2 md:mt-0">
                    <div className="hidden md:block w-2 h-2 bg-white rounded-full" />
                </div>
                 
                {/* Big Year Label (Decorative) */}
                <div className={`flex-1 pl-12 md:pl-0 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <span className="font-display font-black text-5xl md:text-8xl text-white/5 md:px-8">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};