import PageHeader from '../components/ui/PageHeader';

const values = [
  { emoji: '📖', title: 'İlim', desc: 'Kur\'an ve İslami ilimleri en doğru şekilde aktarmak' },
  { emoji: '💚', title: 'İhlas', desc: 'Her işi yalnızca Allah rızası için yapmak' },
  { emoji: '🤝', title: 'Dayanışma', desc: 'Toplumun her kesimine ulaşmak ve kucaklamak' },
  { emoji: '✨', title: 'Şeffaflık', desc: 'Tüm faaliyetlerde açık ve hesap verebilir olmak' },
  { emoji: '🌱', title: 'Süreklilik', desc: 'Kalıcı eserler ve uzun vadeli projeler üretmek' },
  { emoji: '👨‍👩‍👧', title: 'Aile Önceliği', desc: 'Her kararın merkezine aileyi koymak' },
];

const whyUs = [
  '✓ Resmi vakıf statüsü ve yasal güvence',
  '✓ Her bağış için makbuz ve belgelendirme',
  '✓ Bağışçılarla düzenli iletişim ve raporlama',
  '✓ Hem eğitim hem yardım faaliyetleri',
  '✓ Hafızlık ve normal eğitim entegrasyonu',
  '✓ Uzman kadro ve deneyimli eğitmenler',
];

export default function AboutPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Hakkımızda"
        subtitle="Değer ve Ahlak Vakfı olarak nesillere köklü değerler aktarmak için çalışıyoruz."
        emoji="🏛️"
        breadcrumb="Ana Sayfa / Hakkımızda"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-10">
        {/* About */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">🏛️</div>
            <h2 className="text-xl font-bold text-gray-900">Vakfımız Hakkında</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Değer ve Ahlak Vakfı (DAVA), hafızlık eğitimi, Kur'an kursları, yardım faaliyetleri ve değer eğitimi
            alanlarında faaliyet gösteren bir sivil toplum kuruluşudur. 6-16 yaş arası çocuklara yönelik
            hazırladığımız kapsamlı eğitim modeliyle, öğrencilerimiz hem normal eğitimlerini sürdürürken hem de
            Kur'an-ı Kerim'i ezberleme fırsatı bulur.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-xl">🎯</div>
            <h2 className="text-xl font-bold text-gray-900">Misyonumuz</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Çocuklara ve gençlere İslami değerleri, güçlü bir karakter ve modern eğitimi bir arada sunmak.
            Hafızlık eğitimini destekleyerek ümmetin ilim mirasını yaşatmak, ihtiyaç sahiplerine ulaşarak
            toplumsal dayanışmayı güçlendirmek.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-xl">🔭</div>
            <h2 className="text-xl font-bold text-gray-900">Vizyonumuz</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Türkiye'nin her ilinde Kur'an kursları ve hafızlık merkezleriyle kalıcı bir eğitim altyapısı oluşturmak.
            Uluslararası alanda da etkin yardım ve eğitim faaliyetleri yürüterek İslam ümmetine katkıda bulunmak.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Değerlerimiz</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{v.emoji}</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Understanding */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 md:p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-200 rounded-2xl flex items-center justify-center text-xl">📚</div>
            <h2 className="text-xl font-bold text-gray-900">Eğitim ve Yardım Anlayışımız</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
            Vakfımız, eğitim ve yardım faaliyetlerini birbirini tamamlayan iki temel eksen olarak görür.
            Öğrencilerimizin kaliteli eğitim alması için burslar sağlarken, ihtiyaç sahiplerine kurban,
            sadaka ve zekât yoluyla maddi destek sunarız.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Eğitim modelimizde hafızlık, normal okul eğitimi, ahlak eğitimi ve sosyal gelişim bir bütün olarak
            ele alınır. Öğrencilerimiz sadece Kur'an'ı değil, kendilerini de geliştirirler.
          </p>
        </section>

        {/* Why Us */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">⭐</div>
            <h2 className="text-xl font-bold text-gray-900">Neden Değer ve Ahlak Vakfı?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {whyUs.map((item, i) => (
              <p key={i} className="text-gray-700 text-sm">{item}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
