import { Metadata } from 'next';
import { ArrowRight, Phone, CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?slug=eq.${slug}&select=*,product_categories(name,slug)`, {
      headers: {
        apikey: SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

async function getAllProducts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=slug`, {
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

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | Frenzy Interiors',
      description: 'The requested product could not be found.',
    };
  }
  return {
    title: `${product.name} | Products | Frenzy Interiors`,
    description: product.description || `View details for ${product.name} at Frenzy Interiors.`,
    openGraph: {
      title: `${product.name} | Frenzy Interiors`,
      description: product.description || `View details for ${product.name}.`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  const images = product.image_urls || [];
  const specs = product.specifications ? product.specifications.split('\n').filter((s: string) => s.trim()) : [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0a1a3a]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Our Products</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{product.name}</h1>
          {product.product_categories?.name && (
            <p className="text-lg text-gray-300">{product.product_categories.name}</p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {images.length > 0 ? (
                <>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                    <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-3 gap-4">
                      {images.slice(1).map((img: string, i: number) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                          <img src={img} alt={`${product.name} ${i + 2}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">{product.name}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'Premium interior design product curated by Frenzy Interiors.'}
                </p>
              </div>

              {product.price && (
                <div className="bg-[#f8f9fa] rounded-2xl p-6">
                  <span className="text-sm text-gray-500 block mb-1">Price</span>
                  <span className="text-3xl font-bold text-[#0a1a3a]">₦{product.price.toLocaleString()}</span>
                </div>
              )}

              {specs.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] mb-4">Specifications</h3>
                  <ul className="space-y-3">
                    {specs.map((spec: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-[#0a1a3a] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-3 text-[#d4af37]">Interested in This Product?</h3>
                <p className="text-gray-300 mb-6">
                  Contact us to check availability, request a quote, or arrange a viewing at our showroom.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-6 py-3 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Inquire Now
                  </Link>
                  <a
                    href="tel:+2349063612439"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
