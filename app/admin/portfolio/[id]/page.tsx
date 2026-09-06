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

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  image_urls: string[];
  before_after: any[];
  completion_date: string | null;
  customer_name: string | null;
  customer_review: string | null;
  featured: boolean;
}

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    image_urls: '',
    before_after: '',
    completion_date: '',
    customer_name: '',
    customer_review: '',
    featured: false,
  });

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('portfolio_projects').select('*').eq('id', id).maybeSingle();
      if (error || !data) {
        toast.error('Project not found');
        router.push('/admin/portfolio');
        return;
      }
      setProject(data);
      setForm({
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description || '',
        image_urls: (data.image_urls || []).join(', '),
        before_after: (data.before_after || []).map((x: any) => (typeof x === 'string' ? x : x.url)).join(', '),
        completion_date: data.completion_date ? data.completion_date.slice(0, 10) : '',
        customer_name: data.customer_name || '',
        customer_review: data.customer_review || '',
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
    const beforeAfter = form.before_after.split(',').map((u) => u.trim()).filter(Boolean).map((url) => ({ url }));

    const { error } = await supabase.from('portfolio_projects').update({
      title: form.title,
      slug: form.slug,
      category: form.category,
      description: form.description || null,
      image_urls: imageUrls,
      before_after: beforeAfter,
      completion_date: form.completion_date || null,
      customer_name: form.customer_name || null,
      customer_review: form.customer_review || null,
      featured: form.featured,
    }).eq('id', id);

    if (error) {
      toast.error('Failed to update project: ' + error.message);
    } else {
      toast.success('Project updated successfully');
      router.push('/admin/portfolio');
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
        <Link href="/admin/portfolio">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Edit Portfolio Project</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Details</CardTitle>
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
              <Label htmlFor="category">Category *</Label>
              <Input id="category" value={form.category} onChange={(e) => handleChange('category', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Textarea id="images" value={form.image_urls} onChange={(e) => handleChange('image_urls', e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="before_after">Before/After Image URLs (comma-separated)</Label>
              <Textarea id="before_after" value={form.before_after} onChange={(e) => handleChange('before_after', e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion Date</Label>
              <Input id="completion_date" type="date" value={form.completion_date} onChange={(e) => handleChange('completion_date', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input id="customer_name" value={form.customer_name} onChange={(e) => handleChange('customer_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_review">Customer Review</Label>
              <Textarea id="customer_review" value={form.customer_review} onChange={(e) => handleChange('customer_review', e.target.value)} rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <input id="featured" type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
              <Label htmlFor="featured" className="font-normal">Featured project</Label>
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
