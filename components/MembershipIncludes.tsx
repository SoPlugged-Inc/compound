
import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
    {
        title: "1:1 Strategy & Roadmap Calls",
        desc: "Dedicated time to map out your quarterly goals."
    },
    {
        title: "Digital Storefront Support",
        desc: "Access to web dev support to fix conversion leaks."
    },
    {
        title: "The Founder Barter Network",
        desc: "Trade products for services without spending cash."
    },
    {
        title: "Monthly \"Real Talk\" Circles",
        desc: "Group therapy sessions to protect your peace."
    },
    {
        title: "Priority Brand Activations",
        desc: "First dibs on pop-up slots at SoPlugged events."
    },
    {
        title: "Canadian Grant Database",
        desc: "Curated list of funding opportunities for Black founders."
    },
    {
        title: "Private Vendor Rolodex",
        desc: "Trusted list of suppliers, shippers, and packagers."
    },
    {
        title: "The Community Group Chat",
        desc: "Real-time advice from founders in the trenches."
    },
];

export const MembershipIncludes: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-6 bg-brand-dark relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="border border-white/10 bg-white/5 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">

                    {/* Price Block (Left / Top) */}
                    <div className="lg:w-1/3 bg-black/20 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                        <div>
                            <h3 className="font-display font-bold text-2xl text-white mb-6">Membership</h3>
                            <div className="mb-2">
                                <span className="text-5xl font-display font-bold text-brand-orange">$250</span>
                                <span className="text-xl font-bold text-white/50 ml-2">CAD / year</span>
                            </div>
                            <p className="text-white/60 text-sm font-light mb-8">
                                billed monthly
                            </p>
                        </div>

                        <Link
                            to="/application"
                            className="w-full py-4 bg-white text-brand-orange font-bold uppercase tracking-widest text-center hover:bg-brand-orange hover:text-white transition-colors rounded-lg"
                        >
                            Apply Now
                        </Link>
                    </div>

                    {/* Benefits List (Right / Bottom) */}
                    <div className="lg:w-2/3 p-8 md:p-12">
                        <h2 className="font-display font-bold text-3xl md:text-3xl text-white mb-8">
                            Everything You Need to Scale.
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                            {benefits.map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base leading-tight mb-1">{item.title}</h4>
                                        <p className="text-white/50 text-sm leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
