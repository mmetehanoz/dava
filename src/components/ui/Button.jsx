export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 cursor-pointer';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-600 hover:border-emerald-700',
    gold: 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-md hover:shadow-lg',
    ghost: 'bg-transparent hover:bg-emerald-50 text-emerald-700',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200',
    dark: 'bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white shadow-md',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-2',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
