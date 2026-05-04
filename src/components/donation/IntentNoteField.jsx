export default function IntentNoteField({ value, onChange, label = 'Niyet / Not', placeholder = 'Niyet veya not ekleyiniz (opsiyonel)...' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm outline-none transition-colors resize-none"
      />
    </div>
  );
}
