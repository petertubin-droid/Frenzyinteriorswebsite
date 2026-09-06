import { Metadata } from 'next';
import { ArrowRight, Calendar, User, FolderOpen } from 'lucide-react';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getPortfolioProjects() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_projects?select=*&order=completion_date.desc`, {
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
  title: 'Portfolio | Frenzy Interiors',
  description: 'Explore our portfolio of completed interior design projects. See transformations of residential, commercial, and industrial spaces across Nigeria.',
  openGraph: {
    title: 'Portfolio | Frenzy Interiors',
    description: 'Explore our portfolio of completed interior design projects.',
  },
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of our finest interior design transformations across Nigeria
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Featured Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]">Completed Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Portfolio projects coming soon. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <img
                      src={project.image_urls?.[0] || 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#0a1a3a] text-white text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {project.description || 'A stunning interior design project completed by our expert team.'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {project.completion_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.completion_date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {project.customer_name && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {project.customer_name}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-2 mt-4 text-[#d4af37] font-semibold text-sm group-hover:gap-3 transition-all">
                      View Project <ArrowRight className="w-4 h-4" />
                    </span>
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
          <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life. Contact us today for a free consultation and project assessment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#c4a030] transition-colors"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
