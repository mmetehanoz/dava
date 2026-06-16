export default function StatsSection({ stats }) {
  return (
    <section className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl mx-4 md:mx-6 py-10 px-6">
      <h2 className="text-center text-white font-bold text-xl md:text-2xl mb-8">
        Rakamlarla DAVA
      </h2>
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {stats.map(stat => (
          <div key={stat.id} className="text-center">
            <div className="text-4xl mb-2">{stat.emoji}</div>
            <div className="text-3xl md:text-4xl font-bold text-white">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-emerald-200 text-sm mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
