
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const IsThisYou: React.FC = () => {
    return (
        <div className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden bg-brand-dark">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-10">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">Is This You?</h2>
                        <div className="h-0.5 w-16 bg-brand-orange mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-6 max-w-3xl mx-auto">
                        {[
                            "You run a consumer brand (beauty, food, home, apparel) from your home or small studio.",
                            "You wear every hat: CEO, Social Media Manager, Customer Service, and Shipping Dept.",
                            "You know you’re ready for the next level, but aren't sure which lever to pull first.",
                            "You crave a circle of founders who aren't just \"networking,\" but actually building."
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="w-6 h-6 text-brand-orange" />
                                </div>
                                <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
