/*
# Seed Products and Blog Posts

1. Insert sample products for each category
2. Insert sample blog posts
3. Insert sample portfolio projects
4. Ensure the site has content on launch
*/

INSERT INTO products (name, slug, category_id, description, specifications, price, featured) VALUES
('Premium Interior Emulsion', 'premium-interior-emulsion', 
  (SELECT id FROM product_categories WHERE slug = 'paints'),
  'High-quality interior emulsion paint with excellent coverage and durability. Perfect for living rooms, bedrooms, and offices.',
  'Coverage: 12-14 sqm per liter | Finish: Matt | Drying: 2-4 hours | Base: Water-based',
  18500.00,
  true
),
('Weather Shield Exterior Paint', 'weather-shield-exterior-paint', 
  (SELECT id FROM product_categories WHERE slug = 'paints'),
  'Weather-resistant exterior paint designed for Nigerian climate. Protects against UV, rain, and humidity.',
  'Coverage: 10-12 sqm per liter | Finish: Satin | Drying: 4-6 hours | Base: Acrylic',
  22500.00,
  true
),
('Luxury 3D Wallpaper', 'luxury-3d-wallpaper', 
  (SELECT id FROM product_categories WHERE slug = 'wallpapers'),
  'Stunning 3D textured wallpaper that adds depth and elegance to any room. Easy to install and maintain.',
  'Roll Size: 0.53m x 10m | Material: Non-woven | Pattern: Repeatable | Washable: Yes',
  35000.00,
  true
),
('Modern Wall Panel Set', 'modern-wall-panel-set', 
  (SELECT id FROM product_categories WHERE slug = 'wall-panels'),
  'Contemporary wall panels made from premium PVC with realistic wood grain texture. Perfect for accent walls.',
  'Panel Size: 25cm x 2.7m | Thickness: 8mm | Material: PVC | Pack: 10 panels',
  48000.00,
  true
),
('King Size Upholstered Bed Frame', 'king-size-upholstered-bed-frame', 
  (SELECT id FROM product_categories WHERE slug = 'bed-frames'),
  'Elegant king-size bed frame with premium fabric upholstery and sturdy wooden frame. Includes headboard.',
  'Size: 180x200cm | Material: Fabric + Wood | Color: Gray | Assembly: Required',
  125000.00,
  true
),
('Custom Executive Office Desk', 'custom-executive-office-desk', 
  (SELECT id FROM product_categories WHERE slug = 'furniture'),
  'Handcrafted executive office desk with built-in storage and premium wood finish. Customizable dimensions.',
  'Dimensions: 180x90x75cm | Material: HDF + Veneer | Drawers: 3 | Finish: Walnut',
  85000.00,
  true
),
('Walk-In Wardrobe System', 'walk-in-wardrobe-system', 
  (SELECT id FROM product_categories WHERE slug = 'wardrobes'),
  'Complete walk-in wardrobe with hanging rails, shelves, drawers, and shoe rack. Customizable layout.',
  'Dimensions: Custom | Material: MDF + Laminate | Finish: White Gloss | LED: Included',
  185000.00,
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (title, slug, category_id, content, excerpt, featured_image, published, published_at, tags, meta_title, meta_description) VALUES
(
  '2024 Interior Design Trends for Nigerian Homes',
  '2024-interior-design-trends-nigerian-homes',
  (SELECT id FROM blog_categories WHERE slug = 'interior-design'),
  'As we move through 2024, Nigerian homeowners are embracing bold, sophisticated interior design choices. The trends this year reflect a blend of global influences with distinctly African aesthetics. From warm earthy tones to sustainable materials, here are the top trends shaping Nigerian interiors this year.

## 1. Warm Earthy Color Palettes

Gone are the days of stark white walls. Nigerian homes in 2024 are embracing warm, earthy tones like terracotta, burnt orange, deep olive, and sandy beige. These colors create a cozy, grounded atmosphere that reflects our rich natural landscape.

## 2. Biophilic Design

Bringing nature indoors continues to be a major trend. Incorporating plants, natural materials like wood and stone, and maximizing natural light creates spaces that feel connected to the environment.

## 3. Statement Ceilings

The ceiling is becoming the fifth wall. Bold POP ceiling designs, decorative cornices, and even painted ceilings are making a statement in modern Nigerian homes.

## 4. Sustainable and Local Materials

There is a growing appreciation for locally sourced materials and sustainable design choices. Nigerian artisans and craftsmen are being recognized for their quality work in furniture and decor.

## 5. Multifunctional Spaces

With the rise of remote work, homes are being designed with flexibility in mind. Rooms that serve multiple purposes - from office to guest room - are becoming essential.

At Frenzy Interiors, we are at the forefront of these trends, helping our clients create spaces that are both beautiful and functional. Contact us for a consultation to discuss how these trends can work in your home.',
  'Discover the top interior design trends for 2024 that Nigerian homeowners are embracing. From warm earthy palettes to biophilic design.',
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  true,
  now(),
  ARRAY['interior design', 'trends', '2024', 'nigerian homes', 'decor'],
  '2024 Interior Design Trends for Nigerian Homes | Frenzy Interiors',
  'Discover the latest interior design trends for Nigerian homes in 2024. Warm earth tones, biophilic design, statement ceilings, and more.'
),
(
  'How to Choose the Perfect Paint Color for Your Living Room',
  'how-to-choose-perfect-paint-color-living-room',
  (SELECT id FROM blog_categories WHERE slug = 'painting-tips'),
  'Choosing the right paint color for your living room can be overwhelming. With thousands of shades available, how do you pick the one that is perfect for your space? Here is our comprehensive guide.

## Consider the Room Size

Light colors make small rooms feel larger and more open. Dark colors can make large rooms feel cozier and more intimate. For Nigerian apartments, we typically recommend light, warm neutrals for living rooms.

## Lighting Matters

Natural light changes throughout the day. Test paint samples at different times to see how the color looks in morning, afternoon, and evening light. South-facing rooms get warm light, while north-facing rooms get cooler light.

## The 60-30-10 Rule

For a balanced color scheme: 60% dominant color (walls), 30% secondary color (furniture), 10% accent color (decor). This creates a harmonious look without being monotonous.

## Popular Living Room Colors in Nigeria

1. **Cream/Beige** - Timeless and versatile
2. **Sage Green** - Calming and on-trend
3. **Warm Gray** - Modern and sophisticated
4. **Terracotta** - Warm and inviting
5. **Soft Blue** - Serene and calming

## Sample Before You Commit

Always buy sample pots and paint large swatches on your walls. View them for at least 2-3 days before making a final decision.

## Professional Help

At Frenzy Interiors, our color consultants can help you choose the perfect palette for your home. Book a consultation today.',
  'A comprehensive guide to choosing the perfect paint color for your living room. Learn about lighting, the 60-30-10 rule, and popular Nigerian color choices.',
  'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
  true,
  now(),
  ARRAY['paint', 'colors', 'living room', 'painting tips', 'interior design'],
  'How to Choose the Perfect Paint Color for Your Living Room',
  'Expert guide on choosing living room paint colors. Learn about lighting effects, color rules, and popular Nigerian color choices.'
),
(
  'The Complete Guide to POP Ceiling Designs',
  'complete-guide-pop-ceiling-designs',
  (SELECT id FROM blog_categories WHERE slug = 'ceiling-designs'),
  'POP (Plaster of Paris) ceilings have become a staple in modern Nigerian homes. They add elegance, hide electrical wiring, and improve room acoustics. Here is everything you need to know about POP ceiling designs.

## What is POP Ceiling?

Plaster of Paris is a quick-setting gypsum plaster that can be molded into any shape. It is lightweight, durable, and fire-resistant, making it ideal for ceiling work.

## Popular POP Ceiling Designs

### 1. Simple False Ceiling
A single-level recessed ceiling with clean edges. Perfect for modern minimalist homes.

### 2. Multi-Level Ceiling
Creates depth and visual interest. Ideal for large living rooms and master bedrooms.

### 3. Coffered Ceiling
A grid of recessed panels that adds a classic, sophisticated look.

### 4. Circular/Round Design
A circular recessed center with lighting. Popular for dining areas.

### 5. Perimeter Recessed
Recessed edges with LED strip lighting. Creates a floating effect.

## Benefits of POP Ceilings

- **Aesthetic Appeal**: Transforms plain ceilings into works of art
- **Hides Wiring**: Conceals electrical and AC ductwork
- **Sound Insulation**: Reduces echo and noise
- **Fire Resistance**: Naturally fire-retardant
- **Thermal Insulation**: Helps maintain room temperature

## Cost Considerations

The cost depends on the complexity of the design, room size, and materials used. Simple designs start from ₦15,000 per square meter, while intricate multi-level designs can cost ₦40,000+ per square meter.

## Maintenance

POP ceilings require minimal maintenance. Occasional dusting and cleaning with a soft cloth is usually sufficient. Avoid excessive moisture exposure.

## Frenzy Interiors POP Ceiling Services

We specialize in custom POP ceiling designs tailored to your home. Our expert craftsmen ensure flawless execution and lasting beauty. Contact us for a free quote.',
  'Everything you need to know about POP ceiling designs. Learn about popular styles, benefits, costs, and maintenance tips.',
  'https://images.pexels.com/photos/6782474/pexels-photo-6782474.jpeg',
  true,
  now(),
  ARRAY['POP ceiling', 'ceiling designs', 'interior design', 'home decor', 'nigeria'],
  'Complete Guide to POP Ceiling Designs | Frenzy Interiors',
  'Learn about POP ceiling designs, benefits, costs, and maintenance. Popular styles for Nigerian homes explained by Frenzy Interiors experts.'
)
ON CONFLICT (slug) DO NOTHING;

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
  'Full exterior and interior painting of a 3-story office complex in Victoria Island. Used premium weather-resistant paints for exterior and eco-friendly interior paints.',
  '2024-01-20',
  'Professional work from start to finish. The office looks incredible and the paint has held up perfectly against the weather.',
  'TechHub Nigeria',
  true
),
(
  'Contemporary Apartment POP Ceiling',
  'contemporary-apartment-pop-ceiling',
  'POP Ceilings',
  'Custom POP ceiling design for a 3-bedroom apartment in Ikoyi. Features multi-level recessed lighting and decorative cornices.',
  '2024-02-10',
  'The POP ceiling design is stunning. Our guests always comment on how beautiful it looks. Highly recommend Frenzy Interiors.',
  'Dr. Ibrahim',
  true
)
ON CONFLICT (slug) DO NOTHING;
