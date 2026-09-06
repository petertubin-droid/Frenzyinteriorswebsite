--
-- FRENZY INTERIORS - COMPLETE SUPABASE SCHEMA
-- Generated: 2026-06-23
--
-- This file contains the complete database schema, RLS policies, indexes,
-- helper functions, and seed data for the Frenzy Interiors website.
--
-- To apply: Run this entire file in the Supabase SQL Editor
--

-- ============================================================
-- 1. CORE TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  description text,
  specifications text,
  price numeric(12,2),
  image_urls text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  benefits text[] DEFAULT '{}',
  image_urls text[] DEFAULT '{}',
  before_after_images jsonb DEFAULT '[]',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  image_urls text[] DEFAULT '{}',
  before_after jsonb DEFAULT '[]',
  completion_date date,
  customer_review text,
  customer_name text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES gallery_categories(id) ON DELETE CASCADE,
  title text,
  image_url text NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  tags text[] DEFAULT '{}',
  meta_title text,
  meta_description text,
  published boolean DEFAULT false,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  avatar_url text,
  content text NOT NULL,
  rating int DEFAULT 5,
  approved boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text,
  preferred_date date,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  type text DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text UNIQUE NOT NULL,
  meta_title text,
  meta_description text,
  og_image text,
  canonical_url text,
  schema_markup text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 2. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_seo_pages_path ON seo_pages(page_path);
