import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { donationCategories } from '../../data/donationCategories';
import { donationItems } from '../../data/donationItems';

const quickAmounts = [100, 250, 500, 1000];

export default function QuickDonationBar() {
  const [category, setCategory] = useState('Genel Bağış');
  const [amount, setAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filteredCategories = donationCategories.filter(c => c.id !== 'all');

  const handleAdd = () => {
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) return;

    const matchedItem = donationItems.find(i => i.category === category);
    const cartId = `quick-${category}-${Date.now()}`;

    addItem({
      cartId,
      id: matchedItem?.id || 99,
      slug: matchedItem?.slug || 'genel-bagis',
      title: matchedItem?.title || category,
      category,
      priceType: 'custom',
      amount: finalAmount,
      quantity: 1,
      isMonthly: frequency === 'monthly',
    });

    navigate('/sepet');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6 -mt-8 mx-4 md:mx-6 relative z-10">
      <h3 className="text-center text-gray-600 text-sm font-medium mb-4">Hızlı Bağış</h3>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {filteredCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              category === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Amounts */}
      <div className="flex gap-2 flex-wrap mb-3">
        {quickAmounts.map(a => (
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

      {/* Frequency */}
      <div className="flex rounded-xl overflow-hidden border-2 border-gray-200 mb-4">
        <button
          onClick={() => setFrequency('once')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${frequency === 'once' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Tek Seferlik
        </button>
        <button
          onClick={() => setFrequency('monthly')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${frequency === 'monthly' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Aylık
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        <ShoppingCart className="w-4 h-4" />
        Sepete Ekle
      </button>
    </div>
  );
}
