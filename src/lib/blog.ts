import frontmatter from 'front-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    cover_image?: string;
    body: string;
}

export function getAllPosts(): BlogPost[] {
    // Import all markdown files from the content directory
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });

    const posts = Object.keys(modules).map((path) => {
        // Extract slug from filename
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        // Get raw content
        const content = modules[path] as string;

        // Parse frontmatter
        const parsed = frontmatter<Omit<BlogPost, 'slug' | 'body'>>(content);

        return {
            slug,
            ...parsed.attributes,
            body: parsed.body,
        };
    });

    // Sort by date descending (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const posts = getAllPosts();
    return posts.find((p) => p.slug === slug);
}
