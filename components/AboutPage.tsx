
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Users, Zap, Heart, Award, Globe } from 'lucide-react';
import { Journey } from './Journey';
import { useNavigate } from 'react-router-dom';

const ValueCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-8 border border-white/10 bg-white/5 rounded-none group h-full overflow-hidden"
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
        <div className="mb-6 p-3 bg-brand-dark border border-white/10 w-fit group-hover:border-brand-orange transition-colors">
          <Icon className="w-6 h-6 text-brand-orange" />
        </div>
        <h3 className="font-display font-bold text-xl text-white mb-4">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-dark text-white relative overflow-x-hidden font-body"
    >
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30" />

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-32 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight text-white">
            We help consumer brands <br />
            <span className="text-brand-orange">scale faster</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Compound is designed to give founders the structure and support they need to scale successfully.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate('/application')}
              className="px-8 py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none w-full sm:w-auto"
            >
              Apply Now
            </button>
            <button
              onClick={() => navigate('/recap')}
              className="text-white/60 hover:text-white hover:underline underline-offset-4 uppercase tracking-widest text-sm font-medium transition-colors flex items-center gap-2"
            >
              Watch Our Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Why We Exist */}
      <section className="relative z-10 py-20 px-4 md:px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl mb-8 text-white"
          >
            Why We Exist
          </motion.h2>
          <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Black consumer brand founders in Canada had no real infrastructure. No validation layer. No capital pathways. No one in their corner who really got what they were building.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              So we built Compound. A modern accelerator and growth platform for emerging brands—especially those who've been bootstrapping, or building in isolation.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              We remove friction, open doors, and increase the odds of success for founders who usually get left out of the conversation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative z-10 py-20 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="font-display font-bold text-5xl md:text-6xl text-brand-orange">$850K+</div>
            <div className="text-white/50 uppercase tracking-widest text-sm">Revenue Generated</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <div className="font-display font-bold text-5xl md:text-6xl text-brand-orange">12</div>
            <div className="text-white/50 uppercase tracking-widest text-sm">Major Markets</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="font-display font-bold text-5xl md:text-6xl text-brand-orange">100%</div>
            <div className="text-white/50 uppercase tracking-widest text-sm">Canadian Focus</div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative z-10 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-white">Our Core Values</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              These principles guide how we support founders who are building authentic brands that reflect their heritage and serve their communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard
              index={0}
              icon={Target}
              title="Purpose-Driven Growth"
              description="We believe every founder deserves a clear path to meaningful business advancement and personal fulfillment, especially those building authentic brands that reflect their heritage."
            />
            <ValueCard
              index={1}
              icon={Users}
              title="Community-Led Impact"
              description="Success is amplified through genuine connections, shared experiences, and collaborative learning environments that understand the unique journey of Black entrepreneurs."
            />
            <ValueCard
              index={2}
              icon={Zap}
              title="Continuous Innovation"
              description="We continuously evolve our methods, embracing new approaches to accelerate business development while breaking traditional barriers to entry."
            />
            <ValueCard
              index={3}
              icon={Heart}
              title="Trust & Vulnerability"
              description="We foster trust, vulnerability, and genuine care in all our mentorship and community interactions, amplifying voices that deserve to be heard."
            />
            <ValueCard
              index={4}
              icon={Award}
              title="Excellence & Quality"
              description="We maintain the highest quality in our programs, mentors, and member experiences without compromise, creating sustainable businesses that build generational wealth."
            />
            <ValueCard
              index={5}
              icon={Globe}
              title="Empowerment"
              description="We empower individuals to become catalysts for positive change in their industries and communities, opening doors typically closed to underrepresented founders."
            />
          </div>
        </div>
      </section>

      {/* Reuse existing Journey Component */}
      <section className="relative z-10 border-t border-white/5">
        <Journey />
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-brand-orange p-8 md:p-16 text-center relative overflow-hidden rounded-none group">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 mix-blend-overlay" />

          {/* CTA Background Animation */}
          <div className="absolute -inset-full w-[300%] h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">Ready to Elevate Your Brand?</h2>
            <p className="text-white/90 text-lg md:text-xl font-light mb-10">Compound helps you get discovered, funded, and supported.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => navigate('/application')}
                className="px-8 py-4 bg-brand-dark text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-colors rounded-none w-full sm:w-auto"
              >
                Start Your Application
              </button>
              <button
                onClick={() => navigate('/eligibility')}
                className="text-white hover:underline underline-offset-4 flex items-center gap-2 font-medium"
              >
                View Membership Criteria <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
