import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';

export default function PaymentFailPage() {
  const loc = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(loc.search);
  const orderId = params.get('order_id') || (loc.state && loc.state.orderId);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader title="Ödeme Başarısız" subtitle="Ödeme gerçekleştirilemedi." emoji="⚠️" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-bold text-lg mb-2">Ödeme Başarısız</h3>
          {orderId && <p className="text-sm">Sipariş No: {orderId}</p>}
          <p className="text-sm text-gray-600 mt-2">Lütfen bilgilerinizi kontrol edip tekrar deneyin veya destek ile iletişime geçin.</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => navigate('/sepet')} className="px-4 py-2 bg-emerald-600 text-white rounded">Sepete Dön</button>
            <button onClick={() => navigate('/bagisci-bilgileri')} className="px-4 py-2 border rounded">Bilgileri Düzenle</button>
          </div>
        </div>
      </div>
    </div>
  );
}
