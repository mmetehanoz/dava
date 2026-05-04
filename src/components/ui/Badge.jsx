export default function Badge({ children, variant = 'green', className = '' }) {
  const variants = {
    green: 'bg-emerald-100 text-emerald-800',
    gold: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
    white: 'bg-white text-emerald-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
