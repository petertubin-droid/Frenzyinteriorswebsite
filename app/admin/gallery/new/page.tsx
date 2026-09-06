'use client';

import { useEffect, useState } from 'react';
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

interface GalleryCategory {
  id: string;
  name: string;
}

export default function NewGalleryImagePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category_id: '',
    title: '',
    image_url: '',
    description: '',
    sort_order: '0',
  });

  useEffect(() => {
    supabase.from('gallery_categories').select('id, name').order('name').then(({ data }) => {
      setCategories(data || []);
    });
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('gallery_images').insert({
      category_id: form.category_id || null,
      title: form.title || null,
      image_url: form.image_url,
      description: form.description || null,
      sort_order: parseInt(form.sort_order) || 0,
    });

    if (error) {
      toast.error('Failed to upload image: ' + error.message);
    } else {
      toast.success('Image added successfully');
      router.push('/admin/gallery');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Upload Gallery Image</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Image Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" value={form.category_id} onChange={(e) => handleChange('category_id', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input id="image_url" value={form.image_url} onChange={(e) => handleChange('image_url', e.target.value)} placeholder="https://example.com/image.jpg" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" type="number" value={form.sort_order} onChange={(e) => handleChange('sort_order', e.target.value)} />
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={loading} className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Image
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
