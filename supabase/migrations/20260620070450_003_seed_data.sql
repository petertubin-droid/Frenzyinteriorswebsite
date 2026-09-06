/*
# Seed Data for Frenzy Interiors

1. Insert default product categories
2. Insert default services
3. Insert default blog categories
4. Insert default gallery categories
5. Insert default site settings
6. Insert default SEO pages
7. Insert default portfolio categories
8. Insert default admin user

This seeds the database with foundational data so the website is functional immediately after deployment.
*/

INSERT INTO product_categories (name, slug, description, sort_order) VALUES
('Paints', 'paints', 'Premium interior and exterior paints for every space', 1),
('Wallpapers', 'wallpapers', 'Designer wallpapers to transform any room', 2),
('Wall Panels', 'wall-panels', 'Modern wall panels for luxury interiors', 3),
('Bed Frames', 'bed-frames', 'Stylish and durable bed frames', 4),
('Furniture', 'furniture', 'Custom furniture for homes and offices', 5),
('Wardrobes', 'wardrobes', 'Built-in and freestanding wardrobes', 6)
ON CONFLICT (slug) DO NOTHING;

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

INSERT INTO blog_categories (name, slug) VALUES
('Interior Design', 'interior-design'),
('Painting Tips', 'painting-tips'),
('Home Decoration', 'home-decoration'),
('Furniture Ideas', 'furniture-ideas'),
('Ceiling Designs', 'ceiling-designs'),
('Building Maintenance', 'building-maintenance')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO gallery_categories (name, slug, description, sort_order) VALUES
('Paint Projects', 'paint-projects', 'Completed painting projects', 1),
('POP Ceilings', 'pop-ceiling-projects', 'POP ceiling installations', 2),
('Wall Panels', 'wall-panel-projects', 'Wall panel installations', 3),
('Furniture Installations', 'furniture-installations', 'Custom furniture projects', 4),
('Industrial Cleaning', 'industrial-cleaning-projects', 'Before and after cleaning projects', 5),
('Interior Decoration', 'interior-decoration-projects', 'Complete interior decoration projects', 6)
ON CONFLICT (slug) DO NOTHING;

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
('youtube_url', 'https://youtube.com/frenzyinteriors', 'text'),
('google_maps_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12693.56933732092!2d3.379205!3d6.524379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuNyJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1600000000000!5m2!1sen!2sng', 'text'),
('ads_header_script', '', 'text'),
('ads_footer_script', '', 'text'),
('logo_url', '', 'text'),
('favicon_url', '', 'text')
ON CONFLICT (key) DO NOTHING;

INSERT INTO seo_pages (page_path, meta_title, meta_description) VALUES
('/', 'Frenzy Interiors | Transforming Spaces Into Masterpieces', 'Frenzy Interiors offers premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria. Request a consultation today.'),
('/about', 'About Us | Frenzy Interiors', 'Learn about Frenzy Interiors - Nigeria leading interior decoration company. We specialize in painting, wall finishes, furniture, and building aesthetics.'),
('/contact', 'Contact Us | Frenzy Interiors', 'Get in touch with Frenzy Interiors. Call us at +2349063612439 or +2349126717830. We offer free consultations for all interior design projects.'),
('/services', 'Our Services | Frenzy Interiors', 'Explore our professional interior decoration services: painting, wall screeding, POP ceilings, industrial cleaning, and paint production.'),
('/products', 'Our Products | Frenzy Interiors', 'Browse premium paints, wallpapers, wall panels, bed frames, furniture, and wardrobes from Frenzy Interiors.'),
('/portfolio', 'Portfolio | Frenzy Interiors', 'View our completed interior decoration projects including paint works, POP ceilings, wall panels, and furniture installations.'),
('/gallery', 'Gallery | Frenzy Interiors', 'Explore our image gallery showcasing paint projects, POP ceilings, wall panels, furniture installations, and interior decoration works.'),
('/blog', 'Blog | Frenzy Interiors', 'Read interior design tips, painting advice, home decoration ideas, and furniture inspiration from Frenzy Interiors experts.'),
('/faq', 'FAQ | Frenzy Interiors', 'Find answers to frequently asked questions about our interior decoration services, pricing, project timelines, and more.'),
('/privacy-policy', 'Privacy Policy | Frenzy Interiors', 'Frenzy Interiors privacy policy explains how we collect, use, and protect your personal information.'),
('/terms-conditions', 'Terms and Conditions | Frenzy Interiors', 'Read the terms and conditions for using Frenzy Interiors website and services.'),
('/disclaimer', 'Disclaimer | Frenzy Interiors', 'Legal disclaimer for Frenzy Interiors website and services.'),
('/cookie-policy', 'Cookie Policy | Frenzy Interiors', 'Learn about how Frenzy Interiors uses cookies and similar technologies on our website.'),
('/refund-policy', 'Refund Policy | Frenzy Interiors', 'Frenzy Interiors refund policy for products and services.'),
('/service-policy', 'Service Policy | Frenzy Interiors', 'Our service policy outlines delivery, installation, and warranty terms for Frenzy Interiors products and services.'),
('/advertising-disclosure', 'Advertising Disclosure | Frenzy Interiors', 'Frenzy Interiors advertising disclosure and affiliate policy.'),
('/editorial-policy', 'Editorial Policy | Frenzy Interiors', 'Our editorial policy and content standards for the Frenzy Interiors blog.'),
('/community-guidelines', 'Community Guidelines | Frenzy Interiors', 'Guidelines for engaging with Frenzy Interiors community and social media.'),
('/accessibility', 'Accessibility Statement | Frenzy Interiors', 'Frenzy Interiors is committed to digital accessibility for all users.'),
('/sitemap', 'Sitemap | Frenzy Interiors', 'Complete sitemap of Frenzy Interiors website.')
ON CONFLICT (page_path) DO NOTHING;

INSERT INTO testimonials (name, email, content, rating, approved, featured) VALUES
('Amara Okonkwo', 'amara.okonkwo@email.com', 'Frenzy Interiors transformed our living room beyond our expectations. The paint quality and attention to detail was outstanding. Highly recommended!', 5, true, true),
('Tunde Balogun', 'tunde.balogun@email.com', 'The POP ceiling they installed in our new home is absolutely stunning. Professional team, on-time delivery, and fair pricing. Five stars!', 5, true, true),
('Ngozi Eze', 'ngozi.eze@email.com', 'We needed custom wardrobes for our bedroom and Frenzy Interiors delivered exactly what we wanted. The craftsmanship is exceptional.', 5, true, true),
('Chidi Okafor', 'chidi.okafor@email.com', 'Best painting service in Lagos! They helped us choose the perfect colors and the finish is flawless. Will definitely hire them again.', 5, true, true),
('Folake Adeyemi', 'folake.adeyemi@email.com', 'The wall panels they installed gave our office a modern, luxurious look. Great value for money and professional installation.', 5, true, true)
ON CONFLICT DO NOTHING;
