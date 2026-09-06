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

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category_id: '',
    description: '',
    specifications: '',
    price: '',
    image_urls: '',
    featured: false,
  });

  useEffect(() => {
    supabase.from('product_categories').select('id, name').order('name').then(({ data }) => {
      setCategories(data || []);
    });
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const imageUrls = form.image_urls
      .split(',')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const { error } = await supabase.from('products').insert({
      name: form.name,
      slug: form.slug,
      category_id: form.category_id || null,
      description: form.description || null,
      specifications: form.specifications || null,
      price: form.price ? parseFloat(form.price) : null,
      image_urls: imageUrls,
      featured: form.featured,
    });

    if (error) {
      toast.error('Failed to create product: ' + error.message);
    } else {
      toast.success('Product created successfully');
      router.push('/admin/products');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">New Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="e.g. luxury-sofa-set"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={form.category_id}
                onChange={(e) => handleChange('category_id', e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Specifications</Label>
              <Textarea
                id="specifications"
                value={form.specifications}
                onChange={(e) => handleChange('specifications', e.target.value)}
                rows={3}
                placeholder="Material, dimensions, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Textarea
                id="images"
                value={form.image_urls}
                onChange={(e) => handleChange('image_urls', e.target.value)}
                rows={2}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="font-normal">Featured product</Label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Create Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
