import { Metadata } from 'next';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getPost(slug: string) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}&published=eq.true&select=*,blog_categories(name,slug)`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

async function getAllPosts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug`, {
      headers: {
        apikey: SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function getRelatedPosts(categoryId: string | null, currentSlug: string) {
  if (!categoryId) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?category_id=eq.${categoryId}&slug=neq.${currentSlug}&published=eq.true&select=*,blog_categories(name)&limit=3`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found | Frenzy Interiors',
      description: 'The requested blog post could not be found.',
    };
  }
  return {
    title: `${post.meta_title || post.title} | Blog | Frenzy Interiors`,
    description: post.meta_description || post.excerpt || `Read ${post.title} on the Frenzy Interiors blog.`,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || `Read ${post.title}.`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(post.category_id, post.slug);
  const tags = post.tags || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(${post.featured_image || 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">
            {post.blog_categories?.name || 'Interior Design'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.published_at ? new Date(post.published_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently published'}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Frenzy Interiors Team
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#d4af37] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article Body */}
          <article className="prose prose-lg max-w-none">
            <div
              className="text-gray-600 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <Tag className="w-4 h-4 text-gray-400" />
                {tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share CTA */}
          <div className="mt-12 bg-[#0a1a3a] rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-semibold mb-3 text-[#d4af37]">Enjoyed This Article?</h3>
            <p className="text-gray-300 mb-6">
              Stay updated with the latest interior design trends and tips from our team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-6 py-3 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0a1a3a] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp: any) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={rp.featured_image || 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
