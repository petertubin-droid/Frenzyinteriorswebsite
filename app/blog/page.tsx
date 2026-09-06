import { Metadata } from 'next';
import { ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AdBanner } from '@/components/ads';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getBlogPosts() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=*,blog_categories(name,slug)&published=eq.true&order=published_at.desc`,
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

async function getCategories() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_categories?select=*`, {
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

export const metadata: Metadata = {
  title: 'Blog | Frenzy Interiors',
  description: 'Interior design tips, trends, and inspiration from Frenzy Interiors. Explore articles on home decor, color theory, space planning, and more.',
  openGraph: {
    title: 'Blog | Frenzy Interiors',
    description: 'Interior design tips, trends, and inspiration from Frenzy Interiors.',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = await getCategories();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Design Journal</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, tips, and inspiration for creating beautiful interiors
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] lg:aspect-auto lg:h-full">
                  <img
                    src={featuredPost.featured_image || 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:pr-12">
                  <span className="inline-block px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold rounded-full mb-4">
                    Featured
                  </span>
                  {featuredPost.blog_categories?.name && (
                    <span className="inline-block px-3 py-1 bg-[#0a1a3a]/10 text-[#0a1a3a] text-xs font-semibold rounded-full mb-4 ml-2">
                      {featuredPost.blog_categories.name}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1a3a] group-hover:text-[#d4af37] transition-colors mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt || 'Read our latest insights on interior design trends and techniques.'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently published'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-8 bg-[#f8f9fa] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-5 py-2 bg-[#0a1a3a] text-white rounded-full text-sm font-medium">All</span>
              {categories.map((cat: any) => (
                <span key={cat.id} className="px-5 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors cursor-pointer">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Blog posts coming soon. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={post.featured_image || 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.blog_categories?.name && (
                        <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                          {post.blog_categories.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {post.excerpt || 'Interior design insights and inspiration.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }) : 'Recent'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#d4af37] font-semibold text-sm group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
