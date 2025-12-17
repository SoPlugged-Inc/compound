import React, { useState } from 'react';
import { Mail, MapPin, Instagram, Linkedin, Check, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// TODO: User must set this URL from the Setup Guide
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXK04DLMCDUgDSy96vNKMcRQZY2yh-_yPD9dNQ0AuLN1jVxDO-xQL7t1wMZJAfYtGX/exec";

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNav = (e: React.MouseEvent, path: string, sectionId?: string) => {
    e.preventDefault();
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView();
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (GOOGLE_SCRIPT_URL === "YOUR_SCRIPT_URL_HERE") {
      alert("Newsletter is not connected yet! Please check SETUP_NEWSLETTER.md");
      return;
    }

    setStatus('submitting');

    try {
      // Robustness: Send data as query params to avoid body parsing issues
      const targetUrl = new URL(GOOGLE_SCRIPT_URL);
      targetUrl.searchParams.append('email', email);
      targetUrl.searchParams.append('timestamp', new Date().toISOString());

      await fetch(targetUrl.toString(), {
        method: 'POST',
        mode: 'no-cors'
      });

      // Since no-cors returns an opaque response, we assume success if no error was thrown
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error("Subscription Error:", err);
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        <div className="max-w-md">
          <h2 className="font-display font-bold text-2xl text-white mb-6">COMPOUND<span className="text-brand-orange">.</span></h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Compound is a safe space for Black entrepreneurs. We welcome anyone who identifies as Black, Mixed-race individuals, or part of the African diaspora.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@compoundaccelerator.ca"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-orange transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:text-brand-orange transition-colors" />
              hello@compoundaccelerator.ca
            </a>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MapPin className="w-4 h-4" />
              Toronto, Canada
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full md:w-auto mt-8 md:mt-0">

          {/* Links Section */}
          <div className="flex gap-12">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={(e) => handleNav(e, '/', 'hero')} className="hover:text-brand-orange transition-colors text-left w-full">Home</button></li>
                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">About</Link></li>
                <li><Link to="/eligibility" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">Eligibility</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="https://www.linkedin.com/company/soplugged/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/soplugged/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center gap-2">
                    Instagram
                  </a>
                </li>
                <li>
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-orange transition-colors text-left w-full block">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="max-w-xs relative z-10">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Stay in the Loop</h4>
            <p className="text-sm text-white/50 mb-4">
              Get the latest updates on grant opportunities and community events.
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-2 text-brand-orange font-bold text-sm bg-brand-orange/10 p-3 rounded border border-brand-orange/20 animate-in fade-in duration-300">
                <Check className="w-4 h-4" />
                <span>You're on the list!</span>
              </div>
            ) : (
              <form
                className={`flex border-b border-white/20 pb-2 transition-colors ${status === 'submitting' ? 'opacity-50 cursor-wait' : 'focus-within:border-brand-orange'}`}
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'submitting'}
                  className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/20 relative z-10"
                />
                <button
                  disabled={status === 'submitting'}
                  className="text-brand-orange hover:text-white transition-colors uppercase text-xs font-bold tracking-widest disabled:opacity-50 relative z-10"
                >
                  {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 gap-4 md:gap-0 text-center md:text-left">
        <p>&copy; 2025 Compound Accelerator. All rights reserved.</p>
        <p>Originally <a href="https://www.soplugged.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SoPlugged</a>.</p>
      </div>
    </footer>
  );
};
