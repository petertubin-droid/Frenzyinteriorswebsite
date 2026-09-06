import { Metadata } from 'next';
import { Award, Users, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Frenzy Interiors',
  description: 'Learn about Frenzy Interiors - Nigeria\'s leading interior decoration company. We specialize in painting, wall finishes, furniture, and building aesthetics.',
  openGraph: {
    title: 'About Us | Frenzy Interiors',
    description: 'Learn about Frenzy Interiors - Nigeria\'s leading interior decoration company.',
  },
};

export default function AboutPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Frenzy Interiors</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming spaces into masterpieces since 2014
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1a3a] mb-6">
                A Decade of Excellence in Interior Design
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Frenzy Interiors was founded with a simple mission: to bring world-class interior decoration to Nigerian homes and businesses. What started as a small painting service in Lagos has grown into one of Nigeria's most trusted interior design companies.
                </p>
                <p>
                  Over the past decade, we have completed over 500 projects across residential, commercial, and industrial spaces. Our team of skilled craftsmen, designers, and project managers work together to deliver results that consistently exceed client expectations.
                </p>
                <p>
                  We believe that great interior design is not just about aesthetics - it is about creating spaces that improve quality of life, enhance productivity, and reflect the personality of the people who use them.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Frenzy Interiors team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#d4af37] text-[#0a1a3a] px-6 py-4 rounded-xl font-bold text-lg shadow-xl">
                10+ Years of Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '500+', label: 'Projects Completed' },
              { icon: Users, value: '50+', label: 'Expert Team Members' },
              { icon: Clock, value: '10+', label: 'Years Experience' },
              { icon: MapPin, value: 'Nigeria', label: 'Nationwide Service' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <stat.icon className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#0a1a3a] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on quality. Every material, every brush stroke, every detail is executed to the highest standard.',
              },
              {
                title: 'Customer Centric',
                description: 'Our clients are at the heart of everything we do. We listen, we adapt, and we deliver solutions tailored to their unique needs.',
              },
              {
                title: 'Innovation',
                description: 'We constantly explore new techniques, materials, and design trends to bring fresh ideas to every project.',
              },
              {
                title: 'Integrity',
                description: 'Transparent pricing, honest timelines, and clear communication. We build trust through every interaction.',
              },
              {
                title: 'Sustainability',
                description: 'We prioritize eco-friendly materials and practices that minimize environmental impact while maximizing beauty.',
              },
              {
                title: 'Community',
                description: 'We are proud to employ and train local artisans, contributing to the growth of Nigeria creative economy.',
              },
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gray-50 hover:bg-[#0a1a3a] hover:text-white transition-all group">
                <h3 className="text-xl font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] mb-3">{value.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
