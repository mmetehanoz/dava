import { useState } from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { createCartId } from '../../utils/cartId';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

export default function DonationCard({ item }) {
  const { addItem } = useCart();

  const [selectedAmount, setSelectedAmount] = useState(item.suggestedAmounts?.[0] || item.fixedPrice || 0);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  const finalAmount = item.priceType === 'fixed'
    ? item.fixedPrice
    : (customAmount ? Number(customAmount) : selectedAmount);

  const handleAdd = () => {
    setError('');
    if (item.priceType === 'custom') {
      const amt = customAmount ? Number(customAmount) : selectedAmount;
      if (!amt || amt < (item.minAmount || 1)) {
        setError(`Min. ${fmt(item.minAmount)}`);
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
      quantity: 1,
      isMonthly: false,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="h-40 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800">
        {item.image
          ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-5xl opacity-90 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <Badge variant="white" className="absolute top-3 left-3 shadow-sm">{item.category}</Badge>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
        </div>

        {item.progressEnabled && <ProgressBar percent={item.progressPercent} />}

        {/* Amount selection */}
        {item.priceType === 'fixed' ? (
          <div className="bg-emerald-50 rounded-2xl px-4 py-3">
            <span className="text-xs text-gray-500 block mb-0.5">Birim fiyat</span>
            <span className="font-bold text-emerald-700 text-base">{fmt(item.fixedPrice)}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5">
              {item.suggestedAmounts?.map(a => (
                <button
                  key={a}
                  onClick={() => { setSelectedAmount(a); setCustomAmount(''); setError(''); }}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedAmount === a && !customAmount
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {fmt(a)}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder={`Özel tutar (min. ${fmt(item.minAmount)})`}
                value={customAmount}
                onChange={e => { setCustomAmount(e.target.value); setError(''); }}
                className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₺</span>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          onClick={handleAdd}
          className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all hover:shadow-md"
        >
          {added ? (
            <><CheckCircle className="w-3.5 h-3.5" /> Sepete Eklendi</>
          ) : (
            <><ShoppingCart className="w-3.5 h-3.5" /> Sepete Ekle</>
          )}
        </button>
      </div>
    </div>
  );
}
