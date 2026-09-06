import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Frenzy Interiors',
    short_name: 'Frenzy Interiors',
    description: 'Premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a1a3a',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  };
}
