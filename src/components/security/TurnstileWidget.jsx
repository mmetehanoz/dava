import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise;

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.turnstile), { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export default function TurnstileWidget({ siteKey, onVerify, onExpire, onError, error }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined;

    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onVerify(token),
          'expired-callback': () => onExpire(),
          'error-callback': () => {
            onError();
            return true;
          },
        });
        setIsReady(true);
      })
      .catch(() => {
        setLoadError(true);
        onError();
      });

    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire, onError]);

  if (!siteKey) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        Turnstile site key tanımlı değil. Canlıya almadan önce <code>VITE_TURNSTILE_SITE_KEY</code> değerini ekleyin.
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} className="min-h-[65px]" />
      {!isReady && !loadError && (
        <p className="text-xs text-gray-500 mt-1">Güvenlik doğrulaması yükleniyor...</p>
      )}
      {loadError && (
        <p className="text-red-500 text-xs mt-1">Güvenlik doğrulaması yüklenemedi. Lütfen sayfayı yenileyin.</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
