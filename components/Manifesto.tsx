
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Zap, ChevronLeft, ChevronRight, Layout, RefreshCw, MessageCircle, Store } from 'lucide-react';

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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-6 md:p-8 border border-white/10 bg-white/5 rounded-none overflow-hidden group h-full flex flex-col"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(253,95,0,0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 p-4 bg-brand-dark w-fit border border-brand-orange/30 group-hover:border-brand-orange/100 transition-colors">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-orange" />
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl mb-4 text-white">{title}</h3>
        <p className="text-white/60 leading-relaxed font-light text-sm md:text-base flex-grow">
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
                  <span className="text-white">
                    {rotatingContent[currentIndex].text.split(' ').slice(0, -2).join(' ')}
                  </span>{' '}
                  <span className="text-brand-orange">
                    {rotatingContent[currentIndex].text.split(' ').slice(-2).join(' ')}
                  </span>
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
              Compound exists to give founders the structured support, expert insight, and community they need to move their businesses forward. We are designed for the "Kitchen Table CEOs"—the bootstrapped and the persistent.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpotlightCard
            index={0}
            icon={Target}
            title="Operational Strategy"
            description="&quot;More sales&quot; can bankrupt you if your margins are wrong. We map out your pricing, logistics, and marketing calendar so you scale profitably, not painfully."
          />
          <SpotlightCard
            index={1}
            icon={Layout}
            title="E-commerce Optimization"
            description="A pretty website is useless if it doesn't convert. We build high-converting storefronts designed to move units, not just look good."
          />
          <SpotlightCard
            index={2}
            icon={RefreshCw}
            title="The Barter Economy"
            description="Cash flow is the #1 killer. Trade what you have (product) for what you need (photography, accounting) within our trusted network. Keep your cash for inventory."
          />
          <SpotlightCard
            index={3}
            icon={MessageCircle}
            title="Group Therapy"
            description="Building a brand is lonely. We provide structured, safe spaces to unpack the mental toll of entrepreneurship. We treat your mental health as a critical business asset."
          />
          <SpotlightCard
            index={4}
            icon={Store}
            title="Brand Activation"
            description="You can't smell a candle or taste a sauce through Instagram. We leverage our network to get your product into customers' hands—from sampling stations to pop-ups."
          />
          <SpotlightCard
            index={5}
            icon={Users}
            title="Community Accountability"
            description="Iron sharpens iron. Connect with serious founders who are actually building. Share vendor contacts, grant opportunities, and real-time market insights."
          />
        </div>
      </div>
    </div>
  );
};
