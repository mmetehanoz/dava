import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import { institutions } from '../data/institutions';

const categoryColors = {
  "Kur'an Kursu": 'green',
  "Anaokulu": 'gold',
  "Akademi": 'gray',
};

export default function InstitutionsPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Kurumlarımız"
        subtitle="Değer ve Ahlak Vakfı çatısı altında faaliyet gösteren eğitim kurumlarımız."
        emoji="🏛️"
        breadcrumb="Ana Sayfa / Kurumlarımız"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {institutions.map(inst => (
            <div key={inst.id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group overflow-hidden">
              {/* Görsel alanı */}
              <div className="bg-gradient-to-br from-emerald-700 to-teal-700 h-36 flex items-center justify-center relative overflow-hidden">
                {inst.image ? (
                  <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{inst.emoji}</span>
                )}
                <Badge variant="white" className="absolute top-3 left-3 shadow-sm">
                  {inst.category}
                </Badge>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1.5 leading-snug">{inst.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{inst.shortDesc}</p>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {inst.ageGroup}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {inst.address}
                  </span>
                </div>

                <Link
                  to={`/kurumlarimiz/${inst.slug}`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold py-2.5 rounded-2xl transition-all hover:shadow-md"
                >
                  Detaylı İncele <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
