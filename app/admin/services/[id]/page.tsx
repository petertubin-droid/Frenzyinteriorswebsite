'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  benefits: string[];
  image_urls: string[];
  before_after_images: any[];
  featured: boolean;
}

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    benefits: '',
    image_urls: '',
    before_after_images: '',
    featured: false,
  });

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('services').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        toast.error('Service not found');
        router.push('/admin/services');
        return;
      }
      setService(data);
      setForm({
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        benefits: (data.benefits || []).join(', '),
        image_urls: (data.image_urls || []).join(', '),
        before_after_images: (data.before_after_images || []).map((x: any) => (typeof x === 'string' ? x : x.url)).join(', '),
        featured: data.featured,
      });
      setLoading(false);
    };
    load();
  }, [id, router]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const imageUrls = form.image_urls.split(',').map((u) => u.trim()).filter(Boolean);
    const benefits = form.benefits.split(',').map((b) => b.trim()).filter(Boolean);
    const beforeAfter = form.before_after_images.split(',').map((u) => u.trim()).filter(Boolean).map((url) => ({ url }));

    const { error } = await supabase.from('services').update({
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      benefits,
      image_urls: imageUrls,
      before_after_images: beforeAfter,
      featured: form.featured,
      updated_at: new Date().toISOString(),
    }).eq('id', id);

    if (error) {
      toast.error('Failed to update service: ' + error.message);
    } else {
      toast.success('Service updated successfully');
      router.push('/admin/services');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Edit Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (comma-separated)</Label>
              <Textarea id="benefits" value={form.benefits} onChange={(e) => handleChange('benefits', e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Textarea id="images" value={form.image_urls} onChange={(e) => handleChange('image_urls', e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="before_after">Before/After Image URLs (comma-separated)</Label>
              <Textarea id="before_after" value={form.before_after_images} onChange={(e) => handleChange('before_after_images', e.target.value)} rows={2} />
            </div>
            <div className="flex items-center gap-2">
              <input id="featured" type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
              <Label htmlFor="featured" className="font-normal">Featured service</Label>
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={saving} className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
                {saving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
