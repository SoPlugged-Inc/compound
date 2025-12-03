
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

// Custom Brand Icon (Sharp Directional Arrow)
const CompoundIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11L22 2L13 21L11 13L3 11Z" />
  </svg>
);

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    alert("Message sent! (Simulation)");
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 text-white px-4 py-4 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-white/20 rounded-none font-light";
  const labelClasses = "block text-xs uppercase tracking-widest text-brand-orange mb-2 font-bold";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-dark text-white relative overflow-x-hidden font-body pt-32 pb-20"
    >
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-orange/30 rounded-full mb-6 bg-brand-orange/5">
            <CompoundIcon className="w-3 h-3 text-brand-orange" />
            <span className="text-xs font-mono text-brand-orange uppercase tracking-wider">Get in Touch</span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight tracking-tight">
            Send us a message
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Have questions about Compound? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 relative"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-orange/50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-orange/50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-orange/50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-orange/50" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={inputClasses}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className="group">
                <label className={labelClasses}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className={inputClasses}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
            </div>

            <div className="group">
              <label className={labelClasses}>Subject</label>
              <input
                type="text"
                required
                placeholder="What is this regarding?"
                className={inputClasses}
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              />
            </div>

            <div className="group">
              <label className={labelClasses}>Message</label>
              <textarea
                required
                rows={6}
                placeholder="Tell us more about your inquiry..."
                className={`${inputClasses} resize-none`}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full group relative px-8 py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 rounded-none flex items-center justify-center gap-3"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm">
            Prefer email? Reach us directly at <a href="mailto:hello@compoundaccelerator.ca" className="text-brand-orange hover:underline">hello@compoundaccelerator.ca</a>
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};
