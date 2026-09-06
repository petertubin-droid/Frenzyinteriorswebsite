'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          status: 'pending',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0a1a3a] mb-1">Phone</h3>
              <p className="text-gray-600">+234 906 361 2439</p>
              <p className="text-gray-600">+234 912 671 7830</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0a1a3a] mb-1">Email</h3>
              <p className="text-gray-600">info@frenzyinteriors.com</p>
              <p className="text-gray-600">projects@frenzyinteriors.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0a1a3a] mb-1">Office Address</h3>
              <p className="text-gray-600">123 Admiralty Way, Lekki Phase 1</p>
              <p className="text-gray-600">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0a1a3a] mb-1">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/2349063612439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Sales
          </a>
          <a
            href="https://wa.me/2349126717830"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-[#0a1a3a] mb-6">Request a Consultation</h3>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-[#0a1a3a] mb-2">Thank You!</h4>
            <p className="text-gray-600">We have received your consultation request and will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
                  placeholder="+234 ..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
              >
                <option value="">Select a service</option>
                <option value="Interior Painting">Interior Painting</option>
                <option value="Exterior Painting">Exterior Painting</option>
                <option value="Wall Finishes">Wall Finishes</option>
                <option value="Furniture Design">Furniture Design</option>
                <option value="Space Planning">Space Planning</option>
                <option value="Commercial Interiors">Commercial Interiors</option>
                <option value="Residential Interiors">Residential Interiors</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#d4af37] text-[#0a1a3a] py-4 rounded-xl font-semibold text-lg hover:bg-[#c4a030] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
