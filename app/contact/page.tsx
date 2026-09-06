import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/app/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Frenzy Interiors',
  description: 'Get in touch with Frenzy Interiors for interior design consultations, project inquiries, and product orders. Visit our Lagos office or contact us via phone, email, or WhatsApp.',
  openGraph: {
    title: 'Contact Us | Frenzy Interiors',
    description: 'Get in touch with Frenzy Interiors for interior design consultations and project inquiries.',
  },
};

export default function ContactPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We would love to hear from you. Reach out for consultations, inquiries, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-3 block">Find Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1a3a]">Visit Our Office</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.4!3d6.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjQnMDAuMCJOIDPCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Frenzy Interiors Office Location"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
