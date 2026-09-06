import { Metadata } from 'next';
import { ArrowRight, Calendar, User, Star, Phone } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getProject(slug: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_projects?slug=eq.${slug}&select=*`, {
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

async function getAllProjects() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_projects?select=slug`, {
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
  const projects = await getAllProjects();
  return projects.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | Frenzy Interiors',
      description: 'The requested project could not be found.',
    };
  }
  return {
    title: `${project.title} | Portfolio | Frenzy Interiors`,
    description: project.description || `View details of ${project.title} by Frenzy Interiors.`,
    openGraph: {
      title: `${project.title} | Frenzy Interiors`,
      description: project.description || `View details of ${project.title}.`,
    },
  };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) return notFound();

  const images = project.image_urls || [];
  const beforeAfter = project.before_after || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(${images[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Portfolio</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {project.completion_date ? new Date(project.completion_date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long' }) : 'Recently Completed'}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {project.customer_name || 'Private Client'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-[#0a1a3a] mb-6">Project Gallery</h2>
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((img: string, i: number) => (
                      <div key={i} className={`rounded-2xl overflow-hidden aspect-[4/3] ${i === 0 ? 'sm:col-span-2' : ''}`}>
                        <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-[16/9] rounded-2xl bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No images available</span>
                  </div>
                )}
              </div>

              {/* Before & After */}
              {beforeAfter.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0a1a3a] mb-6">Before & After</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {beforeAfter.map((item: any, i: number) => (
                      <div key={i} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl overflow-hidden aspect-square">
                            <img src={item.before} alt="Before" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-xl overflow-hidden aspect-square">
                            <img src={item.after} alt="After" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex justify-between px-2">
                          <span className="text-sm font-semibold text-gray-500">Before</span>
                          <span className="text-sm font-semibold text-[#d4af37]">After</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-[#0a1a3a] mb-4">About This Project</h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.description || 'A beautifully executed interior design project that transformed the space into a modern, functional, and aesthetically pleasing environment.'}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1a3a] mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-[#0a1a3a]">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client</span>
                    <span className="font-medium text-[#0a1a3a]">{project.customer_name || 'Private'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completed</span>
                    <span className="font-medium text-[#0a1a3a]">
                      {project.completion_date ? new Date(project.completion_date).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Review */}
              {project.customer_review && (
                <div className="bg-[#0a1a3a] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{project.customer_review}"</p>
                  <p className="text-sm font-semibold text-[#d4af37]">— {project.customer_name || 'Happy Client'}</p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[#d4af37]/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1a3a] mb-3">Inspired by This?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Let us create something beautiful for your space too.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full gap-2 bg-[#d4af37] text-[#0a1a3a] px-6 py-3 rounded-xl font-semibold hover:bg-[#c4a030] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Start Your Project
                  </Link>
                  <a
                    href="tel:+2349063612439"
                    className="inline-flex items-center justify-center w-full gap-2 bg-[#0a1a3a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0a1a3a]/90 transition-colors"
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