CREATE INDEX IF NOT EXISTS idx_admin_users_user ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- ============================================================
-- 3. HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.user_id = user_id AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_editor_or_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE admin_users.user_id = user_id AND role IN ('admin', 'super_admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Product categories
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_categories_public" ON product_categories;
CREATE POLICY "select_categories_public" ON product_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_categories_write" ON product_categories;
CREATE POLICY "admin_categories_write" ON product_categories FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_categories_update" ON product_categories;
CREATE POLICY "admin_categories_update" ON product_categories FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_categories_delete" ON product_categories;
CREATE POLICY "admin_categories_delete" ON product_categories FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_products_public" ON products;
CREATE POLICY "select_products_public" ON products FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_products_write" ON products;
CREATE POLICY "admin_products_write" ON products FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_products_update" ON products;
CREATE POLICY "admin_products_update" ON products FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_products_delete" ON products;
CREATE POLICY "admin_products_delete" ON products FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_services_public" ON services;
CREATE POLICY "select_services_public" ON services FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_services_write" ON services;
CREATE POLICY "admin_services_write" ON services FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_services_update" ON services;
CREATE POLICY "admin_services_update" ON services FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_services_delete" ON services;
CREATE POLICY "admin_services_delete" ON services FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Portfolio projects
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_portfolio_public" ON portfolio_projects;
CREATE POLICY "select_portfolio_public" ON portfolio_projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_portfolio_write" ON portfolio_projects;
CREATE POLICY "admin_portfolio_write" ON portfolio_projects FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_portfolio_update" ON portfolio_projects;
CREATE POLICY "admin_portfolio_update" ON portfolio_projects FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_portfolio_delete" ON portfolio_projects;
CREATE POLICY "admin_portfolio_delete" ON portfolio_projects FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Gallery categories
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_gallery_categories_public" ON gallery_categories;
CREATE POLICY "select_gallery_categories_public" ON gallery_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_gallery_categories_write" ON gallery_categories;
CREATE POLICY "admin_gallery_categories_write" ON gallery_categories FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_gallery_categories_update" ON gallery_categories;
CREATE POLICY "admin_gallery_categories_update" ON gallery_categories FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_gallery_categories_delete" ON gallery_categories;
CREATE POLICY "admin_gallery_categories_delete" ON gallery_categories FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Gallery images
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_gallery_images_public" ON gallery_images;
CREATE POLICY "select_gallery_images_public" ON gallery_images FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_gallery_images_write" ON gallery_images;
CREATE POLICY "admin_gallery_images_write" ON gallery_images FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_gallery_images_update" ON gallery_images;
CREATE POLICY "admin_gallery_images_update" ON gallery_images FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_gallery_images_delete" ON gallery_images;
CREATE POLICY "admin_gallery_images_delete" ON gallery_images FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Blog categories
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_blog_categories_public" ON blog_categories;
CREATE POLICY "select_blog_categories_public" ON blog_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_blog_categories_write" ON blog_categories;
CREATE POLICY "admin_blog_categories_write" ON blog_categories FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_blog_categories_update" ON blog_categories;
CREATE POLICY "admin_blog_categories_update" ON blog_categories FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_blog_categories_delete" ON blog_categories;
CREATE POLICY "admin_blog_categories_delete" ON blog_categories FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Blog posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_blog_posts_public" ON blog_posts;
CREATE POLICY "select_blog_posts_public" ON blog_posts FOR SELECT TO anon, authenticated USING (published = true);
DROP POLICY IF EXISTS "admin_blog_posts_all" ON blog_posts;
CREATE POLICY "admin_blog_posts_all" ON blog_posts FOR SELECT TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_blog_posts_write" ON blog_posts;
CREATE POLICY "admin_blog_posts_write" ON blog_posts FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_blog_posts_update" ON blog_posts;
CREATE POLICY "admin_blog_posts_update" ON blog_posts FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_blog_posts_delete" ON blog_posts;
CREATE POLICY "admin_blog_posts_delete" ON blog_posts FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_testimonials_public" ON testimonials;
CREATE POLICY "select_testimonials_public" ON testimonials FOR SELECT TO anon, authenticated USING (approved = true);
DROP POLICY IF EXISTS "admin_testimonials_all" ON testimonials;
CREATE POLICY "admin_testimonials_all" ON testimonials FOR SELECT TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_testimonials_write" ON testimonials;
CREATE POLICY "admin_testimonials_write" ON testimonials FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_testimonials_update" ON testimonials;
CREATE POLICY "admin_testimonials_update" ON testimonials FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_testimonials_delete" ON testimonials;
CREATE POLICY "admin_testimonials_delete" ON testimonials FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "public_testimonials_write" ON testimonials;
CREATE POLICY "public_testimonials_write" ON testimonials FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Consultations
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_consultations_select" ON consultations;
CREATE POLICY "admin_consultations_select" ON consultations FOR SELECT TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_consultations_update" ON consultations;
CREATE POLICY "admin_consultations_update" ON consultations FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_consultations_delete" ON consultations;
CREATE POLICY "admin_consultations_delete" ON consultations FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "public_consultations_insert" ON consultations;
CREATE POLICY "public_consultations_insert" ON consultations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Site settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_settings_select" ON site_settings;
CREATE POLICY "admin_settings_select" ON site_settings FOR SELECT TO authenticated USING (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_settings_write" ON site_settings;
CREATE POLICY "admin_settings_write" ON site_settings FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_settings_update" ON site_settings;
CREATE POLICY "admin_settings_update" ON site_settings FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_settings_delete" ON site_settings;
CREATE POLICY "admin_settings_delete" ON site_settings FOR DELETE TO authenticated USING (is_admin(auth.uid()));
DROP POLICY IF EXISTS "public_settings_select" ON site_settings;
CREATE POLICY "public_settings_select" ON site_settings FOR SELECT TO anon, authenticated USING (true);

-- SEO pages
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_seo_public" ON seo_pages;
CREATE POLICY "select_seo_public" ON seo_pages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_seo_write" ON seo_pages;
CREATE POLICY "admin_seo_write" ON seo_pages FOR INSERT TO authenticated WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_seo_update" ON seo_pages;
CREATE POLICY "admin_seo_update" ON seo_pages FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_seo_delete" ON seo_pages;
CREATE POLICY "admin_seo_delete" ON seo_pages FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));

