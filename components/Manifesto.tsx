
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const SpotlightCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative p-6 md:p-8 border border-white/10 bg-white/5 rounded-none overflow-hidden group"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(253,95,0,0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 p-4 bg-brand-dark w-fit border border-brand-orange/30 group-hover:border-brand-orange/100 transition-colors">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-orange" />
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-white">{title}</h3>
        <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const rotatingContent = [
  {
    text: "Running a business is hard.",
    subtext: "It demands everything you have."
  },
  {
    text: "Running it alone is impossible.",
    subtext: "Isolation kills more dreams than lack of capital."
  },
  {
    text: "Scaling requires structure.",
    subtext: "Systems beat willpower every time."
  }
];

export const Manifesto: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rotatingContent.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + rotatingContent.length) % rotatingContent.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 md:py-24 px-4 md:px-6 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">

          {/* Rotating Content Card */}
          <div className="relative h-[200px] md:h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                  {rotatingContent[currentIndex].text.split(' ').map((word, i, arr) => (
                    <span key={i} className={i >= arr.length - 2 ? "text-brand-orange" : "text-white"}>
                      {word}{i < arr.length - 1 ? '\u00A0' : ''}
                    </span>
                  ))}
                </h2>
                <p className="text-white/50 text-lg md:text-xl font-light">
                  {rotatingContent[currentIndex].subtext}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-0 right-0 flex gap-4">
              <button onClick={prevSlide} className="p-2 border border-white/20 hover:border-brand-orange hover:text-brand-orange transition-colors rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="p-2 border border-white/20 hover:border-brand-orange hover:text-brand-orange transition-colors rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed border-l-2 border-brand-orange pl-6">
              Compound exists to give founders the structured support, expert insight, and community they need to move their businesses forward. We are designed for the bootstrapped, the persistent, and the visionaries.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <SpotlightCard
            index={0}
            icon={Target}
            title="Strategic Clarity"
            description="Move beyond the experimental phase. We provide the blueprints for operational efficiency and sustainable scaling for physical product brands."
          />
          <SpotlightCard
            index={1}
            icon={Users}
            title="Curated Community"
            description="Connect with founders who have been in the trenches for 3+ years. A network of peers in fashion, beauty, wellness, and home goods."
          />
          <SpotlightCard
            index={2}
            icon={Zap}
            title="Capital & Tools"
            description="Access to the tools, knowledge, and potential capital networks needed to grow without the confusion that typically plagues entrepreneurship."
          />
        </div>
      </div>
    </div>
  );
};
