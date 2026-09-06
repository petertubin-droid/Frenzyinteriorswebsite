'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, User, Search, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function AdminHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-4 h-4" />
            View Site
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64 h-9 bg-gray-50"
          />
        </div>
        <button className="relative w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l">
          <div className="w-8 h-8 rounded-full bg-[#0a1a3a] flex items-center justify-center text-white text-sm font-medium">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.email?.split('@')[0] || 'Admin'}
          </span>
        </div>
      </div>
    </header>
  );
}
