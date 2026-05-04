import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

export default function HafizBursuPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Hafız Bursu"
        subtitle="Hafızlık eğitimi alan öğrencilere burs desteği sağlayın."
        emoji="🎓"
        breadcrumb="Ana Sayfa / Hafız Bursu"
      />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 text-center">
        <div className="text-7xl mb-6">🎓</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hafız Bursu Bağışı Yapın</h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Aylık 1.000 TL bursunuzla bir hafız öğrencisinin eğitim giderlerini karşılayın.
          Adet artırarak birden fazla öğrenciye destek olabilirsiniz.
        </p>
        <Link
          to="/bagis/hafiz-bursu"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-lg active:scale-95"
        >
          Hemen Bağış Yap <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
