/*
# RLS Policies for Frenzy Interiors

1. Security Strategy
- Public tables: SELECT open to all (anon + authenticated)
- Admin tables: Full CRUD restricted to authenticated admin users only
- Consultations: Public can INSERT (leads from forms), admin can SELECT/UPDATE/DELETE
- Newsletters: Public can INSERT, admin can SELECT
- Audit logs: Admin only

2. Helper Functions
- `is_admin(user_id uuid)`: Checks if user has admin role in admin_users table

3. Policies per table
*/

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
