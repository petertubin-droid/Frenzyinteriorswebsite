import { Metadata } from 'next';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getService(slug: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/services?slug=eq.${slug}&select=*`, {
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

async function getAllServices() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/services?select=slug`, {
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
  const services = await getAllServices();
  return services.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) {
    return {
      title: 'Service Not Found | Frenzy Interiors',
      description: 'The requested service could not be found.',
    };
  }
  return {
    title: `${service.title} | Services | Frenzy Interiors`,
    description: service.description || `Learn about our ${service.title} service at Frenzy Interiors.`,
    openGraph: {
      title: `${service.title} | Frenzy Interiors`,
      description: service.description || `Learn about our ${service.title} service.`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);
  if (!service) return notFound();

  const benefits = service.benefits || [];
  const images = service.image_urls || [];
  const beforeAfter = service.before_after_images || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(${images[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Our Services</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {service.description || 'Professional interior design service delivered with excellence.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div className="space-y-6">
              {images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.map((img: string, i: number) => (
                    <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                      <img src={img} alt={`${service.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-[16/9] rounded-2xl bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}

              {/* Before / After */}
              {beforeAfter.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] mb-4">Before & After</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {beforeAfter.map((item: any, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="rounded-xl overflow-hidden aspect-square">
                          <img src={item.before} alt="Before" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center text-sm font-semibold text-gray-500">Before</p>
                        <div className="rounded-xl overflow-hidden aspect-square">
                          <img src={item.after} alt="After" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-center text-sm font-semibold text-[#d4af37]">After</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  {service.description || 'Our expert team delivers premium interior design solutions tailored to your needs.'}
                </p>
              </div>

              {benefits.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-[#0a1a3a] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-3 text-[#d4af37]">Interested in This Service?</h3>
                <p className="text-gray-300 mb-6">
                  Get in touch with our team to discuss your project requirements and receive a custom quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-6 py-3 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Request Quote
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
