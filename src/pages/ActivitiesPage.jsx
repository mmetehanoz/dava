import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import ActivityCard from '../components/activity/ActivityCard';
import { activities } from '../data/activities';

const categories = ['Tümü', 'Tören', 'Yardım', 'İnşaat', 'Etkinlik'];

export default function ActivitiesPage() {
  const [active, setActive] = useState('Tümü');

  const filtered = active === 'Tümü'
    ? activities
    : activities.filter(a => a.category === active);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Faaliyetler"
        subtitle="Vakfımızın gerçekleştirdiği etkinlikler, yardım kampanyaları ve eğitim faaliyetleri."
        emoji="📋"
        breadcrumb="Ana Sayfa / Faaliyetler"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                active === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => <ActivityCard key={a.id} activity={a} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-medium">Bu kategoride faaliyet bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
