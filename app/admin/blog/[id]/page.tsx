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

interface Category {
  id: string;
  name: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    const load = async () => {
      const [catRes, postRes] = await Promise.all([
        supabase.from('blog_categories').select('id, name').order('name'),
        supabase.from('blog_posts').select('*').eq('id', id).maybeSingle(),
      ]);
      setCategories(catRes.data || []);
      if (postRes.data) {
        setPost(postRes.data);
        setForm({
          title: postRes.data.title,
          slug: postRes.data.slug,
          category_id: postRes.data.category_id || '',
          content: postRes.data.content,
          excerpt: postRes.data.excerpt || '',
          featured_image: postRes.data.featured_image || '',
          tags: (postRes.data.tags || []).join(', '),
          meta_title: postRes.data.meta_title || '',
          meta_description: postRes.data.meta_description || '',
          published: postRes.data.published,
        });
      } else {
        toast.error('Post not found');
        router.push('/admin/blog');
      }
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

    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    const { error } = await supabase.from('blog_posts').update({
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
      updated_at: new Date().toISOString(),
    }).eq('id', id);

    if (error) {
      toast.error('Failed to update post: ' + error.message);
    } else {
      toast.success('Post updated successfully');
      router.push('/admin/blog');
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
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Edit Blog Post</h1>
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
              <Input id="slug" value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} required />
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
              <Textarea id="excerpt" value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input id="featured_image" value={form.featured_image} onChange={(e) => handleChange('featured_image', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" value={form.tags} onChange={(e) => handleChange('tags', e.target.value)} />
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
              <Label htmlFor="published" className="font-normal">Published</Label>
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
