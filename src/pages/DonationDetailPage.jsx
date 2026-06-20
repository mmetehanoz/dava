import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { donationItems } from '../data/donationItems';
import DonationAmountSelector from '../components/donation/DonationAmountSelector';
import QuantitySelector from '../components/donation/QuantitySelector';
import IntentNoteField from '../components/donation/IntentNoteField';
import DonationFrequencyToggle from '../components/donation/DonationFrequencyToggle';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';
import { createCartId } from '../utils/cartId';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

export default function DonationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const item = donationItems.find(i => i.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(item?.suggestedAmounts?.[0] || 0);
  const [customAmount, setCustomAmount] = useState('');
  const [country, setCountry] = useState(item?.countries?.[0] || '');
  const [frequency, setFrequency] = useState('once');
  const [intent, setIntent] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-500 font-medium">Bağış bulunamadı.</p>
        <button onClick={() => navigate('/bagis')} className="mt-4 text-emerald-600 font-semibold">
          ← Bağışlara Dön
        </button>
      </div>
    );
  }

  const finalAmount = item.priceType === 'fixed'
    ? item.fixedPrice
    : (customAmount ? Number(customAmount) : selectedAmount);

  const totalAmount = finalAmount * quantity;

  const handleAddToCart = () => {
    setError('');
    if (item.priceType === 'custom') {
      const amt = customAmount ? Number(customAmount) : selectedAmount;
      if (!amt || amt < item.minAmount) {
        setError(`Minimum bağış tutarı ${fmt(item.minAmount)}'dir.`);
        return;
      }
    }

    addItem({
      cartId: createCartId(item.id),
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      emoji: item.emoji,
      priceType: item.priceType,
      fixedPrice: item.fixedPrice,
      amount: finalAmount,
      quantity,
      country: item.countryEnabled ? country : undefined,
      intent: item.intentEnabled ? intent : undefined,
      isMonthly: frequency === 'monthly',
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title={item.title}
        subtitle={item.description}
        emoji={item.emoji}
        breadcrumb={`Ana Sayfa / Bağış Yap / ${item.title}`}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <button onClick={() => navigate('/bagis')} className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Bağışlara Dön
        </button>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-3xl shadow-md p-6 flex flex-col gap-5 border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span>{item.emoji}</span> {item.title}
              <Badge variant="green">{item.category}</Badge>
            </h2>

            {/* Progress */}
            {item.progressEnabled && (
              <ProgressBar percent={item.progressPercent} />
            )}

            {/* Amount selector */}
            {item.priceType === 'fixed' ? (
              <div className="bg-emerald-50 rounded-2xl p-4">
                <span className="text-sm text-gray-600">Birim Fiyat</span>
                <div className="text-2xl font-bold text-emerald-700">{fmt(item.fixedPrice)}</div>
              </div>
            ) : (
              <DonationAmountSelector
                amounts={item.suggestedAmounts}
                selected={selectedAmount}
                custom={customAmount}
                onSelect={setSelectedAmount}
                onCustomChange={setCustomAmount}
                minAmount={item.minAmount}
              />
            )}

            {/* Quantity */}
            {item.quantityEnabled && (
              <QuantitySelector value={quantity} onChange={setQuantity} />
            )}

            {/* Country */}
            {item.countryEnabled && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kurban Ülkesi</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm outline-none transition-colors bg-white"
                >
                  {item.countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {/* Frequency */}
            {item.monthlyEnabled && (
              <DonationFrequencyToggle value={frequency} onChange={setFrequency} />
            )}

            {/* Intent */}
            {item.intentEnabled && (
              <IntentNoteField value={intent} onChange={setIntent} />
            )}

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all hover:shadow-lg active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {added ? (
                <><CheckCircle className="w-5 h-5" /> Sepete Eklendi</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Sepete Ekle</>
              )}

            </button>
          </div>

          {/* Summary */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Bağış Özeti</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bağış Türü</span>
                  <span className="font-semibold">{item.title}</span>
                </div>
                {item.priceType === 'fixed' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Birim Fiyat</span>
                    <span className="font-semibold">{fmt(item.fixedPrice)}</span>
                  </div>
                )}
                {item.quantityEnabled && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Adet</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                )}
                {item.countryEnabled && country && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ülke</span>
                    <span className="font-semibold">{country}</span>
                  </div>
                )}
                {item.monthlyEnabled && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sıklık</span>
                    <span className="font-semibold">{frequency === 'monthly' ? 'Aylık' : 'Tek Seferlik'}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Toplam</span>
                  <span className="font-bold text-emerald-700 text-lg">{fmt(totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
              <div className="text-emerald-600 text-2xl mb-2">🔒</div>
              <h4 className="font-bold text-emerald-800 text-sm mb-1">Güvenli Bağış</h4>
              <p className="text-emerald-700 text-xs leading-relaxed">
                Tüm bağışlarınız için makbuz düzenlenir. Vakıf hesabına güvenle bağış yapabilirsiniz.
              </p>
            </div>

            <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100">
              <div className="text-amber-600 text-2xl mb-2">📋</div>
              <h4 className="font-bold text-amber-800 text-sm mb-1">Şeffaf Raporlama</h4>
              <p className="text-amber-700 text-xs leading-relaxed">
                Bağışınızın kullanımı hakkında düzenli rapor ve fotoğraf paylaşımı yapılır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
