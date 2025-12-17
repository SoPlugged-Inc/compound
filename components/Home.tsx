import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './Hero';
import { Manifesto } from './Manifesto';
import { Journey } from './Journey';
import { EligibilityCheck } from './EligibilityCheck';
import { MembershipIncludes } from './MembershipIncludes';
import { IsThisYou } from './IsThisYou';
import { FAQSection } from './FAQSection';

interface HomeProps {
    onNavigate?: (view: any) => void; // Keeping for compatibility if needed, but we'll switch to router
}

export const Home: React.FC<HomeProps> = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <section id="hero">
                <Hero />
            </section>

            <section id="is-this-you" className="relative z-10">
                <IsThisYou />
            </section>

            <section id="manifesto" className="relative z-10">
                <Manifesto />
            </section>

            <section id="journey" className="relative z-10">
                <Journey />
            </section>

            <section id="membership-includes" className="relative z-10">
                <MembershipIncludes />
            </section>

            <section id="faq" className="relative z-10">
                <FAQSection />
            </section>

            <section id="check" className="relative z-10">
                <EligibilityCheck />
            </section>
        </motion.div>
    );
};
