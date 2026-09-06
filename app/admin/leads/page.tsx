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
import { Search, Trash2, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewLead, setViewLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load leads');
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from('consultations').update({ status }).eq('id', id);
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('consultations').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete lead');
    } else {
      toast.success('Lead deleted');
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
    setDeleteId(null);
  };

  const filtered = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || (l.email || '').toLowerCase().includes(search.toLowerCase()) || (l.phone || '').includes(search);
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['all', 'new', 'contacted', 'in_progress', 'completed', 'cancelled'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1a3a]">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Manage consultation requests and leads</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              {statusOptions.filter((s) => s !== 'all').map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
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
              {search || statusFilter !== 'all' ? 'No leads match your filters' : 'No leads yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium text-[#0a1a3a]">
                        <div>{lead.name}</div>
                        <div className="text-xs text-gray-400">{lead.email || '—'}</div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{lead.service || '—'}</TableCell>
                      <TableCell>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="text-xs rounded-md border border-input bg-background px-2 py-1"
                        >
                          {statusOptions.filter((s) => s !== 'all').map((s) => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewLead(lead)}
                            title="View details"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setDeleteId(lead.id)}
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
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewLead} onOpenChange={() => setViewLead(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {viewLead && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0a1a3a] flex items-center justify-center text-white text-sm">
                  {viewLead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-[#0a1a3a]">{viewLead.name}</div>
                  <div className="text-sm text-gray-500">{viewLead.email || 'No email'}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{viewLead.phone}</span>
                </div>
                {viewLead.preferred_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(viewLead.preferred_date).toLocaleDateString()}</span>
                  </div>
                )}
                {viewLead.service && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Service:</span>
                    <span>{viewLead.service}</span>
                  </div>
                )}
                {viewLead.message && (
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Message</div>
                    {viewLead.message}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewLead(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
