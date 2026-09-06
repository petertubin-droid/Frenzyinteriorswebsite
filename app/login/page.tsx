'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paintbrush, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        checkAdmin(data.session.user.id);
      } else {
        setChecking(false);
      }
    });
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (data) {
      router.push('/admin');
    } else {
      setChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .maybeSingle();
      if (adminData) {
        toast.success('Welcome to the admin dashboard');
        router.push('/admin');
      } else {
        toast.error('You do not have admin access');
        await supabase.auth.signOut();
      }
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1a3a]">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1a3a] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#0a1a3a] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Paintbrush className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0a1a3a]">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">Frenzy Interiors Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0a1a3a] hover:bg-[#0a1a3a]/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