-- Newsletter subscribers
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_newsletter_select" ON newsletter_subscribers;
CREATE POLICY "admin_newsletter_select" ON newsletter_subscribers FOR SELECT TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_newsletter_update" ON newsletter_subscribers;
CREATE POLICY "admin_newsletter_update" ON newsletter_subscribers FOR UPDATE TO authenticated USING (is_editor_or_admin(auth.uid())) WITH CHECK (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_newsletter_delete" ON newsletter_subscribers;
CREATE POLICY "admin_newsletter_delete" ON newsletter_subscribers FOR DELETE TO authenticated USING (is_editor_or_admin(auth.uid()));
DROP POLICY IF EXISTS "public_newsletter_insert" ON newsletter_subscribers;
CREATE POLICY "public_newsletter_insert" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admin users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_users_select" ON admin_users;
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "admin_users_write" ON admin_users;
CREATE POLICY "admin_users_write" ON admin_users FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_users_update" ON admin_users;
CREATE POLICY "admin_users_update" ON admin_users FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_users_delete" ON admin_users;
CREATE POLICY "admin_users_delete" ON admin_users FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_audit_select" ON audit_logs;
CREATE POLICY "admin_audit_select" ON audit_logs FOR SELECT TO authenticated USING (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_audit_write" ON audit_logs;
CREATE POLICY "admin_audit_write" ON audit_logs FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_audit_update" ON audit_logs;
CREATE POLICY "admin_audit_update" ON audit_logs FOR UPDATE TO authenticated USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
DROP POLICY IF EXISTS "admin_audit_delete" ON audit_logs;
CREATE POLICY "admin_audit_delete" ON audit_logs FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- ============================================================
-- 5. SEED DATA
-- ============================================================

-- Product Categories
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Paints', 'paints', 'Premium interior and exterior paints for every space', 1),
('Wallpapers', 'wallpapers', 'Designer wallpapers to transform any room', 2),
('Wall Panels', 'wall-panels', 'Modern wall panels for luxury interiors', 3),
('Bed Frames', 'bed-frames', 'Stylish and durable bed frames', 4),
('Furniture', 'furniture', 'Custom furniture for homes and offices', 5),
('Wardrobes', 'wardrobes', 'Built-in and freestanding wardrobes', 6)
ON CONFLICT (slug) DO NOTHING;

-- Services
INSERT INTO services (title, slug, description, benefits, featured) VALUES
('Painting Services', 'painting-services',
 'Professional interior and exterior painting services using premium paints and expert techniques to deliver flawless finishes that transform your space.',
 ARRAY['Premium quality paints', 'Expert color consultation', 'Fast project completion', '5-year warranty on work'],
 true),
('Wall Screeding', 'wall-screeding',
 'Smooth wall screeding services that create the perfect canvas for paint or wallpaper. We use high-quality materials to ensure long-lasting, crack-free finishes.',
 ARRAY['Smooth flawless finish', 'Crack resistant', 'Durable application', 'Suitable for any surface'],
 true),
('POP Ceilings', 'pop-ceilings',
 'Custom POP (Plaster of Paris) ceiling designs including false ceilings, cornices, and decorative elements that add elegance and sophistication to any room.',
 ARRAY['Custom designs available', 'Fire resistant', 'Sound insulation', 'Thermal insulation'],
 true),
('Industrial Cleaning', 'industrial-cleaning',
 'Post-construction and industrial cleaning services for newly renovated spaces, commercial buildings, and large-scale projects. We leave every surface spotless.',
 ARRAY['Eco-friendly cleaning products', 'Trained cleaning staff', 'Deep cleaning', 'Fast turnaround'],
 true),
('Paint Production', 'paint-production',
 'Custom paint production and color matching services. We create bespoke paint formulations for specialized projects and unique color requirements.',
 ARRAY['Custom color matching', 'Bulk production available', 'Laboratory tested', 'Competitive pricing'],
 true)
ON CONFLICT (slug) DO NOTHING;

-- Blog Categories
INSERT INTO blog_categories (name, slug) VALUES
('Interior Design', 'interior-design'),
('Painting Tips', 'painting-tips'),
('Home Decoration', 'home-decoration'),
('Furniture Ideas', 'furniture-ideas'),
('Ceiling Designs', 'ceiling-designs'),
('Building Maintenance', 'building-maintenance')
ON CONFLICT (slug) DO NOTHING;

-- Gallery Categories
INSERT INTO gallery_categories (name, slug, description, sort_order) VALUES
('Paint Projects', 'paint-projects', 'Completed painting projects', 1),
('POP Ceilings', 'pop-ceiling-projects', 'POP ceiling installations', 2),
('Wall Panels', 'wall-panel-projects', 'Wall panel installations', 3),
('Furniture Installations', 'furniture-installations', 'Custom furniture projects', 4),
('Industrial Cleaning', 'industrial-cleaning-projects', 'Before and after cleaning projects', 5),
('Interior Decoration', 'interior-decoration-projects', 'Complete interior decoration projects', 6)
ON CONFLICT (slug) DO NOTHING;

-- Site Settings
INSERT INTO site_settings (key, value, type) VALUES
('business_name', 'Frenzy Interiors', 'text'),
('phone_1', '+2349063612439', 'text'),
('phone_2', '+2349126717830', 'text'),
('email', 'info@frenzyinteriors.com', 'text'),
('address', 'Lagos, Nigeria', 'text'),
('tagline', 'Transforming Spaces Into Masterpieces', 'text'),
('facebook_url', 'https://facebook.com/frenzyinteriors', 'text'),
('instagram_url', 'https://instagram.com/frenzyinteriors', 'text'),
('tiktok_url', 'https://tiktok.com/@frenzyinteriors', 'text'),
('youtube_url', 'https://youtube.com/frenzyinteriors', 'text')
ON CONFLICT (key) DO NOTHING;

-- SEO Pages
INSERT INTO seo_pages (page_path, meta_title, meta_description) VALUES
('/', 'Frenzy Interiors | Transforming Spaces Into Masterpieces', 'Frenzy Interiors offers premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria.'),
('/about', 'About Us | Frenzy Interiors', 'Learn about Frenzy Interiors - Nigeria leading interior decoration company.'),
('/contact', 'Contact Us | Frenzy Interiors', 'Get in touch with Frenzy Interiors. Call us at +2349063612439.'),
('/services', 'Our Services | Frenzy Interiors', 'Explore our professional interior decoration services.'),
('/products', 'Our Products | Frenzy Interiors', 'Browse premium paints, wallpapers, wall panels, and furniture.'),
('/portfolio', 'Portfolio | Frenzy Interiors', 'View our completed interior decoration projects.'),
('/gallery', 'Gallery | Frenzy Interiors', 'Explore our image gallery showcasing projects.'),
('/blog', 'Blog | Frenzy Interiors', 'Read interior design tips and home decoration ideas.'),
('/faq', 'FAQ | Frenzy Interiors', 'Find answers to frequently asked questions.')
ON CONFLICT (page_path) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (name, email, content, rating, approved, featured) VALUES
('Amara Okonkwo', 'amara.okonkwo@email.com', 'Frenzy Interiors transformed our living room beyond our expectations. The paint quality and attention to detail was outstanding. Highly recommended!', 5, true, true),
('Tunde Balogun', 'tunde.balogun@email.com', 'The POP ceiling they installed in our new home is absolutely stunning. Professional team, on-time delivery, and fair pricing. Five stars!', 5, true, true),
('Ngozi Eze', 'ngozi.eze@email.com', 'We needed custom wardrobes for our bedroom and Frenzy Interiors delivered exactly what we wanted. The craftsmanship is exceptional.', 5, true, true),
('Chidi Okafor', 'chidi.okafor@email.com', 'Best painting service in Lagos! They helped us choose the perfect colors and the finish is flawless. Will definitely hire them again.', 5, true, true),
('Folake Adeyemi', 'folake.adeyemi@email.com', 'The wall panels they installed gave our office a modern, luxurious look. Great value for money and professional installation.', 5, true, true)
ON CONFLICT DO NOTHING;

-- Products
INSERT INTO products (name, slug, category_id, description, specifications, price, featured) VALUES
('Premium Interior Emulsion', 'premium-interior-emulsion',
  (SELECT id FROM product_categories WHERE slug = 'paints'),
  'High-quality interior emulsion paint with excellent coverage and durability. Perfect for living rooms, bedrooms, and offices.',
  'Coverage: 12-14 sqm per liter | Finish: Matt | Drying: 2-4 hours | Base: Water-based',
  18500.00, true),
('Weather Shield Exterior Paint', 'weather-shield-exterior-paint',
  (SELECT id FROM product_categories WHERE slug = 'paints'),
  'Weather-resistant exterior paint designed for Nigerian climate. Protects against UV, rain, and humidity.',
  'Coverage: 10-12 sqm per liter | Finish: Satin | Drying: 4-6 hours | Base: Acrylic',
  22500.00, true),
('Luxury 3D Wallpaper', 'luxury-3d-wallpaper',
  (SELECT id FROM product_categories WHERE slug = 'wallpapers'),
  'Stunning 3D textured wallpaper that adds depth and elegance to any room. Easy to install and maintain.',
  'Roll Size: 0.53m x 10m | Material: Non-woven | Pattern: Repeatable | Washable: Yes',
  35000.00, true),
('Modern Wall Panel Set', 'modern-wall-panel-set',
  (SELECT id FROM product_categories WHERE slug = 'wall-panels'),
  'Contemporary wall panels made from premium PVC with realistic wood grain texture. Perfect for accent walls.',
  'Panel Size: 25cm x 2.7m | Thickness: 8mm | Material: PVC | Pack: 10 panels',
  48000.00, true),
('King Size Upholstered Bed Frame', 'king-size-upholstered-bed-frame',
  (SELECT id FROM product_categories WHERE slug = 'bed-frames'),
  'Elegant king-size bed frame with premium fabric upholstery and sturdy wooden frame. Includes headboard.',
  'Size: 180x200cm | Material: Fabric + Wood | Color: Gray | Assembly: Required',
  125000.00, true),
('Custom Executive Office Desk', 'custom-executive-office-desk',
  (SELECT id FROM product_categories WHERE slug = 'furniture'),
  'Handcrafted executive office desk with built-in storage and premium wood finish. Customizable dimensions.',
  'Dimensions: 180x90x75cm | Material: HDF + Veneer | Drawers: 3 | Finish: Walnut',
  85000.00, true),
('Walk-In Wardrobe System', 'walk-in-wardrobe-system',
  (SELECT id FROM product_categories WHERE slug = 'wardrobes'),
  'Complete walk-in wardrobe with hanging rails, shelves, drawers, and shoe rack. Customizable layout.',
  'Dimensions: Custom | Material: MDF + Laminate | Finish: White Gloss | LED: Included',
  185000.00, true)
ON CONFLICT (slug) DO NOTHING;

-- Blog Posts
INSERT INTO blog_posts (title, slug, category_id, content, excerpt, featured_image, published, published_at, tags, meta_title, meta_description) VALUES
(
  '2024 Interior Design Trends for Nigerian Homes',
  '2024-interior-design-trends-nigerian-homes',
  (SELECT id FROM blog_categories WHERE slug = 'interior-design'),
  'As we move through 2024, Nigerian homeowners are embracing bold, sophisticated interior design choices. The trends this year reflect a blend of global influences with distinctly African aesthetics. From warm earthy tones to sustainable materials, here are the top trends shaping Nigerian interiors this year.

## 1. Warm Earthy Color Palettes

Gone are the days of stark white walls. Nigerian homes in 2024 are embracing warm, earthy tones like terracotta, burnt orange, deep olive, and sandy beige.

## 2. Biophilic Design

Bringing nature indoors continues to be a major trend. Incorporating plants, natural materials like wood and stone, and maximizing natural light creates spaces that feel connected to the environment.

## 3. Statement Ceilings

The ceiling is becoming the fifth wall. Bold POP ceiling designs, decorative cornices, and even painted ceilings are making a statement in modern Nigerian homes.

## 4. Sustainable and Local Materials

There is a growing appreciation for locally sourced materials and sustainable design choices. Nigerian artisans and craftsmen are being recognized for their quality work.

## 5. Multifunctional Spaces

With the rise of remote work, homes are being designed with flexibility in mind. Rooms that serve multiple purposes are becoming essential.

At Frenzy Interiors, we are at the forefront of these trends, helping our clients create spaces that are both beautiful and functional.',
  'Discover the top interior design trends for 2024 that Nigerian homeowners are embracing.',
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  true, now(),
  ARRAY['interior design', 'trends', '2024', 'nigerian homes'],
  '2024 Interior Design Trends for Nigerian Homes | Frenzy Interiors',
  'Discover the latest interior design trends for Nigerian homes in 2024.'
),
(
  'How to Choose the Perfect Paint Color for Your Living Room',
  'how-to-choose-perfect-paint-color-living-room',
  (SELECT id FROM blog_categories WHERE slug = 'painting-tips'),
  'Choosing the right paint color for your living room can be overwhelming. Here is our comprehensive guide.

## Consider the Room Size

Light colors make small rooms feel larger and more open. Dark colors can make large rooms feel cozier.

## Lighting Matters

Natural light changes throughout the day. Test paint samples at different times to see how the color looks.

## The 60-30-10 Rule

For a balanced color scheme: 60% dominant color (walls), 30% secondary color (furniture), 10% accent color (decor).

## Popular Living Room Colors in Nigeria

1. **Cream/Beige** - Timeless and versatile
2. **Sage Green** - Calming and on-trend
3. **Warm Gray** - Modern and sophisticated
4. **Terracotta** - Warm and inviting
5. **Soft Blue** - Serene and calming

## Professional Help

At Frenzy Interiors, our color consultants can help you choose the perfect palette for your home.',
  'A comprehensive guide to choosing the perfect paint color for your living room.',
  'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
  true, now(),
  ARRAY['paint', 'colors', 'living room', 'painting tips'],
  'How to Choose the Perfect Paint Color for Your Living Room',
  'Expert guide on choosing living room paint colors.'
),
(
  'The Complete Guide to POP Ceiling Designs',
  'complete-guide-pop-ceiling-designs',
  (SELECT id FROM blog_categories WHERE slug = 'ceiling-designs'),
  'POP (Plaster of Paris) ceilings have become a staple in modern Nigerian homes. They add elegance, hide electrical wiring, and improve room acoustics.

## What is POP Ceiling?

Plaster of Paris is a quick-setting gypsum plaster that can be molded into any shape. It is lightweight, durable, and fire-resistant.

## Popular POP Ceiling Designs

- **Simple False Ceiling** - A single-level recessed ceiling with clean edges.
- **Multi-Level Ceiling** - Creates depth and visual interest.
- **Coffered Ceiling** - A grid of recessed panels that adds a classic look.
- **Circular/Round Design** - A circular recessed center with lighting.
- **Perimeter Recessed** - Recessed edges with LED strip lighting.

## Benefits of POP Ceilings

- **Aesthetic Appeal**: Transforms plain ceilings into works of art
- **Hides Wiring**: Conceals electrical and AC ductwork
- **Sound Insulation**: Reduces echo and noise
- **Fire Resistance**: Naturally fire-retardant
- **Thermal Insulation**: Helps maintain room temperature

## Cost Considerations

Simple designs start from 15,000 per sqm, while intricate designs can cost 40,000+ per sqm.

## Frenzy Interiors POP Ceiling Services

We specialize in custom POP ceiling designs tailored to your home. Contact us for a free quote.',
  'Everything you need to know about POP ceiling designs.',
  'https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg',
  true, now(),
  ARRAY['POP ceiling', 'ceiling designs', 'interior design'],
  'Complete Guide to POP Ceiling Designs | Frenzy Interiors',
  'Learn about POP ceiling designs, benefits, costs, and maintenance.'
)
ON CONFLICT (slug) DO NOTHING;

-- Portfolio Projects
INSERT INTO portfolio_projects (title, slug, category, description, completion_date, customer_review, customer_name, featured) VALUES
(
  'Luxury Villa Interior Makeover',
  'luxury-villa-interior-makeover',
  'Interior Decoration',
  'Complete interior transformation of a 5-bedroom villa in Lekki, Lagos. Included wall painting, POP ceiling installation, custom furniture, and wall paneling.',
  '2024-03-15',
  'The team at Frenzy Interiors exceeded our expectations. Every detail was perfect. Our villa looks like a 5-star hotel now!',
  'Mr. & Mrs. Adeleke',
  true
),
(
  'Modern Office Complex Painting',
  'modern-office-complex-painting',
  'Painting',
  'Full exterior and interior painting of a 3-story office complex in Victoria Island.',
  '2024-01-20',
  'Professional work from start to finish. The office looks incredible and the paint has held up perfectly.',
  'TechHub Nigeria',
  true
),
(
  'Contemporary Apartment POP Ceiling',
  'contemporary-apartment-pop-ceiling',
  'POP Ceilings',
  'Custom POP ceiling design for a 3-bedroom apartment in Ikoyi.',
  '2024-02-10',
  'The POP ceiling design is stunning. Our guests always comment on how beautiful it looks.',
  'Dr. Ibrahim',
  true
)
ON CONFLICT (slug) DO NOTHING;
