/// <reference types="vite/client" />
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../src/lib/blog';
import { format } from 'date-fns';

export function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="font-body text-brand-orange uppercase tracking-widest text-sm font-medium mb-3 block">
                    Behind the Scenes
                </span>
                <h1 className="font-display text-5xl md:text-6xl text-brand-cream font-bold mb-6">
                    Latest Stories
                </h1>
                <p className="font-body text-brand-cream/60 max-w-2xl mx-auto text-lg">
                    Updates, insights, and stories from the Compound community.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <Link
                            to={`/blog/${post.slug}`}
                            className="group block h-full bg-brand-brown/30 border border-brand-orange/10 rounded-2xl overflow-hidden hover:border-brand-orange/30 transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            {post.cover_image && (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-orange mb-4">
                                    <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                </div>
                                <h2 className="font-display text-2xl text-brand-cream font-bold mb-3 group-hover:text-brand-orange transition-colors">
                                    {post.title}
                                </h2>
                                <p className="font-body text-brand-cream/60 line-clamp-3 mb-6">
                                    {post.description}
                                </p>
                                <div className="flex items-center text-brand-peach text-sm font-bold uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                                    Read Article
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
