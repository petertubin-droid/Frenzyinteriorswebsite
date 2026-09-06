import { Metadata } from 'next';
import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ | Frenzy Interiors',
  description: 'Find answers to frequently asked questions about Frenzy Interiors services, pricing, project timelines, materials, and the interior design process.',
  openGraph: {
    title: 'FAQ | Frenzy Interiors',
    description: 'Find answers to frequently asked questions about our interior design services.',
  },
};

const faqs = [
  {
    category: 'General Questions',
    questions: [
      {
        q: 'What services does Frenzy Interiors offer?',
        a: 'Frenzy Interiors offers a comprehensive range of interior design services including interior and exterior painting, wall finishes, furniture design, space planning, residential interiors, and commercial interiors. We also supply curated interior products and accessories.',
      },
      {
        q: 'How long has Frenzy Interiors been in business?',
        a: 'Frenzy Interiors has been transforming spaces since 2014. With over a decade of experience, we have completed more than 500 projects across residential, commercial, and industrial spaces in Nigeria.',
      },
      {
        q: 'Do you work nationwide or only in Lagos?',
        a: 'While our headquarters is in Lagos, we provide interior design services across Nigeria. We have completed projects in major cities including Abuja, Port Harcourt, Ibadan, and Kano.',
      },
    ],
  },
  {
    category: 'Services & Process',
    questions: [
      {
        q: 'What is your interior design process?',
        a: 'Our process begins with an initial consultation to understand your vision, requirements, and budget. We then create a detailed design proposal including mood boards, 3D renderings, and material samples. After approval, our team executes the project with regular updates and quality checks, concluding with a final walkthrough and handover.',
      },
      {
        q: 'Do you offer free consultations?',
        a: 'Yes, we offer a complimentary initial consultation for all prospective clients. This session allows us to understand your needs and provide preliminary recommendations. You can book a consultation through our contact page or by calling us directly.',
      },
      {
        q: 'Can you work with my existing furniture and decor?',
        a: 'Absolutely. We can incorporate your existing pieces into the new design scheme. Our designers are skilled at blending old and new elements to create a cohesive, personalized space.',
      },
      {
        q: 'Do you handle project management?',
        a: 'Yes, we provide end-to-end project management. Our team coordinates all aspects of the project including sourcing materials, managing contractors, overseeing installation, and ensuring quality control at every stage.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        q: 'How do you charge for your services?',
        a: 'Our pricing depends on the scope and complexity of the project. We offer fixed-price packages for standard services and custom quotes for larger projects. After the initial consultation, we provide a detailed, transparent quote with no hidden fees.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfers, cash payments, and certified checks. For larger projects, we offer milestone-based payment plans to make the process more manageable.',
      },
      {
        q: 'Do you require a deposit?',
        a: 'Yes, we typically require a 30-50% deposit to commence work, depending on the project size. The remaining balance is paid according to agreed milestones or upon project completion.',
      },
      {
        q: 'Are your prices negotiable?',
        a: 'We strive to provide competitive pricing while maintaining our high quality standards. We are open to discussing your budget and can suggest alternatives or phased approaches to meet your financial needs.',
      },
    ],
  },
  {
    category: 'Timelines & Scheduling',
    questions: [
      {
        q: 'How long does a typical interior design project take?',
        a: 'Project timelines vary based on scope. A single room refresh may take 1-2 weeks, while a full home renovation can take 4-12 weeks. Commercial projects typically range from 2-6 months. We provide a detailed timeline during the planning phase.',
      },
      {
        q: 'How soon can you start my project?',
        a: 'Our availability depends on current project load. Typically, we can begin within 2-4 weeks of contract signing. For urgent projects, we may be able to accommodate faster timelines — please contact us to discuss.',
      },
      {
        q: 'Do you work on weekends?',
        a: 'We generally work Monday through Saturday, with Saturday hours being 9 AM to 4 PM. For commercial projects that require minimal disruption, we can arrange after-hours or weekend work by special request.',
      },
    ],
  },
  {
    category: 'Materials & Quality',
    questions: [
      {
        q: 'What types of paint and materials do you use?',
        a: 'We use premium, eco-friendly paints and materials from trusted brands. Our paint selection includes low-VOC and zero-VOC options that are safe for families and pets. We also offer specialty finishes including texture paints, metallic finishes, and wallpaper.',
      },
      {
        q: 'Do you provide a warranty on your work?',
        a: 'Yes, we provide a warranty on all our workmanship. Painting projects come with a 2-year warranty against peeling, cracking, or fading under normal conditions. Furniture and custom pieces have warranties ranging from 1-5 years depending on the item.',
      },
      {
        q: 'Can I choose my own materials?',
        a: 'Of course. We welcome client input on material selection. Our designers can guide you through options and help you make choices that fit your style, budget, and durability requirements.',
      },
    ],
  },
  {
    category: 'After-Sales Support',
    questions: [
      {
        q: 'Do you offer maintenance services?',
        a: 'Yes, we offer maintenance and touch-up services for all completed projects. We also provide care guides and recommendations to help you maintain the beauty of your interiors over time.',
      },
      {
        q: 'What if I am not satisfied with the work?',
        a: 'Client satisfaction is our top priority. If any aspect of our work does not meet your expectations, we will work with you to make it right. We offer a satisfaction guarantee and will address concerns promptly.',
      },
      {
        q: 'Can I make changes after the project has started?',
        a: 'We understand that ideas evolve. Minor changes can often be accommodated during the project. Significant changes may affect the timeline and cost, which we will communicate clearly before proceeding.',
      },
    ],
  },
];

export default function FAQPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our interior design services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold text-[#0a1a3a] mb-8 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-[#d4af37]" />
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.questions.map((item, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 rounded-2xl p-6 hover:bg-[#0a1a3a] group transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-[#0a1a3a] group-hover:text-[#d4af37] mb-3 transition-colors">
                        {item.q}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0a1a3a] mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is happy to answer any additional questions you may have. Reach out to us directly for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-[#0a1a3a] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#c4a030] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              Contact Us
            </Link>
            <a
              href="https://wa.me/2349063612439"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0a1a3a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0a1a3a]/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
