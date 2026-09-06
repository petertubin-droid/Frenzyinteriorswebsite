'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Search, Plus, Trash2, ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  category_id: string | null;
  title: string | null;
  image_url: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  gallery_categories?: { name: string } | null;
}

interface GalleryCategory {
  id: string;
  name: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const [imgRes, catRes] = await Promise.all([
      supabase.from('gallery_images').select('*, gallery_categories(name)').order('sort_order', { ascending: true }),
      supabase.from('gallery_categories').select('id, name').order('name'),
    ]);
    if (imgRes.error) {
      toast.error('Failed to load gallery images');
    } else {
      setImages(imgRes.data || []);
    }
    setCategories(catRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete image');
    } else {
      toast.success('Image deleted');
      setImages((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleteId(null);
  };

  const filtered = images.filter((i) => {
    const matchesSearch = (i.title || '').toLowerCase().includes(search.toLowerCase()) || (i.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || i.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1a3a]">Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your gallery images</p>
        </div>
        <Link href="/admin/gallery/new">
          <Button className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {search || categoryFilter !== 'all' ? 'No images match your filters' : 'No gallery images yet. Upload your first image.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sort Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((img) => (
                    <TableRow key={img.id}>
                      <TableCell>
                        {img.image_url ? (
                          <img src={img.image_url} alt={img.title || ''} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-[#0a1a3a]">{img.title || '—'}</TableCell>
                      <TableCell className="text-gray-600">{img.gallery_categories?.name || '—'}</TableCell>
                      <TableCell className="text-gray-600">{img.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setDeleteId(img.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this gallery image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
