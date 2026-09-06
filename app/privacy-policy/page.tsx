import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Frenzy Interiors',
  description: 'Frenzy Interiors privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.',
  openGraph: {
    title: 'Privacy Policy | Frenzy Interiors',
    description: 'Learn how Frenzy Interiors collects, uses, and protects your personal information.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0a1a3a]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="lead">
              Frenzy Interiors (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and address when you fill out our contact forms, request consultations, or subscribe to our newsletter.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To process consultation requests and service bookings</li>
              <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
              <li>To improve our website, services, and user experience</li>
              <li>To comply with legal obligations and protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">3. Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and web beacons to collect information about your visits to this and other websites in order to provide relevant advertisements.
            </p>
            <p>
              You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">AboutAds.info</a>.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the Internet.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Trusted third-party vendors who assist us in operating our website and conducting our business (e.g., hosting providers, email services).</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your personal information</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Request portability of your personal information</li>
              <li>File a complaint with a data protection authority</li>
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">7. Cookies Policy</h2>
            <p>
              Our website uses cookies to improve your experience. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that some parts of our website may not function properly without cookies.
            </p>
            <p>Types of cookies we use:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense and partners to deliver relevant ads</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">8. Children&apos;s Privacy</h2>
            <p>
              Our website and services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: privacy@frenzyinteriors.com</li>
              <li>Phone: +234 803 123 4567</li>
              <li>Address: 123 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
