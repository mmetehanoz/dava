export default function ProgressBar({ percent, collected, target, showLabels = true, size = 'md' }) {
  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-4' };
  const safePercent = Math.min(100, Math.max(0, percent));

  const fmt = (n) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="w-full">
      {showLabels && collected != null && target != null && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-emerald-700 font-semibold">{fmt(collected)} toplandı</span>
          <span className="text-gray-500">Hedef: {fmt(target)}</span>
        </div>
      )}
      <div className={`w-full bg-emerald-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
          style={{ width: `${safePercent}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs mt-1.5">
          <span className="text-emerald-600 font-bold">%{safePercent}</span>
          <span className="text-gray-400">{100 - safePercent > 0 ? `%${100 - safePercent} kaldı` : 'Tamamlandı'}</span>
        </div>
      )}
    </div>
  );
}
