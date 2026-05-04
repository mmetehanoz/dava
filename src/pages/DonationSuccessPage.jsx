import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Home, Heart } from 'lucide-react';

const fmt = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

export default function DonationSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 px-4 pb-20 lg:pb-0">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Bağışınız Alındı! 🎉
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {state.donor?.fullName && `Sayın ${state.donor.fullName},`} bağışınız için teşekkür ederiz.
          Allah razı olsun. Bağış makbuzunuz e-posta adresinize iletilecektir.
        </p>

        {state.donationId && (
          <div className="bg-emerald-50 rounded-2xl py-3 px-5 mb-6 inline-flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-bold">Bağış No:</span>
            <span className="text-emerald-800 font-mono font-bold">{state.donationId}</span>
          </div>
        )}

        {state.totalAmount && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-8">
            <div className="text-sm text-gray-500 mb-1">Toplam Bağış Tutarı</div>
            <div className="text-3xl font-bold text-emerald-700">{fmt(state.totalAmount)}</div>
          </div>
        )}

        <div className="bg-amber-50 rounded-2xl p-4 mb-8 text-left">
          <div className="text-2xl mb-2">🤲</div>
          <p className="text-amber-800 text-sm font-medium italic leading-relaxed">
            "Kim Allah rızası için hayır yaparsa, Allah da ona kat kat geri verir."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold text-sm transition-all hover:shadow-md"
          >
            <Home className="w-4 h-4" /> Ana Sayfa
          </Link>
          <Link
            to="/bagis"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3 rounded-2xl font-bold text-sm border-2 border-emerald-200 transition-all"
          >
            <Heart className="w-4 h-4" /> Tekrar Bağış Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
