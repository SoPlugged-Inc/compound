
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

// Custom Brand Icon (Sharp Directional Arrow)
const CompoundIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11L22 2L13 21L11 13L3 11Z" />
    </svg>
);

export const EligibilityCheck: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        startDate: '', // 'Just Starting', 'Less than one (1) year ago', etc.
        industry: '',
        email: ''
    });

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to application with state
        navigate('/application', { state: { prefill: formData } });
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-white/20 rounded-none";

    return (
        <div className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
            {/* Background gradient for section */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-brown/20 to-brand-dark" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Is This You? Section Removed */}

                <div className="text-center mb-8 md:mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="inline-flex items-center justify-center p-4 bg-brand-orange/10 rounded-full mb-4 border border-brand-orange/20"
                    >
                        <CompoundIcon className="w-6 h-6 text-brand-orange" />
                    </motion.div>
                    <h2 className="font-display font-bold text-3xl md:text-5xl mb-8">Ready to Compound?</h2>

                    <div className="max-w-2xl mx-auto mb-10 text-left">
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5">
                                <CheckCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                                <p className="text-white/80 text-sm md:text-base font-light">
                                    You'll need about 4 minutes and a link to your active website or business Instagram.
                                </p>
                            </div>
                            <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5">
                                <CheckCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                                <p className="text-white/80 text-sm md:text-base font-light">
                                    We review every submission personally. Incomplete applications will be skipped.
                                </p>
                            </div>
                            <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5">
                                <CheckCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                                <p className="text-white/80 text-sm md:text-base font-light">
                                    Membership is <strong className="text-white"> $250 CAD/year</strong>. We do not take equity or charge hidden fees.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-none shadow-2xl flex flex-col justify-center"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <form onSubmit={handleStart} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Business Name</label>
                                <input
                                    required
                                    className={inputClasses}
                                    placeholder="e.g. Luxe Candles Co."
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className={inputClasses}
                                    placeholder="hello@yoursite.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Industry</label>
                                <select
                                    required
                                    className={inputClasses}
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                >
                                    <option value="" className="bg-brand-dark text-white">Select Industry</option>
                                    <option value="Fashion & Accessories" className="bg-brand-dark text-white">Fashion & Accessories</option>
                                    <option value="Beauty & Skincare" className="bg-brand-dark text-white">Beauty & Skincare</option>
                                    <option value="Wellness" className="bg-brand-dark text-white">Health & Wellness</option>
                                    <option value="Home & Lifestyle" className="bg-brand-dark text-white">Home & Lifestyle</option>
                                    <option value="Food & Beverage" className="bg-brand-dark text-white">Food & Beverage</option>
                                    <option value="Stationery & Gifting" className="bg-brand-dark text-white">Stationery & Gifting</option>
                                    <option value="Other" className="bg-brand-dark text-white">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-brand-orange mb-2">Years in Business</label>
                                <select
                                    required
                                    className={inputClasses}
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                >
                                    <option value="" className="bg-brand-dark text-white">Select Duration</option>
                                    <option value="Just Starting" className="bg-brand-dark text-white">Just Starting</option>
                                    <option value="Less than one (1) year ago" className="bg-brand-dark text-white">Less than 1 year</option>
                                    <option value="1-3 years ago" className="bg-brand-dark text-white">1-3 years</option>
                                    <option value="3+ years ago" className="bg-brand-dark text-white">3+ years</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-orange text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-colors flex items-center justify-center gap-2 rounded-none group"
                        >
                            Start Application
                            <CompoundIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};
