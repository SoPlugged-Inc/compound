
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Do I need to be making a certain amount of revenue to join?",
        answer: "No. We don't judge you by your tax return. Whether you're making $500 a month or $50k, if you have a physical product and the drive to scale, you belong here. We help you grow the numbers, not judge them."
    },
    {
        question: "Is this just another \"networking group\"?",
        answer: "Absolutely not. We know you don't have time for aimless chats. Compound is a working accelerator. You join to fix your website, plan your strategy, and move units. The networking happens naturally while we build."
    },
    {
        question: "Do you take equity in my business?",
        answer: "Zero. Your business is 100% yours. We charge a flat membership fee ($250/year) to cover our operational costs. We are here to be your partners, not your owners."
    },
    {
        question: "I’m a service provider (Coach, Consultant). Can I join?",
        answer: "Not at this time. We are laser-focused on the unique challenges of Consumer Packaged Goods (CPG)—shipping, inventory, and retail. If you sell a service, our resources won't be the right fit just yet."
    },
    {
        question: "What’s the time commitment?",
        answer: "There is no \"mandatory\" curriculum. Use the accelerator as a toolkit when you need it. Need a website audit? Book it. Need a mental health vent session? Join the call. You pace yourself."
    },
    {
        question: "I’m not in Toronto. Can I still benefit?",
        answer: "100%. While some pop-ups are location-specific, 90% of our value—web dev, strategy, barter network, and coaching—is digital. We are building a national network, from Halifax to Vancouver."
    }
];

export const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 md:px-6 bg-brand-dark relative z-10">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">FAQs</h2>
                    <p className="text-white/60 text-lg font-light">
                        You’ve Got Questions. We’ve Got Real Answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-white/10 last:border-0"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full py-6 flex items-center justify-between text-left group transition-colors hover:bg-white/5 px-4 rounded-lg"
                            >
                                <span className="text-white font-bold text-lg pr-8">{faq.question}</span>
                                <div className="flex-shrink-0 text-brand-orange">
                                    {activeIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-6 text-white/70 font-light leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
