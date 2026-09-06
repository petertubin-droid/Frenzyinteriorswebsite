'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    benefits: '',
    image_urls: '',
    before_after_images: '',
    featured: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const imageUrls = form.image_urls.split(',').map((u) => u.trim()).filter(Boolean);
    const benefits = form.benefits.split(',').map((b) => b.trim()).filter(Boolean);
    const beforeAfter = form.before_after_images.split(',').map((u) => u.trim()).filter(Boolean);

    const { error } = await supabase.from('services').insert({
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      benefits,
      image_urls: imageUrls,
      before_after_images: beforeAfter.map((url) => ({ url })),
      featured: form.featured,
    });

    if (error) {
      toast.error('Failed to create service: ' + error.message);
    } else {
      toast.success('Service created successfully');
      router.push('/admin/services');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">New Service</h1>
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
              <Input id="slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="e.g. interior-painting" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (comma-separated)</Label>
              <Textarea id="benefits" value={form.benefits} onChange={(e) => handleChange('benefits', e.target.value)} rows={2} placeholder="Premium quality, 5-year warranty, Expert team" />
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
              <Button type="submit" disabled={loading} className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Create Service
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
