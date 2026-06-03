import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { institutions } from '../data/institutions';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import InstitutionGallery from '../components/institution/InstitutionGallery';

export default function InstitutionDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const inst = institutions.find(i => i.slug === slug);

  if (!inst) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-500 font-medium mb-4">Kurum bulunamadı.</p>
        <button onClick={() => navigate('/kurumlarimiz')} className="text-emerald-600 font-semibold">
          ← Kurumlara Dön
        </button>
      </div>
    );
  }

  const others = institutions.filter(i => i.id !== inst.id).slice(0, 3);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title={inst.name}
        subtitle={inst.shortDesc}
        emoji={inst.emoji}
        breadcrumb={`Ana Sayfa / Kurumlarımız / ${inst.name}`}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <button onClick={() => navigate('/kurumlarimiz')} className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Kurumlara Dön
        </button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Ana içerik */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {/* Kapak görseli */}
            <div className="rounded-3xl h-56 overflow-hidden bg-gradient-to-br from-emerald-700 to-teal-700 flex items-center justify-center">
              {inst.image ? (
                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-8xl">{inst.emoji}</span>
              )}
            </div>

            {/* Hakkında */}
            <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-3">Kurum Hakkında</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{inst.description}</p>
            </div>

            {/* Galeri */}
            {inst.gallery?.length > 0 && (
              <InstitutionGallery images={inst.gallery} name={inst.name} />
            )}

            {/* Özellikler */}
            <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Sunulan Hizmetler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inst.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ panel */}
          <div className="flex flex-col gap-4">
            {/* Bilgi kartı */}
            <div className="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Kurum Bilgileri</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Badge variant="green">{inst.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>{inst.ageGroup}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{inst.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-emerald-500">👥</span>
                  <span>Kapasite: {inst.capacity}</span>
                </div>
              </div>
            </div>

            {/* İletişim CTA */}
            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-bold text-emerald-800 text-sm mb-2">Bilgi Almak İster Misiniz?</h4>
              <p className="text-emerald-700 text-xs mb-4 leading-relaxed">Kurumumuz hakkında detaylı bilgi için iletişime geçin.</p>
              <Link
                to="/iletisim"
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                İletişime Geç <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bağış CTA */}
            <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100">
              <div className="text-2xl mb-2">🤲</div>
              <h4 className="font-bold text-amber-800 text-sm mb-2">Destek Ol</h4>
              <p className="text-amber-700 text-xs mb-4 leading-relaxed">Kurumumuzun faaliyetlerine bağış yaparak destek olun.</p>
              <Link
                to="/bagis"
                className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                Bağış Yap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Diğer kurumlar */}
            {others.length > 0 && (
              <div className="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Diğer Kurumlar</h4>
                <div className="flex flex-col gap-2">
                  {others.map(o => (
                    <Link
                      key={o.id}
                      to={`/kurumlarimiz/${o.slug}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <span className="text-xl">{o.emoji}</span>
                      <span className="text-xs font-semibold text-gray-800 line-clamp-2">{o.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
