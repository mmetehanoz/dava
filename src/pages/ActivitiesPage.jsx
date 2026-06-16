import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { departments } from '../data/departments';

export default function ActivitiesPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Faaliyetlerimiz"
        subtitle="Vakfımızın yürüttüğü çalışma alanları ve hizmet birimleri."
        emoji="📋"
        breadcrumb="Ana Sayfa / Faaliyetlerimiz"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-5">
        {departments.map(dept => (
          <div key={dept.id} className={`bg-white rounded-3xl shadow-md border ${dept.borderColor} overflow-hidden`}>
            <div className="flex items-center gap-4 p-5 md:p-6">
              <div className={`w-12 h-12 flex-shrink-0 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                {dept.emoji}
              </div>
              <h3 className={`font-bold text-base md:text-lg text-gray-900`}>{dept.title}</h3>
            </div>
            <div className={`${dept.bgLight} mx-4 mb-4 rounded-2xl px-5 py-4`}>
              {dept.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 text-sm leading-relaxed mb-3 last:mb-0">{para}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Gönüllü Olma CTA */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-3xl p-7 md:p-10 text-white shadow-xl mt-2">
          <div className="text-4xl mb-4">🙋‍♂️</div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">Gönüllü Olmaya Davet</h2>
          <p className="text-emerald-200 text-sm leading-relaxed mb-3">
            Bilgi, emek ve zamanını hayırlı bir hizmette değerlendirmek; yürütülen çalışmaların bir parçası olmak isteyen herkesi gönüllü faaliyetlerimize davet ediyoruz. Burada her katkı kıymetlidir ve her emek, ortak bir iyiliğin inşasına dahildir.
          </p>
          <p className="text-emerald-200 text-sm leading-relaxed mb-6">
            Siz de eğitimden gençliğe, sosyal yardımdan kültürel çalışmalara kadar uzanan bu hizmet yolculuğunda yer almak isterseniz, gönüllü olarak aramıza katılabilirsiniz.
          </p>
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:shadow-lg active:scale-95"
          >
            Gönüllü Ol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
