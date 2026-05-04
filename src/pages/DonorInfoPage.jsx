import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createDonation } from '../services/api';
import PageHeader from '../components/ui/PageHeader';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

export default function DonorInfoPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    note: '',
    kvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    navigate('/sepet');
    return null;
  }

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Ad Soyad zorunludur.';
    if (!form.phone.trim()) e.phone = 'Telefon zorunludur.';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Geçerli bir e-posta girin.';
    if (!form.kvkk) e.kvkk = 'KVKK onayı zorunludur.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const result = await createDonation({ donor: form, items, totalAmount });
      if (result.success) {
        clearCart();
        navigate('/bagis-basarili', { state: { donationId: result.donationId, donor: form, totalAmount } });
      }
    } catch {
      setErrors({ general: 'Bir hata oluştu, lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const Field = ({ label, id, error, children }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputClass = (key) =>
    `w-full border-2 ${errors[key] ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'} rounded-2xl px-4 py-3 text-sm outline-none transition-colors`;

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Bağışçı Bilgileri"
        subtitle="Bağışınızın ulaşması için iletişim bilgilerinizi doldurun."
        emoji="📋"
        breadcrumb="Ana Sayfa / Sepet / Bağışçı Bilgileri"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <button onClick={() => navigate('/sepet')} className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Sepete Dön
        </button>

        <div className="grid md:grid-cols-5 gap-6">
          <form onSubmit={handleSubmit} className="md:col-span-3 bg-white rounded-3xl shadow-md p-6 border border-gray-100 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900">Kişisel Bilgiler</h2>

            <Field label="Ad Soyad *" id="fullName" error={errors.fullName}>
              <input id="fullName" type="text" className={inputClass('fullName')} value={form.fullName}
                onChange={e => set('fullName', e.target.value)} placeholder="Adınız Soyadınız" />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Telefon *" id="phone" error={errors.phone}>
                <input id="phone" type="tel" className={inputClass('phone')} value={form.phone}
                  onChange={e => set('phone', e.target.value)} placeholder="05XX XXX XX XX" />
              </Field>
              <Field label="Şehir" id="city" error={errors.city}>
                <input id="city" type="text" className={inputClass('city')} value={form.city}
                  onChange={e => set('city', e.target.value)} placeholder="İstanbul" />
              </Field>
            </div>

            <Field label="E-posta *" id="email" error={errors.email}>
              <input id="email" type="email" className={inputClass('email')} value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="ornek@email.com" />
            </Field>

            <Field label="Not / Mesaj" id="note" error={errors.note}>
              <textarea id="note" rows={3} className={inputClass('note')} value={form.note}
                onChange={e => set('note', e.target.value)} placeholder="Vakfa iletmek istediğiniz bir not..." />
            </Field>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.kvkk}
                  onChange={e => set('kvkk', e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded accent-emerald-600"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Kişisel verilerimin Değer ve Ahlak Vakfı tarafından bağış işlemlerinin yürütülmesi amacıyla işlenmesine onay veriyorum.
                  <span className="text-emerald-600 hover:underline cursor-pointer"> KVKK Aydınlatma Metni</span>
                </span>
              </label>
              {errors.kvkk && <p className="text-red-500 text-xs mt-1">{errors.kvkk}</p>}
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-base transition-all hover:shadow-lg active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  İşleniyor...
                </span>
              ) : (
                <><CheckCircle className="w-5 h-5" /> Bağışı Tamamla</>
              )}
            </button>
          </form>

          {/* Summary */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Bağış Özeti</h3>
              <div className="flex flex-col gap-2 mb-4">
                {items.map(item => {
                  const price = item.priceType === 'fixed' ? item.fixedPrice : item.amount;
                  return (
                    <div key={item.cartId} className="flex justify-between text-sm">
                      <span className="text-gray-500 truncate pr-2">
                        {item.emoji} {item.title}
                        {(item.quantity || 1) > 1 && <span className="text-xs"> ×{item.quantity}</span>}
                      </span>
                      <span className="font-medium flex-shrink-0">{fmt(price * (item.quantity || 1))}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Toplam</span>
                  <span className="font-bold text-emerald-700 text-lg">{fmt(totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-emerald-800 text-sm">Güvenceniz</h4>
              </div>
              <ul className="text-xs text-emerald-700 space-y-1.5">
                <li>✓ Her bağış için makbuz düzenlenir</li>
                <li>✓ Bağışınız yasal güvence altındadır</li>
                <li>✓ Şeffaf harcama raporlaması yapılır</li>
                <li>✓ 7/24 destek hattı mevcuttur</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
