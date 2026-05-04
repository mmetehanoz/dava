import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-emerald-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">{faq.question}</span>
        <ChevronDown className={`w-4 h-4 text-emerald-600 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          <p className="pt-3">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ faqs }) {
  return (
    <section className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <span className="text-2xl">❓</span>
        <h2 className="text-2xl font-bold text-gray-900 mt-2">Sıkça Sorulan Sorular</h2>
        <p className="text-gray-500 text-sm mt-2">Aklınızdaki soruların cevaplarını burada bulabilirsiniz.</p>
      </div>
      <div className="flex flex-col gap-2">
        {faqs.map(faq => <FAQItem key={faq.id} faq={faq} />)}
      </div>
    </section>
  );
}
