import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Tables = {
  product_categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    sort_order: number;
    created_at: string;
  };
  products: {
    id: string;
    name: string;
    slug: string;
    category_id: string | null;
    description: string | null;
    specifications: string | null;
    price: number | null;
    image_urls: string[];
    featured: boolean;
    created_at: string;
    updated_at: string;
  };
  services: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    benefits: string[];
    image_urls: string[];
    before_after_images: any[];
    featured: boolean;
    created_at: string;
    updated_at: string;
  };
  portfolio_projects: {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string | null;
    image_urls: string[];
    before_after: any[];
    completion_date: string | null;
    customer_review: string | null;
    customer_name: string | null;
    featured: boolean;
    created_at: string;
  };
  gallery_categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    created_at: string;
  };
  gallery_images: {
    id: string;
    category_id: string | null;
    title: string | null;
    image_url: string;
    description: string | null;
    sort_order: number;
    created_at: string;
  };
  blog_categories: {
    id: string;
    name: string;
    slug: string;
    created_at: string;
  };
  blog_posts: {
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
    published_at: string | null;
    scheduled_at: string | null;
    created_at: string;
    updated_at: string;
  };
  testimonials: {
    id: string;
    name: string;
    email: string | null;
    avatar_url: string | null;
    content: string;
    rating: number;
    approved: boolean;
    featured: boolean;
    created_at: string;
  };
  consultations: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    service: string | null;
    preferred_date: string | null;
    message: string | null;
    status: string;
    created_at: string;
  };
  site_settings: {
    id: string;
    key: string;
    value: string | null;
    type: string;
    created_at: string;
    updated_at: string;
  };
  seo_pages: {
    id: string;
    page_path: string;
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
    canonical_url: string | null;
    schema_markup: string | null;
    created_at: string;
    updated_at: string;
  };
  newsletter_subscribers: {
    id: string;
    email: string;
    name: string | null;
    subscribed: boolean;
    created_at: string;
  };
  admin_users: {
    id: string;
    user_id: string;
    role: string;
    created_at: string;
  };
  audit_logs: {
    id: string;
    user_id: string | null;
    action: string;
    table_name: string | null;
    record_id: string | null;
    old_values: any;
    new_values: any;
    created_at: string;
  };
};
