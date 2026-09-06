'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Tables } from '@/lib/supabase/client';

export function GalleryPreview() {
  const [categories, setCategories] = useState<Tables['gallery_categories'][]>([]);
  const [images, setImages] = useState<Tables['gallery_images'][]>([]);

  useEffect(() => {
    supabase
      .from('gallery_categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .limit(6)
      .then(({ data }) => {
        if (data) setCategories(data);
      });
    supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setImages(data);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3"
            >
              Gallery
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]"
            >
              Our Work in Pictures
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="border-[#0a1a3a] text-[#0a1a3a] hover:bg-[#0a1a3a] hover:text-white" asChild>
              <Link href="/gallery">
                View Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`relative overflow-hidden rounded-xl group ${index === 0 || index === 3 ? 'aspect-square' : 'aspect-[4/3]'}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${image.image_url || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'})`,
                }}
              />
              <div className="absolute inset-0 bg-[#0a1a3a]/0 group-hover:bg-[#0a1a3a]/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title || 'View'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
