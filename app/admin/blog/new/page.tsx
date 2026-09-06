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

export default function NewBlogPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: '',
    excerpt: '',
    featured_image: '',
    tags: '',
    meta_title: '',
    meta_description: '',
    published: false,
  });

  useEffect(() => {
    supabase.from('blog_categories').select('id, name').order('name').then(({ data }) => {
      setCategories(data || []);
    });
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    const { error } = await supabase.from('blog_posts').insert({
      title: form.title,
      slug: form.slug,
      category_id: form.category_id || null,
      content: form.content,
      excerpt: form.excerpt || null,
      featured_image: form.featured_image || null,
      tags,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    });

    if (error) {
      toast.error('Failed to create post: ' + error.message);
    } else {
      toast.success('Blog post created successfully');
      router.push('/admin/blog');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">New Blog Post</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="e.g. interior-design-trends-2024" required />
            </div>
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
              <Label htmlFor="content">Content *</Label>
              <Textarea id="content" value={form.content} onChange={(e) => handleChange('content', e.target.value)} rows={10} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} rows={3} placeholder="Short summary for previews" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input id="featured_image" value={form.featured_image} onChange={(e) => handleChange('featured_image', e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" value={form.tags} onChange={(e) => handleChange('tags', e.target.value)} placeholder="interior, design, tips" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input id="meta_title" value={form.meta_title} onChange={(e) => handleChange('meta_title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea id="meta_description" value={form.meta_description} onChange={(e) => handleChange('meta_description', e.target.value)} rows={2} />
            </div>
            <div className="flex items-center gap-2">
              <input id="published" type="checkbox" checked={form.published} onChange={(e) => handleChange('published', e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
              <Label htmlFor="published" className="font-normal">Publish immediately</Label>
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={loading} className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Create Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
