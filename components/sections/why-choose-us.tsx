'use client';

import { motion } from 'framer-motion';
import { Users, Gem, Banknote, Shield, Clock, Heart } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Over 10 years of combined expertise in interior decoration, painting, and furniture craftsmanship across Nigeria.',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    description: 'We source only the finest paints, wallpapers, and materials from trusted suppliers worldwide.',
  },
  {
    icon: Banknote,
    title: 'Affordable Pricing',
    description: 'Transparent, competitive pricing with no hidden fees. We work within your budget without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Quality Workmanship',
    description: 'Every project is executed with meticulous attention to detail and backed by our satisfaction guarantee.',
  },
  {
    icon: Clock,
    title: 'Fast Project Delivery',
    description: 'We respect your time. Our efficient team ensures timely completion without sacrificing quality.',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    description: 'Your happiness is our priority. We do not consider a job complete until you are 100% satisfied.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-[#0a1a3a] mb-4"
          >
            The Frenzy Interiors Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We combine creativity, expertise, and premium materials to deliver interior solutions that exceed expectations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-2xl bg-gray-50 hover:bg-[#0a1a3a] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-[#d4af37]/10 group-hover:bg-[#d4af37] flex items-center justify-center mb-6 transition-colors duration-500">
                <feature.icon className="w-7 h-7 text-[#d4af37] group-hover:text-[#0a1a3a] transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#0a1a3a] group-hover:text-white mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
