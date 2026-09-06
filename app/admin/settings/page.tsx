'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState('text');

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true });
    if (error) {
      toast.error('Failed to load settings');
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdate = async (id: string, value: string) => {
    const { error } = await supabase.from('site_settings').update({ value, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) {
      toast.error('Failed to update setting');
    } else {
      toast.success('Setting updated');
      setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('site_settings').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete setting');
    } else {
      toast.success('Setting deleted');
      setSettings((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim()) {
      toast.error('Key is required');
      return;
    }
    const { error } = await supabase.from('site_settings').insert({
      key: newKey.trim(),
      value: newValue.trim() || null,
      type: newType,
    });
    if (error) {
      toast.error('Failed to create setting: ' + error.message);
    } else {
      toast.success('Setting created');
      setNewKey('');
      setNewValue('');
      setNewType('text');
      fetchSettings();
    }
  };

  const renderInput = (setting: SiteSetting) => {
    if (setting.type === 'textarea') {
      return (
        <Textarea
          defaultValue={setting.value || ''}
          onBlur={(e) => handleUpdate(setting.id, e.target.value)}
          rows={3}
          className="min-h-[80px]"
        />
      );
    }
    if (setting.type === 'number') {
      return (
        <Input
          type="number"
          defaultValue={setting.value || ''}
          onBlur={(e) => handleUpdate(setting.id, e.target.value)}
        />
      );
    }
    return (
      <Input
        defaultValue={setting.value || ''}
        onBlur={(e) => handleUpdate(setting.id, e.target.value)}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1a3a]">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage key-value site settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Setting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Key (e.g. site_name)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="sm:w-48"
            />
            <Input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm sm:w-32"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="number">Number</option>
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="boolean">Boolean</option>
            </select>
            <Button type="submit" className="bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]" />
            </div>
          ) : settings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No settings yet. Add your first setting above.
            </div>
          ) : (
            <div className="space-y-4">
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex flex-col sm:flex-row gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="sm:w-48 shrink-0">
                    <Label className="text-xs text-gray-400 uppercase tracking-wider">{setting.type}</Label>
                    <div className="font-medium text-[#0a1a3a] text-sm mt-1">{setting.key}</div>
                  </div>
                  <div className="flex-1">
                    {renderInput(setting)}
                  </div>
                  <div className="sm:w-10 flex items-start justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(setting.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
