import { useState, useEffect } from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createCartId } from '../../utils/cartId';
import { getQuickDonationSettings } from '../../services/api';

export default function QuickDonationBar() {
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [amount, setAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const [items, setItems] = useState([]); 
  const [presetAmounts, setPresetAmounts] = useState([100, 250, 500, 1000]);

  // initial load via quick donation settings
  
  const [availableDonations, setAvailableDonations] = useState([]);

  useEffect(() => {
    let active = true;
    getQuickDonationSettings()
      .then(settings => {
        if (!active || !settings) return;
        const donations = settings.available_donations || [];
        setItems(donations);
        setPresetAmounts(Array.isArray(settings.preset_amounts) && settings.preset_amounts.length ? settings.preset_amounts : presetAmounts);
        // derive donation list for quick selection
        setAvailableDonations(donations);
        // default selected donation
        let defaultDonation = donations[0] && (donations[0].id || donations[0].slug);
        if (settings.default_donation_id) {
          const def = donations.find(d => (String(d.id) === String(settings.default_donation_id)) || d.slug === settings.default_donation_id);
          if (def) defaultDonation = def.id || def.slug;
        }
        setSelectedDonationId(defaultDonation ? String(defaultDonation) : null);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const handleAdd = () => {
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) return;

    const matchedItem = items.find(i => (String(i.id) === String(selectedDonationId) || String(i.slug) === String(selectedDonationId))) || null;
    const cartId = createCartId(`quick-${matchedItem ? (matchedItem.id || matchedItem.slug) : 'genel'}`);

    const priceToUse = matchedItem && matchedItem.priceType === 'fixed' ? (matchedItem.fixedPrice || finalAmount) : finalAmount;

    // persist metadata so server-hydrated cart can be augmented client-side
    try {
      const metaJson = localStorage.getItem('dava_donation_meta');
      const meta = metaJson ? JSON.parse(metaJson) : {};
      if (matchedItem && (matchedItem.id || matchedItem.slug)) {
        const key = String(matchedItem.id || matchedItem.slug);
        meta[key] = { title: matchedItem.title, category: matchedItem.category || matchedItem.category_name, emoji: matchedItem.emoji };
        localStorage.setItem('dava_donation_meta', JSON.stringify(meta));
      }
    } catch (e) {
      // ignore
    }

    addItem({
      cartId,
      id: matchedItem?.id || 99,
      slug: matchedItem?.slug || 'genel-bagis',
      title: matchedItem?.title || (matchedItem?.category_name || matchedItem?.category || 'Genel Bağış'),
      category: matchedItem ? (matchedItem.categoryId || matchedItem.category_name || matchedItem.category) : 'genel',
      priceType: matchedItem?.priceType || 'custom',
      amount: priceToUse,
      unit_price: matchedItem && matchedItem.priceType === 'fixed' ? matchedItem.fixedPrice : finalAmount,
      quantity: 1,
      isMonthly: matchedItem?.monthlyEnabled || false,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6 -mt-8 mx-4 md:mx-6 relative z-10">
      <h3 className="text-center text-gray-600 text-sm font-medium mb-4">Hızlı Bağış</h3>

      {/* Donation tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {availableDonations.map(d => (
          <button
            key={d.id || d.slug}
            onClick={() => setSelectedDonationId(String(d.id || d.slug))}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              (selectedDonationId === String(d.id || d.slug))
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <span>{d.emoji || '🤲'}</span>
            <span className="text-sm font-medium">{d.title || d.name || d.category_name || d.slug}</span>
          </button>
        ))}
      </div>

      {/* Amounts */}
      <div className="flex gap-2 flex-wrap mb-3">
        {presetAmounts.map(a => (
          <button
            key={a}
            onClick={() => { setAmount(a); setCustomAmount(String(a)); }}
            className={`flex-1 min-w-[70px] py-2 rounded-xl text-sm font-bold transition-all ${
              amount === a && !customAmount
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {a} ₺
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative mb-4">
        <input
          type="number"
          placeholder="Özel tutar giriniz (₺)"
          value={customAmount}
          onChange={e => { setCustomAmount(e.target.value); setAmount(Number(e.target.value)); }}
          className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₺</span>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        {added ? (
          <><CheckCircle className="w-4 h-4" /> Sepete Eklendi</>
        ) : (
          <><ShoppingCart className="w-4 h-4" /> Sepete Ekle</>
        )}
      </button>
    </div>
  );
}
