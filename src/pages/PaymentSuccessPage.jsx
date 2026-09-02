import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import { paymentApi, pdfApi } from '../services/api';
import { useCart } from '../context/CartContext';

export default function PaymentSuccessPage() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function verify() {
      const params = new URLSearchParams(loc.search);
      const orderId = params.get('order_id') || (loc.state && loc.state.orderId) || (loc.state && loc.state.donationId);
      if (!orderId) {
        setError('Ödeme bilgisi bulunamadı.');
        setLoading(false);
        return;
      }

      try {
        const resp = await paymentApi.status(orderId);
        if (!isMounted) return;
        setStatus(resp);
        // try find a pdf link
        if (resp && resp.pdf_id) {
          setPdfUrl(pdfApi.userPdfUrl(resp.pdf_id));
        } else if (resp && resp.donation_id) {
          setPdfUrl(pdfApi.userPdfUrl(resp.donation_id));
        } else if (resp && resp.pdf_url) {
          setPdfUrl(resp.pdf_url);
        }
        // clear local cart on confirmed success
        if (resp && resp.status === 'success') clearCart();
      } catch (err) {
        console.error(err);
        setError('Ödeme doğrulanırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
    verify();
    return () => { isMounted = false; };
  }, [loc, clearCart]);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader title="Ödeme Başarılı" subtitle="Bağışınız için teşekkür ederiz." emoji="🎉" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading && <p>Ödeme bilgileri doğrulanıyor...</p>}
        {!loading && error && (
          <div className="bg-red-50 p-4 rounded">{error}</div>
        )}
        {!loading && status && (
          <div className="bg-white rounded-xl p-6 shadow">
            {/* Use payment_status if provided by backend, otherwise fallback */}
            {(() => {
              const disp = status.payment_status || status.status || status.result || 'Bilinmiyor';
              const dispKey = (disp || '').toString().toLowerCase();
              // Localize known status keys to Turkish
              const localized = (k => {
                if (!k) return 'Bilinmiyor';
                if (['completed', 'success', 'paid', 'ok'].includes(k)) return 'Tamamlandı';
                if (['pending', 'bekliyor', 'waiting', 'wait'].includes(k)) return 'Bekliyor';
                if (['failed', 'failure', 'error', 'declined'].includes(k)) return 'Başarısız';
                return k.charAt(0).toUpperCase() + k.slice(1);
              })(dispKey || '');

              const isSuccess = ['completed', 'success', 'paid', 'ok'].includes(dispKey);
              return (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {isSuccess ? '✅' : '⏳'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{isSuccess ? 'Ödeme Başarılı' : 'Ödeme Durumu'}</h3>
                      <div className="text-sm text-gray-600">Durum: <strong>{localized}</strong></div>
                    </div>
                  </div>

                  {status.amount && <p className="mb-2">Tutar: <strong>{status.amount} {status.currency || ''}</strong></p>}
                  {status.transaction_id && <p className="mb-2">İşlem No: <strong>{status.transaction_id}</strong></p>}

                  <div className="mt-4">
                    {pdfUrl ? (
                      <a href={pdfUrl} className="inline-block bg-emerald-600 text-white px-4 py-2 rounded">📄 Makbuzu İndir</a>
                    ) : (
                      <p className="text-sm text-gray-600">Makbuz henüz hazır değil. Kısa süre sonra tekrar kontrol edebilirsiniz.</p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div className="mt-6">
          <button onClick={() => navigate('/')} className="text-emerald-600 hover:underline">Anasayfaya Dön</button>
        </div>
      </div>
    </div>
  );
}
