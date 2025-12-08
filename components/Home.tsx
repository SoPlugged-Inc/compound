
import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './Hero';
import { Manifesto } from './Manifesto';
import { Journey } from './Journey';
import { EligibilityCheck } from './EligibilityCheck';

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

            <section id="manifesto" className="relative z-10">
                <Manifesto />
            </section>

            <section id="journey" className="relative z-10">
                <Journey />
            </section>

            <section id="check" className="relative z-10">
                <EligibilityCheck />
            </section>
        </motion.div>
    );
};
