import { Metadata } from 'next';
import { ArrowRight, Paintbrush, Sofa, Layers, Ruler, Building, Home } from 'lucide-react';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getServices() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/services?select=*&order=title`, {
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

const iconMap: Record<string, React.ReactNode> = {
  'Interior Painting': <Paintbrush className="w-8 h-8" />,
  'Exterior Painting': <Paintbrush className="w-8 h-8" />,
  'Wall Finishes': <Layers className="w-8 h-8" />,
  'Furniture Design': <Sofa className="w-8 h-8" />,
  'Space Planning': <Ruler className="w-8 h-8" />,
  'Commercial Interiors': <Building className="w-8 h-8" />,
  'Residential Interiors': <Home className="w-8 h-8" />,
};

export const metadata: Metadata = {
  title: 'Our Services | Frenzy Interiors',
  description: 'Explore our comprehensive interior design services including painting, wall finishes, furniture design, space planning, and more for residential and commercial spaces.',
  openGraph: {
    title: 'Our Services | Frenzy Interiors',
    description: 'Explore our comprehensive interior design services including painting, wall finishes, furniture design, and more.',
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From concept to completion, we deliver world-class interior solutions tailored to your unique vision
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]">Comprehensive Interior Solutions</h2>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Services coming soon. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group bg-gray-50 rounded-2xl p-8 hover:bg-[#0a1a3a] transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-colors">
                    <div className="text-[#d4af37]">
                      {iconMap[service.title] || <Paintbrush className="w-8 h-8" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] group-hover:text-white mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description || 'Professional interior design service delivered with excellence and attention to detail.'}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#d4af37] font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">Ready to Transform Your Space?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. Our team will help you bring your interior design vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#c4a030] transition-colors"
          >
            Get a Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
