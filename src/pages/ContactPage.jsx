import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputClass = 'w-full border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm outline-none transition-colors';

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="İletişim"
        subtitle="Sorularınız için bize ulaşın. Size en kısa sürede geri dönüş yapacağız."
        emoji="📞"
        breadcrumb="Ana Sayfa / İletişim"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { Icon: MapPin, title: 'Adres', value: 'Maltepe Mah. Davutpaşa Cad. No:8/1\nZeytinburnu / İstanbul', href: null, color: 'bg-amber-50 text-amber-600' },
              { Icon: Phone, title: 'Telefon', value: '(0212) 493 34 34', href: 'tel:+902124933434', color: 'bg-emerald-50 text-emerald-600' },
              { Icon: Phone, title: 'GSM', value: '(0554) 909 55 57', href: 'tel:+905549095557', color: 'bg-teal-50 text-teal-600' },
              { Icon: Mail, title: 'E-posta', value: 'iletisim@degerveahlakvakfi.org', href: 'mailto:iletisim@degerveahlakvakfi.org', color: 'bg-blue-50 text-blue-600' },
            ].map(({ Icon, title, value, href, color }, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 flex items-start gap-4">
                <div className={`w-10 h-10 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{title}</div>
                  {href ? (
                    <a href={href} className="text-gray-500 text-sm hover:text-emerald-600 transition-colors">{value}</a>
                  ) : (
                    <p className="text-gray-500 text-sm whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">Mesaj Gönder</h2>

            {sent && (
              <div className="bg-emerald-50 text-emerald-700 rounded-2xl px-5 py-3 mb-5 text-sm font-medium flex items-center gap-2">
                <span>✓</span> Mesajınız alındı, en kısa sürede geri dönüş yapacağız.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad Soyad</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="Adınız Soyadınız" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">E-posta</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} placeholder="ornek@email.com" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Konu</label>
                <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)} className={inputClass} placeholder="Mesajınızın konusu" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mesaj</label>
                <textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)} className={inputClass} placeholder="Mesajınızı yazınız..." required />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm transition-all hover:shadow-lg"
              >
                <Send className="w-4 h-4" /> Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
