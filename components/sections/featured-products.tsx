'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Tables } from '@/lib/supabase/client';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Tables['products'][]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*, product_categories(name)')
      .eq('featured', true)
      .limit(6)
      .then(({ data }) => {
        if (data) setProducts(data);
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
              Our Products
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]"
            >
              Premium Interior Products
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="border-[#0a1a3a] text-[#0a1a3a] hover:bg-[#0a1a3a] hover:text-white" asChild>
              <Link href="/products">
                All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative h-56 rounded-t-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${product.image_urls?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'})`,
                    }}
                  />
                </div>
                <div className="p-5 border border-t-0 border-gray-100 rounded-b-2xl bg-white hover:shadow-lg transition-shadow">
                  <div className="text-xs font-medium text-[#d4af37] mb-2 uppercase tracking-wider">
                    {(product as any).product_categories?.name || 'Product'}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a1a3a] mb-2 group-hover:text-[#d4af37] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  {product.price && (
                    <div className="text-lg font-bold text-[#0a1a3a]">
                      ₦{product.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
