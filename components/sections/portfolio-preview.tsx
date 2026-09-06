'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Tables } from '@/lib/supabase/client';

export function PortfolioPreview() {
  const [projects, setProjects] = useState<Tables['portfolio_projects'][]>([]);

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('featured', true)
      .limit(3)
      .then(({ data }) => {
        if (data) setProjects(data);
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
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]"
            >
              Our Recent Projects
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="border-[#0a1a3a] text-[#0a1a3a] hover:bg-[#0a1a3a] hover:text-white" asChild>
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative h-72 rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image_urls?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3a] via-[#0a1a3a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs font-medium text-[#d4af37] uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
