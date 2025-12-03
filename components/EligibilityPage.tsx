
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, ArrowRight, AlertCircle, Sparkles, Target, User, Zap, Plus, Minus } from 'lucide-react';

interface EligibilityPageProps {
  onNavigate: (view: 'home' | 'eligibility' | 'application') => void;
}

const CriteriaCard = ({ icon: Icon, title, items, index }: { icon: any, title: string, items: string[], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative p-8 border border-white/10 bg-white/5 hover:border-brand-orange/50 transition-colors duration-500 rounded-none overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
      <span className="font-mono text-xs text-brand-orange">0{index + 1}</span>
    </div>
    
    <div className="mb-6 flex items-center gap-4">
      <div className="p-3 bg-brand-dark border border-white/10 group-hover:border-brand-orange/50 transition-colors">
        <Icon className="w-6 h-6 text-brand-orange" />
      </div>
      <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">{title}</h3>
    </div>

    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors">
          <div className="mt-1.5 w-1.5 h-1.5 bg-brand-orange shrink-0" />
          <span className="font-light text-sm md:text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProcessStep = ({ number, title, duration, description }: { number: number, title: string, duration: string, description: string }) => (
  <div className="relative pl-12 md:pl-16 py-8 group">
    {/* Vertical Line */}
    <div className="absolute left-[19px] md:left-[27px] top-0 bottom-0 w-px bg-white/10 group-hover:bg-brand-orange/50 transition-colors" />
    
    {/* Node */}
    <div className="absolute left-0 md:left-2 top-8 w-10 h-10 md:w-12 md:h-12 bg-brand-dark border border-brand-orange text-brand-orange flex items-center justify-center font-display font-bold text-lg z-10 group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>

    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
      <h3 className="font-display font-bold text-xl text-white">{title}</h3>
      <span className="self-start md:self-auto px-3 py-1 text-xs font-mono text-brand-dark bg-brand-cream uppercase tracking-wider">
        {duration}
      </span>
    </div>
    <p className="text-white/60 font-light max-w-2xl">{description}</p>
  </div>
);

const EligibilityFaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group hover:bg-white/5 px-4 transition-colors"
      >
        <span className="font-display font-bold text-lg text-white group-hover:text-brand-orange transition-colors pr-8">
          {question}
        </span>
        <span className="shrink-0 text-brand-orange">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 text-white/60 leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'criteria' | 'process' | 'faq'>('criteria');

  const faqs = [
    {
      question: "Is there a cost to join Compound?",
      answer: "Yes. Our annual membership fee is $250, which covers access to exclusive learning materials, funding opportunities, retail matchmaking, and brand-building infrastructure."
    },
    {
      question: "I'm not full-time in my business—can I still apply?",
      answer: "Yes! Many of our founders are balancing other commitments. However, we look for founders who treat their business as a business, not just a side hustle. You must be willing to dedicate consistent time to growth activities."
    },
    {
      question: "I haven't made a lot of sales yet. Should I still apply?",
      answer: "We recommend applying if you have at least some consistent monthly sales (even if small) and evidence of product-market fit. If you are completely pre-revenue with no product in market, you might be too early."
    },
    {
      question: "What happens after I apply?",
      answer: "Our admissions team reviews applications on a rolling basis. If you are a good fit, you will be invited to a short video interview. Accepted founders are then matched with a cohort and onboarding begins immediately."
    },
    {
      question: "Is this like a course or mentorship program?",
      answer: "Compound is an accelerator and community infrastructure. While we provide educational playbooks and mentorship, the focus is on execution, capital readiness, and retail access—not just 'learning'."
    },
    {
      question: "Will you invest in every brand that joins?",
      answer: "No. Funding is not guaranteed. We provide the network and opportunities to pitch to investors and access capital, but investment decisions are made independently by our partners."
    },
    {
        question: "Can I reapply if I'm not accepted the first time?",
        answer: "Absolutely. We encourage founders to continue building and reapply once they have hit more traction milestones."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white relative overflow-x-hidden font-body">
       {/* Noise Texture Overlay */}
       <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30" />

      {/* Hero Section - Adjusted padding to clear global fixed header */}
      <section className="relative z-10 px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-24 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-8 leading-tight tracking-tight text-white">
            Not every brand is ready for <br className="hidden md:block" />
            Compound and <span className="text-brand-orange">that’s the point.</span>
          </h1>
          
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-24 bg-brand-orange/50" />
            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
              While our membership is designed for early-stage consumer brands, our value is in the quality of the network.
            </p>
             <button 
              onClick={() => onNavigate('application')}
              className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none group"
            >
              Start your Application
            </button>
          </div>
        </motion.div>
      </section>

      {/* Tab Navigation - Control Panel Style */}
      <div className="sticky top-[73px] z-30 bg-brand-dark/80 backdrop-blur-md border-y border-white/10 mb-16">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-start px-4 md:px-6 overflow-x-auto hide-scrollbar">
          <div className="flex">
            {['criteria', 'process', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`relative px-8 py-6 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'text-brand-dark' : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="relative z-10">
                    {tab === 'criteria' ? 'The Criteria' : tab === 'process' ? 'The Protocol' : 'FAQ'}
                </span>
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-cream"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-32">
        <AnimatePresence mode="wait">
          
          {/* CRITERIA TAB */}
          {activeTab === 'criteria' && (
            <motion.div 
              key="criteria"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Intro & Highlight */}
                <div className="lg:sticky lg:top-32 h-fit space-y-8">
                  <div>
                    <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-white">What We Seek</h2>
                    <p className="text-white/50 text-lg max-w-md">We don't just look at revenue. We look for traction, clarity, and the grit to scale.</p>
                  </div>

                  <div className="p-8 border border-brand-orange/30 bg-brand-orange/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <AlertCircle className="text-brand-orange w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-orange mb-4 uppercase">Important Note</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Meeting these criteria doesn't guarantee acceptance. We review holistically based on program fit, contribution potential, and alignment with our values.
                    </p>
                  </div>
                </div>

                {/* Right Column: The Grid */}
                <div className="grid grid-cols-1 gap-6">
                  <CriteriaCard 
                    index={0}
                    icon={Clock}
                    title="Commitment"
                    items={[
                      "Showing up consistently for your business",
                      "Treating it like a business, not a side hustle",
                      "Ready to dedicate time to growth activities",
                      "Committed to long-term building"
                    ]}
                  />
                   <CriteriaCard 
                    index={1}
                    icon={Target}
                    title="Product-Market Fit"
                    items={[
                      "Products resonate with your audience",
                      "Consistent monthly sales (even if small)",
                      "Evidence of customer demand",
                      "Clear understanding of target market"
                    ]}
                  />
                   <CriteriaCard 
                    index={2}
                    icon={Zap}
                    title="Growth Potential"
                    items={[
                      "Positioned to scale with support",
                      "Open to learning and potentially raising capital",
                      "Ready to scale into retail or expand distribution",
                      "Clear vision for expansion"
                    ]}
                  />
                   <CriteriaCard 
                    index={3}
                    icon={User}
                    title="Founder Mindset"
                    items={[
                      "Adaptable, coachable, open to feedback",
                      "Collaborative approach to relationships",
                      "Resilient in face of challenges",
                      "Continuous learning orientation"
                    ]}
                  />
                  <div className="p-8 border border-white/10 bg-transparent">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-2 border border-white/30 text-xs font-mono text-white/50">REQ-05</div>
                      <h3 className="font-display font-bold text-xl text-white uppercase">Brand Identity</h3>
                    </div>
                    <div className="space-y-2 text-white/60 font-mono text-sm">
                      <p>+ Product-based business</p>
                      <p>+ Fashion, Beauty, Wellness, Home, Food & Bev</p>
                      <p>+ Active sales (Online/Retail)</p>
                      <p>+ Unique Value Proposition</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROCESS TAB */}
          {activeTab === 'process' && (
            <motion.div 
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                   <h2 className="font-display font-bold text-3xl md:text-5xl mb-12 text-white">The Sequence</h2>
                   <div className="space-y-0">
                    <ProcessStep 
                      number={1} 
                      title="Initial Application" 
                      duration="5-10 MINS"
                      description="Complete our comprehensive application form with your background, goals, and motivations."
                    />
                    <ProcessStep 
                      number={2} 
                      title="Application Review" 
                      duration="3-5 DAYS"
                      description="Our team reviews your application against our membership criteria and program fit."
                    />
                    <ProcessStep 
                      number={3} 
                      title="Interview Process" 
                      duration="45-60 MINS"
                      description="Selected candidates participate in a video interview to discuss goals and program alignment."
                    />
                    <ProcessStep 
                      number={4} 
                      title="Program Matching" 
                      duration="1-2 DAYS"
                      description="We match accepted candidates with the most suitable program track and mentor."
                    />
                     <ProcessStep 
                      number={5} 
                      title="Onboarding" 
                      duration="1 WEEK"
                      description="Welcome to the community! Complete onboarding and begin your Compound cohort journey."
                    />
                   </div>
                </div>

                <div className="md:pt-32">
                  <div className="sticky top-32 p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                     <div className="flex items-center gap-3 mb-6">
                       <Sparkles className="w-5 h-5 text-brand-orange" />
                       <h3 className="font-display font-bold text-xl text-white uppercase">The Interview</h3>
                     </div>
                     
                     <div className="space-y-8">
                        <div>
                          <h4 className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Discussion Vector</h4>
                          <ul className="space-y-2 text-sm text-white/60">
                            <li>• Business background & current state</li>
                            <li>• Entrepreneurial goals</li>
                            <li>• Motivation for Compound</li>
                            <li>• Commitment capability</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Prep Data</h4>
                          <ul className="space-y-2 text-sm text-white/60">
                            <li>• Review program structure</li>
                            <li>• Success metrics</li>
                            <li>• Community expectations</li>
                          </ul>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

           {/* FAQ TAB */}
           {activeTab === 'faq' && (
            <motion.div 
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-white">FAQs</h2>
                <p className="text-white/50 text-lg">Common questions about joining the network.</p>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <EligibilityFaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Persistent Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-brand-dark border-t border-white/10 z-40">
        <button 
          onClick={() => onNavigate('application')}
          className="flex items-center justify-center w-full py-4 bg-brand-orange text-white font-bold uppercase tracking-widest rounded-none"
        >
          Start Application
        </button>
      </div>

    </div>
  );
};
