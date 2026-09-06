'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Paintbrush,
  Briefcase,
  Image,
  PenTool,
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  products: number;
  services: number;
  portfolio: number;
  gallery: number;
  blog: number;
  testimonials: number;
  leads: number;
  newsletters: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const [products, services, portfolio, gallery, blog, testimonials, leads, newsletters] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('consultations').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
      ]);
      setStats({
        products: products.count || 0,
        services: services.count || 0,
        portfolio: portfolio.count || 0,
        gallery: gallery.count || 0,
        blog: blog.count || 0,
        testimonials: testimonials.count || 0,
        leads: leads.count || 0,
        newsletters: newsletters.count || 0,
      });
      const { data: leadsData } = await supabase.from('consultations').select('*').order('created_at', { ascending: false }).limit(5);
      setRecentLeads(leadsData || []);
      setLoading(false);
    };
    loadStats();
  }, []);

  const statCards = [
    { label: 'Products', value: stats?.products || 0, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600', href: '/admin/products' },
    { label: 'Services', value: stats?.services || 0, icon: Paintbrush, color: 'bg-purple-50 text-purple-600', href: '/admin/services' },
    { label: 'Portfolio', value: stats?.portfolio || 0, icon: Briefcase, color: 'bg-orange-50 text-orange-600', href: '/admin/portfolio' },
    { label: 'Gallery', value: stats?.gallery || 0, icon: Image, color: 'bg-green-50 text-green-600', href: '/admin/gallery' },
    { label: 'Blog Posts', value: stats?.blog || 0, icon: PenTool, color: 'bg-pink-50 text-pink-600', href: '/admin/blog' },
    { label: 'Testimonials', value: stats?.testimonials || 0, icon: MessageSquare, color: 'bg-yellow-50 text-yellow-600', href: '/admin/testimonials' },
    { label: 'Leads', value: stats?.leads || 0, icon: Users, color: 'bg-red-50 text-red-600', href: '/admin/leads' },
    { label: 'Subscribers', value: stats?.newsletters || 0, icon: TrendingUp, color: 'bg-teal-50 text-teal-600', href: '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your website and business metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-[#0a1a3a]">{card.value}</div>
                  <div className="text-sm text-gray-500">{card.label}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d4af37]" />
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No leads yet</p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <div className="font-medium text-sm text-[#0a1a3a]">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.service || 'General inquiry'}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                      lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#d4af37]" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/products/new">
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-[#0a1a3a] hover:text-white transition-all group text-center">
                  <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-[#d4af37] group-hover:text-[#d4af37]" />
                  <div className="text-sm font-medium">Add Product</div>
                </div>
              </Link>
              <Link href="/admin/blog/new">
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-[#0a1a3a] hover:text-white transition-all group text-center">
                  <PenTool className="w-6 h-6 mx-auto mb-2 text-[#d4af37] group-hover:text-[#d4af37]" />
                  <div className="text-sm font-medium">New Blog Post</div>
                </div>
              </Link>
              <Link href="/admin/portfolio/new">
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-[#0a1a3a] hover:text-white transition-all group text-center">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-[#d4af37] group-hover:text-[#d4af37]" />
                  <div className="text-sm font-medium">Add Portfolio</div>
                </div>
              </Link>
              <Link href="/admin/gallery/new">
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-[#0a1a3a] hover:text-white transition-all group text-center">
                  <Image className="w-6 h-6 mx-auto mb-2 text-[#d4af37] group-hover:text-[#d4af37]" />
                  <div className="text-sm font-medium">Upload Images</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
