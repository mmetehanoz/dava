import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const benefits = [
  { emoji: '📖', title: 'Kur\'an Eğitimi', desc: 'Öğrenci Kur\'an\'ı usulüne göre öğrenir ve ezberler.' },
  { emoji: '🎓', title: 'Okul Desteği', desc: 'Resmi okul eğitimi aralıksız takip edilir.' },
  { emoji: '💛', title: 'Manevi Bağ', desc: 'Hafız öğrencinin duasına nail olursunuz.' },
  { emoji: '📊', title: 'Düzenli Rapor', desc: 'Öğrenci gelişimi ile ilgili düzenli bilgi alırsınız.' },
];

const steps = [
  { step: '1', title: 'Bağış Yapın', desc: 'Aylık 1000 TL burs bağışınızı yapın.' },
  { step: '2', title: 'Eşleşin', desc: 'Vakfımız sizi uygun bir öğrenciyle eşleştirir.' },
  { step: '3', title: 'Takip Edin', desc: 'Öğrencinin gelişimini raporlarla takip edin.' },
  { step: '4', title: 'Dua Alın', desc: 'Hafız öğrencinin duasına nail olun.' },
];

export default function HafizSahiplenPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Hafız Sahiplen"
        subtitle="Bir çocuğun hafızlık yolculuğuna destek olun. Hem eğitimine ortak olun hem duasını alın."
        emoji="📖"
        breadcrumb="Ana Sayfa / Hafız Sahiplen"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl p-6 md:p-10 mb-10 border border-emerald-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Bir Hafız Yetiştir,<br />
                <span className="text-emerald-600">Bir Nesil Aydınlat</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                Aylık <strong className="text-emerald-700">1.000 TL</strong> bursunuzla bir hafız öğrencisinin eğitim yolculuğuna ortak olun.
                Hem dünya hem ahiret için yatırım yapın.
              </p>
              <Link
                to="/bagis/hafiz-bursu"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:shadow-md active:scale-95"
              >
                Hemen Sahiplen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">📖</div>
              <div className="bg-white rounded-2xl p-4 shadow-md inline-block">
                <div className="text-2xl font-bold text-emerald-700">1.000 ₺</div>
                <div className="text-gray-500 text-sm">Aylık Burs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Hafız Sahiplenmenin Faydaları</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{b.emoji}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{b.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-3 shadow-md">
                  {s.step}
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's included */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Burs Kapsamı</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Hafızlık eğitim materyalleri',
              'Öğretmen ücreti katkısı',
              'Beslenme ve barınma desteği',
              'Okul kırtasiye malzemeleri',
              'Sağlık ve sigorta giderleri',
              'Sosyal etkinlik katılımı',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-emerald-900 rounded-3xl p-8 text-white">
          <div className="text-5xl mb-4">🤲</div>
          <h2 className="text-2xl font-bold mb-3">Bir Hafız Sahiplen</h2>
          <p className="text-emerald-200 text-sm mb-6 max-w-md mx-auto">
            Aylık 1.000 TL ile bir çocuğun hafızlık eğitimini destekleyin. Bu yatırım, sizin için ebedi bir sadaka-i câriye olur.
          </p>
          <Link
            to="/bagis/hafiz-bursu"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-lg active:scale-95"
          >
            Bağış Yap — 1.000 ₺/ay <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
