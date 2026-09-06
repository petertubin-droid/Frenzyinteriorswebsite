'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Tables } from '@/lib/supabase/client';

export function FeaturedServices() {
  const [services, setServices] = useState<Tables['services'][]>([]);

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .eq('featured', true)
      .limit(4)
      .then(({ data }) => {
        if (data) setServices(data);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]"
            >
              What We Do Best
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="border-[#0a1a3a] text-[#0a1a3a] hover:bg-[#0a1a3a] hover:text-white" asChild>
              <Link href="/services">
                All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${service.image_urls?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a]/90 via-[#0a1a3a]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-[#d4af37] group-hover:translate-x-1 transition-transform">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
