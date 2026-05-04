const fmt = (n) => new Intl.NumberFormat('tr-TR').format(n);

export default function DonationAmountSelector({ amounts, selected, custom, onSelect, onCustomChange, minAmount }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Bağış Tutarı</label>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {amounts.map(a => (
          <button
            key={a}
            onClick={() => { onSelect(a); onCustomChange(''); }}
            className={`py-3 rounded-2xl text-sm font-bold transition-all ${
              selected === a && !custom
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {fmt(a)} ₺
          </button>
        ))}
      </div>
      <div className="relative">
        <input
          type="number"
          placeholder={`Min. ${fmt(minAmount)} ₺ özel tutar`}
          value={custom}
          onChange={e => { onCustomChange(e.target.value); onSelect(0); }}
          min={minAmount}
          className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm outline-none transition-colors pr-10"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₺</span>
      </div>
      {minAmount && (
        <p className="text-xs text-gray-400 mt-1.5">Minimum bağış tutarı {fmt(minAmount)} ₺'dir.</p>
      )}
    </div>
  );
}
