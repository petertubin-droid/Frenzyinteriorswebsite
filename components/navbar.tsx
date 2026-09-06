'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Paintbrush, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    children: [
      { href: '/services/painting-services', label: 'Painting Services' },
      { href: '/services/wall-screeding', label: 'Wall Screeding' },
      { href: '/services/pop-ceilings', label: 'POP Ceilings' },
      { href: '/services/industrial-cleaning', label: 'Industrial Cleaning' },
      { href: '/services/paint-production', label: 'Paint Production' },
    ],
  },
  { href: '/products', label: 'Products' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0a1a3a] rounded flex items-center justify-center">
              <Paintbrush className="w-5 h-5 text-[#d4af37]" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-[#0a1a3a]' : 'text-white'}`}>
              Frenzy<span className="text-[#d4af37]">Interiors</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(link.href)
                          ? scrolled
                            ? 'text-[#d4af37]'
                            : 'text-[#d4af37]'
                          : scrolled
                          ? 'text-[#0a1a3a] hover:text-[#d4af37]'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href} className="cursor-pointer">
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href)
                      ? scrolled
                        ? 'text-[#d4af37]'
                        : 'text-[#d4af37]'
                      : scrolled
                      ? 'text-[#0a1a3a] hover:text-[#d4af37]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={`${scrolled ? 'text-[#0a1a3a]' : 'text-white'}`}
              asChild
            >
              <Link href="tel:+2349063612439">
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a3a] font-semibold"
              asChild
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-[#0a1a3a]' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[190px] bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-3 border-b">
          <span className="text-sm font-bold text-[#0a1a3a]">Menu</span>
          <button
            className="p-1 rounded-md text-[#0a1a3a]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-3 gap-1 overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2 text-sm font-medium rounded-md ${
                  isActive(link.href)
                    ? 'text-[#d4af37] bg-[#f8f6f0]'
                    : 'text-[#0a1a3a] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-2 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-3 py-1.5 text-xs rounded-md ${
                        pathname === child.href
                          ? 'text-[#d4af37] bg-[#f8f6f0]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 mt-2 border-t flex flex-col gap-2">
            <Button variant="outline" className="w-full text-xs" asChild>
              <Link href="tel:+2349063612439">
                <Phone className="w-3 h-3 mr-1" />
                Call Now
              </Link>
            </Button>
            <Button className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-[#0a1a3a] font-semibold text-xs" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </nav>
      </div>
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
