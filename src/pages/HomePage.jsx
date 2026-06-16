import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, BookOpen, Heart, Users, MapPin } from 'lucide-react';
import { institutions } from '../data/institutions';
import { departments } from '../data/departments';
import HomeSlider from '../components/home/HomeSlider';
import QuickDonationBar from '../components/home/QuickDonationBar';
import StatsSection from '../components/home/StatsSection';
import FAQSection from '../components/home/FAQSection';
import SocialMediaCards from '../components/home/SocialMediaCards';
import DonationCard from '../components/donation/DonationCard';
import ProgressBar from '../components/ui/ProgressBar';
import { slides } from '../data/slides';
import { donationItems } from '../data/donationItems';
import { socialLinks } from '../data/socialLinks';
import { faqs } from '../data/faqs';
import { stats } from '../data/stats';

const constructionItem = donationItems.find(i => i.slug === 'kuran-kursu-insaat-bagisi');
const featuredDonations = donationItems.filter(i => i.slug !== 'kuran-kursu-insaat-bagisi').slice(0, 4);
const featuredDepartments = departments.slice(0, 4);

const educationFeatures = [
  { icon: BookOpen, title: 'Hafızlık Eğitimi', desc: 'Kur\'an-ı Kerim\'i usulüne göre ezberleme eğitimi', color: 'text-emerald-600 bg-emerald-50' },
  { icon: GraduationCap, title: 'Normal Eğitim Takibi', desc: 'Devlet okulu eğitimi aralıksız devam eder', color: 'text-blue-600 bg-blue-50' },
  { icon: Heart, title: 'Ahlak & Değerler', desc: 'Karakter, empati ve İslami ahlak eğitimi', color: 'text-amber-600 bg-amber-50' },
  { icon: Users, title: 'Sosyal Gelişim', desc: 'Etkinlikler, spor ve sosyal beceri programları', color: 'text-purple-600 bg-purple-50' },
];

export default function HomePage() {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Slider */}
      <HomeSlider slides={slides} />

      {/* Quick Donation Bar */}
      <div className="max-w-7xl mx-auto">
        <QuickDonationBar />
      </div>

      {/* Institutions */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kurumlarımız</h2>
            <p className="text-gray-500 text-sm mt-1">Vakfımız bünyesindeki eğitim kurumlarımız.</p>
          </div>
          <Link to="/kurumlarimiz" className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex-shrink-0">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutions.map(inst => (
            <Link
              key={inst.id}
              to={`/kurumlarimiz/${inst.slug}`}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex gap-4 p-4 group items-start"
            >
              {/* Görsel / emoji */}
              <div className="w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md">
                {inst.image
                  ? <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{inst.emoji}</span>
                }
              </div>
              {/* İçerik */}
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-emerald-600 mb-0.5 block">{inst.category}</span>
                <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">{inst.name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{inst.shortDesc}</p>
                <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2 group-hover:gap-2 transition-all">
                  İncele <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Donations */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Bağışlar</h2>
            <p className="text-gray-500 text-sm mt-1">Güvenle bağışlayın, ihtiyaç sahiplerine ulaştıralım.</p>
          </div>
          <Link to="/bagis" className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
            Tümü <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDonations.map(item => <DonationCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* Construction Campaign */}
      {constructionItem && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 rounded-3xl p-6 md:p-10 text-white shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  🏗️ Devam Eden Kampanya
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Kur'an Kursu İnşaatı</h2>
                <p className="text-emerald-200 text-sm md:text-base leading-relaxed mb-6">
                  Her tuğla bir sadaka, her katkı nesiller boyu akan bir hayır. Kur'an kursumuzu birlikte inşa edelim.
                </p>
                <Link
                  to="/bagis/kuran-kursu-insaat-bagisi"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:shadow-lg active:scale-95"
                >
                  Kurs İnşaatına Destek Ol <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center text-5xl mb-4">🏗️</div>
                <ProgressBar
                  percent={constructionItem.progressPercent}
                  collected={constructionItem.collectedAmount}
                  target={constructionItem.targetAmount}
                  dark
                />
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div>
                    <div className="text-amber-300 font-bold text-sm">%{constructionItem.progressPercent}</div>
                    <div className="text-emerald-300 text-xs">Tamamlandı</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">1.375K</div>
                    <div className="text-emerald-300 text-xs">Toplanan</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">2.500K</div>
                    <div className="text-emerald-300 text-xs">Hedef</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Activities */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Faaliyetlerimiz</h2>
            <p className="text-gray-500 text-sm mt-1">Vakfımızın yürüttüğü çalışma alanları ve hizmet birimleri.</p>
          </div>
          <Link to="/faaliyetler" className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex-shrink-0">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredDepartments.map(dept => (
            <Link
              key={dept.id}
              to="/faaliyetler"
              className={`bg-white rounded-3xl shadow-md border ${dept.borderColor} overflow-hidden hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex items-center gap-4 p-4 md:p-5">
                <div className={`w-12 h-12 flex-shrink-0 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform`}>
                  {dept.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">{dept.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{dept.content.split('\n\n')[0]}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hafiz Adoption Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-emerald-200 rounded-3xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-4xl block mb-3">📖</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Bir Hafız Sahiplen</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                Bir çocuğun hafızlık yolculuğuna destek olun. Aylık bursunuzla bir öğrencinin eğitimine ortak olun,
                duasına nail olun. Her hafız, sizin için ebedi bir sadaka-i câriye olur.
              </p>
              <Link
                to="/hafiz-sahiplen"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:shadow-md active:scale-95"
              >
                Hafız Sahiplen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '🌙', text: 'Kur\'an ezberi', sub: 'Usulüne göre hıfz' },
                { emoji: '📚', text: 'Okul devam', sub: 'Resmi eğitim sürer' },
                { emoji: '🤲', text: 'Dua almanın verici', sub: 'Bereket kapısı' },
                { emoji: '💛', text: 'Manevi yatırım', sub: 'Ebedi sadaka' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                  <span className="text-2xl block mb-1">{f.emoji}</span>
                  <div className="text-xs font-bold text-gray-800">{f.text}</div>
                  <div className="text-xs text-gray-500">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Model */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Eğitim Modelimiz</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
            Çocuklarınız hem geleceğe hem de güzel değerlere hazırlanır. Modern eğitim ve köklü değerler bir arada.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {educationFeatures.map((f, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/aileler-icin"
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 font-semibold px-6 py-2.5 rounded-2xl text-sm transition-all"
          >
            Aileler İçin Detaylı Bilgi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Social Media */}
      <section className="max-w-7xl mx-auto mt-12">
        <SocialMediaCards links={socialLinks} />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto mt-12">
        <StatsSection stats={stats} />
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto mt-12">
        <FAQSection faqs={faqs} />
      </section>
    </div>
  );
}
