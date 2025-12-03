
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { checkEligibility, AnalysisResult } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

// Custom Brand Icon (Sharp Directional Arrow)
const CompoundIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11L22 2L13 21L11 13L3 11Z" />
  </svg>
);

export const EligibilityAI: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    years: '',
    industry: '',
    goal: ''
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const analysis = await checkEligibility(
        formData.name,
        formData.years,
        formData.industry,
        formData.goal
      );
      setResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartApplication = () => {
    navigate('/application');
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-white/20 rounded-none";

  return (
    <div className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background gradient for section */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-brown/20 to-brand-dark" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-brand-orange/10 rounded-full mb-4 border border-brand-orange/20"
          >
            <CompoundIcon className="w-6 h-6 text-brand-orange" />
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Compound Intelligence</h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Not sure if you qualify? Tell our AI about your business, and we'll analyze your fit for the accelerator instantly.
          </p>
        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-none shadow-2xl min-h-[500px] flex flex-col justify-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative w-24 h-24 mb-8">
                  <motion.div
                    className="absolute inset-0 border-4 border-brand-orange/20 rounded-full"
                  />
                  <motion.div
                    className="absolute inset-0 border-4 border-brand-orange border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                      opacity: [0.7, 1, 0.7],
                      rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CompoundIcon className="w-8 h-8 text-brand-orange" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Analyzing Business Data</h3>
                <p className="text-white/50 text-sm uppercase tracking-widest animate-pulse">Consulting Gemini AI Models...</p>
              </motion.div>
            ) : !result ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAnalyze}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Business Name</label>
                    <input
                      required
                      className={inputClasses}
                      placeholder="e.g. Luxe Candles Co."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Years in Business</label>
                    <input
                      required
                      className={inputClasses}
                      placeholder="e.g. 4 years"
                      value={formData.years}
                      onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Industry</label>
                  <select
                    className={inputClasses}
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="" className="bg-brand-dark text-white">Select Industry</option>
                    <option value="Fashion" className="bg-brand-dark text-white">Fashion & Apparel</option>
                    <option value="Beauty" className="bg-brand-dark text-white">Beauty & Cosmetics</option>
                    <option value="Wellness" className="bg-brand-dark text-white">Health & Wellness</option>
                    <option value="Home" className="bg-brand-dark text-white">Home Goods</option>
                    <option value="Food" className="bg-brand-dark text-white">Food & Beverage</option>
                    <option value="Other" className="bg-brand-dark text-white">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Current Growth Goal</label>
                  <textarea
                    required
                    rows={3}
                    className={inputClasses}
                    placeholder="e.g. We want to expand into retail distribution..."
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-colors flex items-center justify-center gap-2 rounded-none group"
                >
                  <CompoundIcon className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  Analyze Eligibility
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  {result.eligible ? (
                    <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500" />
                  ) : (
                    <XCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500" />
                  )}
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {result.eligible ? "You're a Great Match!" : "Might Not Be a Fit Yet"}
                </h3>
                <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-6">
                  <span className="text-sm font-mono">Match Score: {result.score}/100</span>
                </div>

                <div className="bg-black/30 text-left p-6 rounded-none border border-white/5 mb-8">
                  <h4 className="text-brand-orange font-bold mb-2 uppercase text-xs tracking-widest">AI Analysis</h4>
                  <p className="text-white/80 mb-4 text-sm md:text-base">{result.reasoning}</p>
                  <h4 className="text-brand-orange font-bold mb-2 uppercase text-xs tracking-widest">Recommendation</h4>
                  <p className="text-white/80 italic text-sm md:text-base">"{result.recommendation}"</p>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="text-white/50 hover:text-white underline text-sm mb-6 block mx-auto"
                >
                  Check another business
                </button>

                {result.eligible && (
                  <div className="mt-6">
                    <button
                      onClick={handleStartApplication}
                      className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-white text-brand-dark font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors rounded-none"
                    >
                      Start Full Application
                      <CompoundIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
