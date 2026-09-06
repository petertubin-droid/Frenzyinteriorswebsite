'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const phones = [
    { number: '+2349063612439', label: 'Sales & Support' },
    { number: '+2349126717830', label: 'Projects & Consultation' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-72 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#0a1a3a]">Chat on WhatsApp</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Get a free consultation or ask about our services. We typically reply within minutes.
          </p>
          <div className="space-y-2">
            {phones.map((phone) => (
              <a
                key={phone.number}
                href={`https://wa.me/${phone.number.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#25d366]/10 hover:bg-[#25d366]/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#0a1a3a]">{phone.label}</p>
                  <p className="text-xs text-gray-600">{phone.number}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25d366] text-white shadow-lg hover:bg-[#128c7e] transition-all flex items-center justify-center hover:scale-105"
        aria-label="Open WhatsApp chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
