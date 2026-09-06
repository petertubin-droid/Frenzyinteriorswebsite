import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { FeaturedServices } from '@/components/sections/featured-services';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Testimonials } from '@/components/sections/testimonials';
import { PortfolioPreview } from '@/components/sections/portfolio-preview';
import { ConsultationForm } from '@/components/sections/consultation-form';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import SectionSkeleton from './components/SectionSkeleton';

export default function Home() {
  return (
    <>
      {/* Hero loaded immediately - above the fold */}
      <HeroSection />
      <WhyChooseUs />

      {/* Below fold sections with Suspense */}
      <Suspense fallback={<SectionSkeleton count={3} />}>
        <FeaturedServices />
      </Suspense>

      <Suspense fallback={<SectionSkeleton count={3} />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<SectionSkeleton count={3} />}>
        <PortfolioPreview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton count={3} />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton count={3} />}>
        <GalleryPreview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton count={1} height="h-64" />}>
        <ConsultationForm />
      </Suspense>
    </>
  );
}
