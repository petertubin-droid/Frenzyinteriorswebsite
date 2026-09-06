'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase/client';

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferred_date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('consultations').insert([formData]);
    setLoading(false);
    if (error) {
      toast.error('Failed to submit. Please try again.');
    } else {
      toast.success('Thank you! We will contact you shortly.');
      setFormData({ name: '', phone: '', email: '', service: '', preferred_date: '', message: '' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0a1a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
            >
              Request a Free Consultation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 mb-8 leading-relaxed"
            >
              Ready to transform your space? Fill out the form and our team will get back to you within 24 hours with a customized quote and project plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white font-medium">+234 906 361 2439</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-medium">info@frenzyinteriors.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white font-medium">Lagos, Nigeria</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234..."
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service">Service Required</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(val) => setFormData({ ...formData, service: val })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="painting">Painting Services</SelectItem>
                      <SelectItem value="screeding">Wall Screeding</SelectItem>
                      <SelectItem value="pop">POP Ceilings</SelectItem>
                      <SelectItem value="cleaning">Industrial Cleaning</SelectItem>
                      <SelectItem value="paint-production">Paint Production</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferred_date">Preferred Date</Label>
                  <Input
                    id="preferred_date"
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a3a] font-semibold h-11"
                disabled={loading}
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
