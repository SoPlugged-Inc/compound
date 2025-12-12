/// <reference types="vite/client" />
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { getPostBySlug } from '../src/lib/blog';

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = slug ? getPostBySlug(slug) : undefined;

    useEffect(() => {
        if (!post) {
            // navigate('/404'); // Or handle gracefully
        }
    }, [post, navigate]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-brand-cream">
                Loading...
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link
                    to="/blog"
                    className="inline-flex items-center text-brand-peach hover:text-brand-orange transition-colors mb-8 font-medium"
                >
                    <svg className="w-4 h-4 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Back to Stories
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-brand-orange font-bold uppercase tracking-wider mb-4">
                        <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-orange/50" />
                        <span>{post.author}</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl text-brand-cream font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                </div>

                {post.cover_image && (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-brand-orange/10">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg prose-invert prose-orange max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-body prose-p:text-brand-cream/80 prose-li:text-brand-cream/80">
                    <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
            </motion.div>
        </article>
    );
}
