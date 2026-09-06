'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Tables } from '@/lib/supabase/client';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Tables['testimonials'][]>([]);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .eq('featured', true)
      .limit(5)
      .then(({ data }) => {
        if (data) setTestimonials(data);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#0a1a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Real reviews from real customers who transformed their spaces with Frenzy Interiors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
            >
              <Quote className="w-8 h-8 text-[#d4af37]/30 mb-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">Verified Customer</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
