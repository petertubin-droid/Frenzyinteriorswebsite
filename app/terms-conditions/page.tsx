import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Frenzy Interiors',
  description: 'Read the terms and conditions for using Frenzy Interiors website and services. Learn about our policies, liabilities, and user responsibilities.',
  openGraph: {
    title: 'Terms & Conditions | Frenzy Interiors',
    description: 'Read the terms and conditions for using Frenzy Interiors website and services.',
  },
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-[#0a1a3a]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
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
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Frenzy Interiors website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">1. Definitions</h2>
            <p>In these Terms, the following definitions apply:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>&quot;Website&quot;</strong> refers to the Frenzy Interiors website accessible at frenzyinteriors.com.</li>
              <li><strong>&quot;Services&quot;</strong> refers to all interior design services, consultations, and products offered by Frenzy Interiors.</li>
              <li><strong>&quot;User&quot;</strong> or <strong>&quot;You&quot;</strong> refers to any individual or entity accessing or using our website or services.</li>
              <li><strong>&quot;We&quot;</strong>, <strong>&quot;Us&quot;</strong>, or <strong>&quot;Our&quot;</strong> refers to Frenzy Interiors.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">2. Use of Website</h2>
            <p>You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website. Prohibited activities include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the website in any way that causes damage or impairment</li>
              <li>Attempting to gain unauthorized access to our systems or networks</li>
              <li>Using automated means to scrape or collect data from our website</li>
              <li>Uploading or transmitting viruses, malware, or other harmful code</li>
              <li>Engaging in any activity that interferes with the proper functioning of the website</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">3. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, graphics, logos, designs, and software, is the property of Frenzy Interiors or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, display, perform, or create derivative works from any content on this website without our prior written consent. This includes republishing our images, project photos, or blog content on third-party platforms.
            </p>
            <p>
              For media inquiries or licensing requests, please contact us at info@frenzyinteriors.com.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">4. Services and Quotations</h2>
            <p>
              All quotations provided by Frenzy Interiors are valid for a specified period as indicated on the quote. Prices are subject to change based on project scope, material costs, and market conditions. A formal agreement must be signed before any work commences.
            </p>
            <p>
              We reserve the right to decline any project at our discretion. Deposits are non-refundable except in cases where we are unable to fulfill the agreed scope of work.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">5. Payment Terms</h2>
            <p>
              Payment terms are specified in individual service agreements. Unless otherwise agreed, we require a deposit of 30-50% before commencing work, with the balance payable according to agreed milestones or upon completion.
            </p>
            <p>
              Late payments may result in project delays or suspension of services. We reserve the right to charge interest on overdue amounts at a rate of 2% per month.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">6. Warranties and Disclaimers</h2>
            <p>
              Frenzy Interiors provides warranties on workmanship as specified in individual service agreements. These warranties are limited to defects arising from our work and do not cover normal wear and tear, damage caused by third parties, or issues arising from client-supplied materials.
            </p>
            <p>
              OUR WEBSITE AND SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, FRENZY INTERIORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE WEBSITE OR SERVICES.
            </p>
            <p>
              Our total liability for any claim arising from these Terms or your use of the website or services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. These links are provided for convenience only, and we do not endorse or assume responsibility for the content, products, or services of any third-party websites.
            </p>
            <p>
              We are not responsible for any loss or damage arising from your use of third-party websites. You access third-party links at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">9. Google AdSense and Third-Party Advertising</h2>
            <p>
              We use Google AdSense and other third-party advertising services to display ads on our website. These third-party vendors may use cookies and similar technologies to collect information about your browsing activity.
            </p>
            <p>
              Frenzy Interiors is not responsible for the content of advertisements displayed on our website. Clicking on ads is at your own discretion and risk. We recommend reviewing the privacy policies of advertisers before providing any personal information.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Frenzy Interiors, its officers, directors, employees, and agents from any claims, damages, liabilities, costs, or expenses arising from your use of the website or services, your violation of these Terms, or your infringement of any intellectual property or other rights of any person or entity.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">11. Termination</h2>
            <p>
              We may terminate or suspend your access to the website or services at any time, without notice, for any reason, including if we believe you have violated these Terms. Upon termination, all provisions of these Terms that by their nature should survive termination shall remain in effect.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of the website or services shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">15. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Frenzy Interiors regarding your use of the website and services, superseding any prior agreements or understandings.
            </p>

            <h2 className="text-2xl font-bold text-[#0a1a3a] mt-10 mb-4">16. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: legal@frenzyinteriors.com</li>
              <li>Phone: +234 803 123 4567</li>
              <li>Address: 123 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
