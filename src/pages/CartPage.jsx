import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PageHeader from '../components/ui/PageHeader';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

function CartItem({ item, onRemove, onQuantityChange }) {
  const price = item.priceType === 'fixed' ? item.fixedPrice : item.amount;
  const total = price * (item.quantity || 1);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-5">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
          {item.emoji || '🤲'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{item.category}</p>
              {item.country && <p className="text-xs text-emerald-600 mt-0.5">🌍 {item.country}</p>}
              {item.isMonthly && <p className="text-xs text-amber-600 mt-0.5">🔄 Aylık bağış</p>}
              {item.intent && <p className="text-xs text-gray-400 mt-0.5 italic">"{item.intent}"</p>}
            </div>
            <button
              onClick={() => onRemove(item.cartId)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3">
            {item.quantityEnabled !== false && item.priceType === 'fixed' ? (
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                <button
                  onClick={() => onQuantityChange(item.cartId, (item.quantity || 1) - 1)}
                  disabled={(item.quantity || 1) <= 1}
                  className="w-7 h-7 rounded-lg bg-white shadow-sm hover:bg-emerald-50 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-bold text-sm">{item.quantity || 1}</span>
                <button
                  onClick={() => onQuantityChange(item.cartId, (item.quantity || 1) + 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-sm hover:bg-emerald-50 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span className="text-xs text-gray-400">Tutar bağışı</span>
            )}
            <div className="text-right">
              {(item.quantity || 1) > 1 && (
                <div className="text-xs text-gray-400">{fmt(price)} × {item.quantity || 1}</div>
              )}
              <div className="font-bold text-emerald-700">{fmt(total)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, totalAmount, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pb-20 lg:pb-0">
        <PageHeader title="Sepetim" emoji="🛒" breadcrumb="Ana Sayfa / Sepet" />
        <div className="text-center py-20 px-4">
          <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sepetiniz boş</h3>
          <p className="text-gray-500 text-sm mb-6">Bağış yapmak için bağış sayfasını ziyaret edin.</p>
          <button
            onClick={() => navigate('/bagis')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all"
          >
            Bağış Yap <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Sepetim"
        subtitle={`${items.length} bağış kalemi`}
        emoji="🛒"
        breadcrumb="Ana Sayfa / Sepet"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Items */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-gray-900">Bağış Kalemleri</h2>
              <button
                onClick={clearCart}
                className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
              >
                Sepeti Temizle
              </button>
            </div>
            {items.map(item => (
              <CartItem
                key={item.cartId}
                item={item}
                onRemove={removeItem}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Özet</h3>

              <div className="flex flex-col gap-2 mb-4">
                {items.map(item => {
                  const price = item.priceType === 'fixed' ? item.fixedPrice : item.amount;
                  return (
                    <div key={item.cartId} className="flex justify-between text-sm">
                      <span className="text-gray-500 truncate pr-2">{item.title}</span>
                      <span className="font-medium flex-shrink-0">
                        {fmt(price * (item.quantity || 1))}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Toplam Bağış</span>
                  <span className="font-bold text-emerald-700 text-xl">{fmt(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/bagisci-bilgileri')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg"
              >
                Devam Et <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/bagis')}
                className="w-full mt-2 text-emerald-600 hover:text-emerald-700 py-2 text-sm font-medium transition-colors"
              >
                + Bağış Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
