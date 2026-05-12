import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/dava/dava-logo.png" alt="DAVA Logo" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Nesiller boyu sürecek değerleri aktarmak için hafızlık, Kur'an eğitimi ve yardım faaliyetleriyle çalışıyoruz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/bagis', label: 'Bağış Yap' },
                { to: '/hafiz-sahiplen', label: 'Hafız Sahiplen' },
                { to: '/hafiz-bursu', label: 'Hafız Bursu' },
                { to: '/kuran-kursu-insaati', label: 'Kur\'an Kursu İnşaatı' },
                { to: '/faaliyetler', label: 'Faaliyetler' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-emerald-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Kurumsal</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/hakkimizda', label: 'Hakkımızda' },
                { to: '/aileler-icin', label: 'Aileler İçin' },
                { to: '/iletisim', label: 'İletişim' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-emerald-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">İletişim</h4>
            <ul className="space-y-3 text-sm text-emerald-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="tel:+905001234567" className="hover:text-white transition-colors">+90 500 123 45 67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:info@davavakfi.org" className="hover:text-white transition-colors">info@davavakfi.org</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-emerald-400">
          <p>© 2026 Değer ve Ahlak Vakfı. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-emerald-500" />
            <a href="https://babilyazilim.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Babil Yazılım</a> tarafından geliştirildi
          </p>
        </div>
      </div>
    </footer>
  );
}
