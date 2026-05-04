import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

export default function DonationCard({ item, compact = false }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
      {/* Header visual */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 h-28 flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">
          {item.emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Badge variant="white" className="absolute top-3 left-3 shadow-sm">
          {item.category}
        </Badge>
        {item.monthlyEnabled && (
          <Badge variant="gold" className="absolute top-3 right-3 shadow-sm">
            Aylık
          </Badge>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{item.description}</p>

        {/* Progress bar for construction */}
        {item.progressEnabled && (
          <div className="mb-4">
            <ProgressBar
              percent={item.progressPercent}
              collected={item.collectedAmount}
              target={item.targetAmount}
            />
          </div>
        )}

        {/* Price info */}
        <div className="flex items-center justify-between mb-4">
          {item.priceType === 'fixed' ? (
            <div>
              <span className="text-xs text-gray-500">Birim fiyat</span>
              <div className="font-bold text-emerald-700 text-lg">{fmt(item.fixedPrice)}</div>
            </div>
          ) : (
            <div>
              <span className="text-xs text-gray-500">Min. bağış</span>
              <div className="font-bold text-emerald-700 text-lg">{fmt(item.minAmount)}</div>
            </div>
          )}
          {item.countryEnabled && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
              🌍 Ülke seçimli
            </span>
          )}
        </div>

        <Link
          to={`/bagis/${item.slug}`}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold py-3 rounded-2xl text-center transition-all hover:shadow-md block"
        >
          Bağış Yap →
        </Link>
      </div>
    </div>
  );
}
