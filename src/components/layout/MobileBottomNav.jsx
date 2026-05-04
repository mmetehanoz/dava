import { NavLink } from 'react-router-dom';
import { Home, Heart, BookOpen, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const tabs = [
  { to: '/', label: 'Ana Sayfa', Icon: Home },
  { to: '/bagis', label: 'Bağış', Icon: Heart },
  { to: '/faaliyetler', label: 'Faaliyetler', Icon: BookOpen },
  { to: '/sepet', label: 'Sepet', Icon: ShoppingCart, showBadge: true },
  { to: '/iletisim', label: 'İletişim', Icon: Phone },
];

export default function MobileBottomNav() {
  const { totalItems } = useCart();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-2xl pb-safe">
      <div className="flex items-stretch h-16">
        {tabs.map(({ to, label, Icon, showBadge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-0.5 pt-1 transition-colors ${isActive
                ? 'text-emerald-600'
                : 'text-gray-400 hover:text-emerald-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {showBadge && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold leading-none">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{label}</span>
                {isActive && <div className="w-1 h-1 bg-emerald-600 rounded-full" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
