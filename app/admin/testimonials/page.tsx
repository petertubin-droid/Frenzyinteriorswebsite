'use client';

import { useEffect, useState } from 'react';
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
import { Search, Check, X, Trash2, Star, ImageIcon } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  email: string | null;
  avatar_url: string | null;
  content: string;
  rating: number;
  approved: boolean;
  featured: boolean;
  created_at: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load testimonials');
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string, approved: boolean) => {
    const { error } = await supabase.from('testimonials').update({ approved: !approved }).eq('id', id);
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(approved ? 'Testimonial rejected' : 'Testimonial approved');
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, approved: !approved } : t)));
    }
  };

  const handleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase.from('testimonials').update({ featured: !featured }).eq('id', id);
    if (error) {
      toast.error('Failed to update featured status');
    } else {
      toast.success(featured ? 'Removed from featured' : 'Marked as featured');
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, featured: !featured } : t)));
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete testimonial');
    } else {
      toast.success('Testimonial deleted');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
    setDeleteId(null);
  };

  const filtered = testimonials.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.content.toLowerCase().includes(search.toLowerCase());
    if (filter === 'pending') return matchesSearch && !t.approved;
    if (filter === 'approved') return matchesSearch && t.approved;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1a3a]">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer testimonials and reviews</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search testimonials..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-[#0a1a3a] text-white' : ''}>All</Button>
              <Button variant={filter === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('pending')} className={filter === 'pending' ? 'bg-[#0a1a3a] text-white' : ''}>Pending</Button>
              <Button variant={filter === 'approved' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('approved')} className={filter === 'approved' ? 'bg-[#0a1a3a] text-white' : ''}>Approved</Button>
            </div>
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
              {search || filter !== 'all' ? 'No testimonials match your filters' : 'No testimonials yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        {t.avatar_url ? (
                          <img src={t.avatar_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-[#0a1a3a]">
                        <div>{t.name}</div>
                        <div className="text-xs text-gray-400">{t.email || '—'}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs truncate">{t.content}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {t.approved ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 w-fit">
                              Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600 w-fit">
                              Pending
                            </span>
                          )}
                          {t.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#d4af37]/10 text-[#d4af37] w-fit">
                              Featured
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(t.id, t.approved)}
                            title={t.approved ? 'Reject' : 'Approve'}
                          >
                            {t.approved ? <X className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-600" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeatured(t.id, t.featured)}
                            title={t.featured ? 'Unfeature' : 'Feature'}
                          >
                            <Star className={`w-4 h-4 ${t.featured ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-400'}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setDeleteId(t.id)}
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
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
