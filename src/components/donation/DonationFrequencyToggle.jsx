export default function DonationFrequencyToggle({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Bağış Sıklığı</label>
      <div className="flex rounded-2xl overflow-hidden border-2 border-gray-200">
        <button
          onClick={() => onChange('once')}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${value === 'once' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Tek Seferlik
        </button>
        <button
          onClick={() => onChange('monthly')}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${value === 'monthly' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Aylık
        </button>
      </div>
    </div>
  );
}
