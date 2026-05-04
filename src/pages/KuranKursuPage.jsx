import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ProgressBar from '../components/ui/ProgressBar';
import { donationItems } from '../data/donationItems';

export default function KuranKursuPage() {
  const item = donationItems.find(i => i.slug === 'kuran-kursu-insaat-bagisi');

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Kur'an Kursu İnşaatı"
        subtitle="Nesillere kalıcı bir miras bırakın. Her katkınız bir tuğla, her tuğla ebedi bir hayır."
        emoji="🏗️"
        breadcrumb="Ana Sayfa / Kur'an Kursu İnşaatı"
      />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-3xl p-8 text-white mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">🏗️</div>
            <h2 className="text-2xl font-bold mb-2">İnşaat Durumu</h2>
            <p className="text-emerald-200 text-sm">Güncelleme: Mayıs 2024</p>
          </div>
          {item && (
            <ProgressBar
              percent={item.progressPercent}
              collected={item.collectedAmount}
              target={item.targetAmount}
            />
          )}
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-300">%55</div>
              <div className="text-emerald-300 text-xs">Tamamlandı</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1.37M₺</div>
              <div className="text-emerald-300 text-xs">Toplanan</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">2.5M₺</div>
              <div className="text-emerald-300 text-xs">Hedef</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <div className="text-3xl mb-3">🏛️</div>
            <h3 className="font-bold text-gray-900 mb-2">Proje Hakkında</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              İstanbul'da inşa edilen Kur'an kursumuz, 150 öğrenci kapasitesiyle hafızlık ve Kur'an eğitimi
              verecek. Modern eğitim odaları, kütüphane ve sosyal alanlarıyla donatılacak.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="font-bold text-gray-900 mb-2">İnşaat Aşamaları</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Temel ve kaba inşaat tamamlandı</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Çatı imalatı tamamlandı</li>
              <li className="flex items-center gap-2"><span className="text-amber-500">◉</span> İç mekan ince işçilik devam ediyor</li>
              <li className="flex items-center gap-2"><span className="text-gray-300">○</span> Mobilya ve techizat (yakında)</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/bagis/kuran-kursu-insaat-bagisi"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-lg active:scale-95"
          >
            Kurs İnşaatına Destek Ol <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
