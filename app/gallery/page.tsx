import { Metadata } from 'next';
import { ImageIcon } from 'lucide-react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getGalleryImages() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/gallery_images?select=*,gallery_categories(name,slug)&order=sort_order`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function getGalleryCategories() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_categories?select=*&order=sort_order`, {
      headers: {
        apikey: SUPABASE_ANON_KEY || '',
        Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Gallery | Frenzy Interiors',
  description: 'Browse our gallery of interior design work. See stunning transformations, creative designs, and beautiful spaces crafted by Frenzy Interiors.',
  openGraph: {
    title: 'Gallery | Frenzy Interiors',
    description: 'Browse our gallery of interior design work.',
  },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();
  const categories = await getGalleryCategories();

  // Group images by category
  const imagesByCategory: Record<string, any[]> = {};
  images.forEach((img: any) => {
    const catName = img.gallery_categories?.name || 'Uncategorized';
    if (!imagesByCategory[catName]) imagesByCategory[catName] = [];
    imagesByCategory[catName].push(img);
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0a1a3a]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A visual journey through our finest interior design creations
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Gallery images coming soon. Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {categories.map((cat: any) => {
                const catImages = imagesByCategory[cat.name] || [];
                if (catImages.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <div className="text-center mb-10">
                      <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-2 block">
                        {cat.name}
                      </span>
                      {cat.description && (
                        <p className="text-gray-600 max-w-2xl mx-auto">{cat.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {catImages.map((img: any, i: number) => (
                        <div
                          key={img.id}
                          className={`group relative rounded-2xl overflow-hidden bg-gray-100 ${i === 0 && catImages.length > 2 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                        >
                          <img
                            src={img.image_url}
                            alt={img.title || `${cat.name} ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {img.title && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white font-semibold">{img.title}</p>
                                {img.description && (
                                  <p className="text-gray-300 text-sm mt-1">{img.description}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Uncategorized images */}
              {imagesByCategory['Uncategorized']?.length > 0 && (
                <div>
                  <div className="text-center mb-10">
                    <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-2 block">
                      More Work
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imagesByCategory['Uncategorized'].map((img: any, i: number) => (
                      <div
                        key={img.id}
                        className={`group relative rounded-2xl overflow-hidden bg-gray-100 ${i === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                      >
                        <img
                          src={img.image_url}
                          alt={img.title || `Gallery ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {img.title && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="text-white font-semibold">{img.title}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
