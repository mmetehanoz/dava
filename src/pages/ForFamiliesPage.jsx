import { Link } from 'react-router-dom';
import { ArrowRight, Shield, GraduationCap, BookOpen, Heart, Users, Star } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const sections = [
  {
    icon: BookOpen,
    color: 'text-emerald-600 bg-emerald-50',
    title: 'Hafızlık Eğitimi',
    desc: `Çocuğunuz, deneyimli hafız hocaların gözetiminde Kur'an-ı Kerim'i usulüne uygun şekilde ezberler.
    Ezberleme süreci öğrencinin kabiliyetine göre bireyselleştirilir. Sabah, öğleden sonra ve hafta sonu
    programlarıyla esnek bir takvim sunulur.`,
    items: [
      'Tecvid kurallarına uygun Kur\'an tilaveti',
      'Bireysel takip ve düzenli tekrar sistemi',
      'Hafızlık bitirme töreni ve sertifika',
    ],
  },
  {
    icon: GraduationCap,
    color: 'text-blue-600 bg-blue-50',
    title: 'Normal Eğitim Takibi',
    desc: `Vakfımız öğrencilerinin devlet okulu eğitimleri hiçbir şekilde aksatılmaz.
    Ödev takibi, ders desteği ve sınav hazırlık programlarıyla akademik başarı da gözetilir.`,
    items: [
      'Haftalık ödev ve ders takibi',
      'Sınav dönemlerinde ek destek',
      'Aile ile düzenli akademik bilgilendirme',
    ],
  },
  {
    icon: Heart,
    color: 'text-amber-600 bg-amber-50',
    title: 'Ahlak ve Değerler Eğitimi',
    desc: `Öğrencilerimize İslami ahlak, empati, dürüstlük, sorumluluk ve saygı gibi temel değerler
    oyun, hikaye ve uygulamalı etkinliklerle aktarılır.`,
    items: [
      'Haftalık değer dersleri',
      'Rol model etkinlikleri ve hikaye anlatımı',
      'Karakter gelişimi takip portoföyü',
    ],
  },
  {
    icon: Users,
    color: 'text-purple-600 bg-purple-50',
    title: 'Sosyal Etkinlikler',
    desc: `Öğrencilerimiz yalnızca ders değil, spor, sanat, kamp ve gezi etkinlikleriyle de sosyal becerilerini
    geliştirir. Aile buluşmaları düzenli olarak gerçekleştirilir.`,
    items: [
      'Mevsimlik aile buluşmaları ve piknikler',
      'Spor ve satranç turnuvaları',
      'Kültürel gezi ve kamplar',
    ],
  },
  {
    icon: Star,
    color: 'text-rose-600 bg-rose-50',
    title: 'Rehberlik ve Takip',
    desc: `Her öğrenci için kişisel rehber öğretmen atanır. Aile ile WhatsApp grubu ve aylık yüz yüze
    görüşmeler aracılığıyla sürekli iletişim sağlanır.`,
    items: [
      'Bireysel rehber öğretmen ataması',
      'Aylık veli bilgilendirme toplantıları',
      'WhatsApp ile anlık iletişim kanalı',
    ],
  },
  {
    icon: Shield,
    color: 'text-teal-600 bg-teal-50',
    title: 'Güvenli Eğitim Ortamı',
    desc: `Tüm personelimiz özgeçmiş kontrolünden geçirilmiş ve eğitim almış bireylerdir.
    Eğitim alanlarımız güvenli, hijyenik ve çocuk dostu şekilde tasarlanmıştır.`,
    items: [
      'Güvenlik kamerası ve kontrollü giriş',
      'Sağlık personeli ve ilk yardım kiti',
      'Psikolog ve uzman danışman desteği',
    ],
  },
];

export default function ForFamiliesPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Aileler İçin"
        subtitle="Çocuğunuzu gönül rahatlığıyla emanet edeceğiniz güvenli, neşeli ve kaliteli bir eğitim ortamı."
        emoji="👨‍👩‍👧"
        breadcrumb="Ana Sayfa / Aileler İçin"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-6">
        {/* Hero message */}
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-3xl p-6 md:p-8 border border-emerald-100 text-center">
          <div className="text-5xl mb-4">👨‍👩‍👧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Çocuğunuz Bizimle Güvende</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Değer ve Ahlak Vakfı olarak çocuğunuzun hem akademik hem spiritüel hem de sosyal gelişimini
            bütüncül bir yaklaşımla destekliyoruz. Ailenize verdiğimiz söz: Güvenli, neşeli ve kaliteli eğitim.
          </p>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 ${s.color} rounded-2xl flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
            <ul className="flex flex-col gap-2">
              {s.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-emerald-900 rounded-3xl p-8 text-white text-center">
          <div className="text-5xl mb-4">📞</div>
          <h2 className="text-2xl font-bold mb-3">Daha Fazla Bilgi Almak İster Misiniz?</h2>
          <p className="text-emerald-200 text-sm mb-6 max-w-md mx-auto">
            Çocuğunuzun vakfımızda eğitim alması hakkında detaylı bilgi için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:bg-emerald-50"
            >
              İletişime Geç <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/bagis"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6 py-3 rounded-2xl text-sm transition-all"
            >
              Bağış Yap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
