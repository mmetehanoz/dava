import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { activities } from '../data/activities';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';

const formatDate = (d) => new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ActivityDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.slug === slug);

  if (!activity) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-gray-500 font-medium mb-4">Faaliyet bulunamadı.</p>
        <button onClick={() => navigate('/faaliyetler')} className="text-emerald-600 font-semibold">← Faaliyetlere Dön</button>
      </div>
    );
  }

  const others = activities.filter(a => a.id !== activity.id).slice(0, 2);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title={activity.title}
        emoji={activity.emoji}
        breadcrumb={`Ana Sayfa / Faaliyetler / ${activity.title}`}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <button onClick={() => navigate('/faaliyetler')} className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Faaliyetlere Dön
        </button>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 flex-wrap">
              <Badge variant="green">{activity.category}</Badge>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(activity.date)}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {activity.location}</span>
            </div>

            <div className="text-6xl text-center mb-6">{activity.emoji}</div>

            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">{activity.fullContent}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Support card */}
            <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100">
              <div className="text-2xl mb-2">🤲</div>
              <h4 className="font-bold text-emerald-800 mb-2 text-sm">Destek Ol</h4>
              <p className="text-emerald-700 text-xs leading-relaxed mb-4">
                Vakfımızın faaliyetlerine bağış yaparak destek olabilirsiniz.
              </p>
              <Link
                to="/bagis"
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                Bağış Yap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Other activities */}
            {others.length > 0 && (
              <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Diğer Faaliyetler</h4>
                <div className="flex flex-col gap-2">
                  {others.map(a => (
                    <Link
                      key={a.id}
                      to={`/faaliyetler/${a.slug}`}
                      className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <span className="text-xl">{a.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-gray-800 line-clamp-2">{a.title}</div>
                        <div className="text-xs text-gray-400">{formatDate(a.date)}</div>
                      </div>
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
