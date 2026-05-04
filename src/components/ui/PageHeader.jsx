export default function PageHeader({ title, subtitle, emoji, breadcrumb }) {
  return (
    <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {breadcrumb && (
          <p className="text-emerald-300 text-sm mb-3 font-medium">{breadcrumb}</p>
        )}
        <div className="flex items-center gap-3">
          {emoji && <span className="text-4xl">{emoji}</span>}
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            {subtitle && <p className="text-emerald-200 mt-1 text-sm md:text-base max-w-2xl">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
