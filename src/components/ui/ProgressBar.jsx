export default function ProgressBar({ percent, collected, target, showLabels = true, size = 'md', dark = false }) {
  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-4' };
  const safePercent = Math.min(100, Math.max(0, percent));

  const fmt = (n) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="w-full">
      {showLabels && collected != null && target != null && (
        <div className="flex justify-between text-sm mb-2">
          <span className={`font-semibold ${dark ? 'text-white' : 'text-emerald-700'}`}>{fmt(collected)} toplandı</span>
          <span className={dark ? 'text-emerald-200' : 'text-gray-500'}>Hedef: {fmt(target)}</span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${heights[size]} ${dark ? 'bg-white/20' : 'bg-emerald-100'}`}>
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-1000"
          style={{ width: `${safePercent}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs mt-1.5">
          <span className={`font-bold ${dark ? 'text-amber-300' : 'text-emerald-600'}`}>%{safePercent}</span>
          <span className={dark ? 'text-emerald-200' : 'text-gray-400'}>{100 - safePercent > 0 ? `%${100 - safePercent} kaldı` : 'Tamamlandı'}</span>
        </div>
      )}
    </div>
  );
}
