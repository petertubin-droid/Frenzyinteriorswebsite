import { Metadata } from 'next';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getProducts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*,product_categories(name,slug)&order=created_at.desc`, {
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

async function getCategories() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/product_categories?select=*&order=sort_order`, {
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
  title: 'Our Products | Frenzy Interiors',
  description: 'Browse our curated collection of premium interior design products including furniture, decor, lighting, and accessories for your home or office.',
  openGraph: {
    title: 'Our Products | Frenzy Interiors',
    description: 'Browse our curated collection of premium interior design products.',
  },
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Curated interior design products and accessories to elevate your space
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 bg-[#f8f9fa] border-b border-gray-200">
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

      {/* Products Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Products coming soon. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={product.image_urls?.[0] || 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {product.product_categories?.name && (
                        <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                          {product.product_categories.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {product.description || 'Premium interior design product.'}
                    </p>
                    <div className="flex items-center justify-between">
                      {product.price && (
                        <span className="text-lg font-bold text-[#0a1a3a]">
                          ₦{product.price.toLocaleString()}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[#d4af37] font-semibold text-sm group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">Looking for Something Custom?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We can source or create bespoke pieces tailored to your exact specifications. Contact us for a personalized consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#c4a030] transition-colors"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
