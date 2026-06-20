import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { assetPath } from '../../utils/assetPath';

const navLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/bagis', label: 'Bağış Yap' },
  { to: '/kurumlarimiz', label: 'Kurumlarımız' },
  { to: '/hafiz-sahiplen', label: 'Hafız Sahiplen' },
  { to: '/faaliyetler', label: 'Faaliyetler' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/aileler-icin', label: 'Aileler İçin' },
  { to: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src={assetPath('dava-logo.png')} alt="DAVA Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/sepet')}
            className="relative p-2.5 rounded-xl text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/bagis')}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md active:scale-95"
          >
            Bağış Yap
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors ${isActive
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
