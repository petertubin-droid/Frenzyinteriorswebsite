'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Mail, MapPin, Paintbrush, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });
    setLoading(false);
    if (error) {
      toast.error('Failed to subscribe. You may already be subscribed.');
    } else {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a1a3a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Paintbrush className="w-5 h-5 text-[#0a1a3a]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Frenzy<span className="text-[#d4af37]">Interiors</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Transforming spaces into masterpieces. We are Nigeria leading interior decoration company, specializing in premium painting, wall finishes, and furniture solutions.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/frenzyinteriors" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a1a3a] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/frenzyinteriors" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a1a3a] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@frenzyinteriors" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a1a3a] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.23 0 .45.03.66.08V9.4a6.37 6.37 0 0 0-.66-.04A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V7.91a8.16 8.16 0 0 0 4.76 1.53V6.05a4.85 4.85 0 0 1-1-.36z"/></svg>
              </a>
              <a href="https://youtube.com/frenzyinteriors" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a1a3a] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#d4af37]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Services</Link></li>
              <li><Link href="/products" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Products</Link></li>
              <li><Link href="/portfolio" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#d4af37]">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/painting-services" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Painting Services</Link></li>
              <li><Link href="/services/wall-screeding" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Wall Screeding</Link></li>
              <li><Link href="/services/pop-ceilings" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">POP Ceilings</Link></li>
              <li><Link href="/services/industrial-cleaning" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Industrial Cleaning</Link></li>
              <li><Link href="/services/paint-production" className="text-sm text-gray-300 hover:text-[#d4af37] transition-colors">Paint Production</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#d4af37]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+2349063612439" className="text-sm text-gray-300 hover:text-[#d4af37] block">+234 906 361 2439</a>
                  <a href="tel:+2349126717830" className="text-sm text-gray-300 hover:text-[#d4af37] block">+234 912 671 7830</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <a href="mailto:info@frenzyinteriors.com" className="text-sm text-gray-300 hover:text-[#d4af37]">info@frenzyinteriors.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">Lagos, Nigeria</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-[#d4af37]">Newsletter</h4>
              <form onSubmit={subscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-9"
                  required
                />
                <Button type="submit" size="sm" className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a3a] shrink-0 h-9" disabled={loading}>
                  {loading ? '...' : 'Join'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Frenzy Interiors. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-[#d4af37] transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-[#d4af37] transition-colors">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-[#d4af37] transition-colors">Cookies</Link>
            <Link href="/sitemap" className="hover:text-[#d4af37] transition-colors">Sitemap</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1a3a] flex items-center justify-center hover:bg-[#b8962e] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
