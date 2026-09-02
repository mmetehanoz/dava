import { slides } from '../data/slides';
import { activities } from '../data/activities';
import { socialLinks } from '../data/socialLinks';
import { faqs } from '../data/faqs';
import { stats } from '../data/stats';

// VITE_API_URL örneği: http://localhost:8002


// Base API URL from environment
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
if (typeof window !== 'undefined') {
  // Helpful debug during development to ensure VITE_API_URL is loaded
  // eslint-disable-next-line no-console
  console.debug('[api] VITE_API_URL ->', import.meta.env.VITE_API_URL, 'resolved API_URL ->', API_URL);
}

function buildQuery(params = {}) {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  return query ? `?${query}` : '';
}

function slugify(value) {
  if (!value && value !== 0) return '';
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function mapNameToEmoji(name) {
  if (!name) return '🤲';
  const n = String(name).toLowerCase();
  if (n.includes('kuran') || n.includes('kursu') || n.includes('inşaat') || n.includes('insaat')) return '🏗️';
  if (n.includes('hafız') || n.includes('hafizlik') || n.includes('hafiz')) return '📖';
  if (n.includes('genel')) return '🤲';
  if (n.includes('eğitim') || n.includes('egitim')) return '🎓';
  if (n.includes('yardım') || n.includes('ihtiyaç')) return '🤝';
  return '🤲';
}

function resolveImageUrl(image) {
  if (!image) return null;
  try {
    const s = String(image);
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    if (s.startsWith('/')) return `${API_URL}${s}`;
    // relative path without leading slash (e.g. media/xxx)
    return `${API_URL}/${s}`;
  } catch (e) {
    return null;
  }
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  try {
    // Use browser DOM if available
    if (typeof document !== 'undefined') {
      const txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    }
    // Fallback replacements for common entities
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  } catch (e) {
    return String(str);
  }
}

function getSessionKey() {
  // frontend stores session key in localStorage under this key (standard)
  return localStorage.getItem('dava_session_key') || null;
}

async function request(path, { method = 'GET', body = null, params = null, headers = {} } = {}) {
  if (!API_URL) throw new Error('API adresi yapılandırılmamış. VITE_API_URL değerini ekleyin.');

  let url = `${API_URL}${path}`;
  if (params) url += buildQuery(params);

  const sessionKey = getSessionKey();
  const authToken = localStorage.getItem('access_token');

  const baseHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (authToken) baseHeaders['Authorization'] = `Bearer ${authToken}`;
  if (sessionKey) baseHeaders['X-Session-Key'] = sessionKey;

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: baseHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  // eslint-disable-next-line no-console
  if (typeof window !== 'undefined') console.debug('[api] fetch:', method, url, 'status:', res.status);

  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

  if (!res.ok) {
    const err = new Error(data.error || data.detail || 'API isteği başarısız oldu.');
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

// --- Small local fallbacks for static content ---
export const getSlides = async () => slides;
export const getActivities = async () => activities;
export const getActivityBySlug = async (slug) => activities.find((a) => a.slug === slug) || null;
export const getSocialLinks = async () => socialLinks;
export const getFaqs = async () => faqs;
export const getStats = async () => stats;

// --- Donation catalog helpers (used by DonationPage) ---
export const getDonationCategories = async () => {
  try {
    const data = await donationsApi.getCategories();
    const raw = Array.isArray(data) ? data : (data && Array.isArray(data.results) ? data.results : []);
    const mapped = raw.map(c => {
      const name = c.name || c.label || c.display_name || c.slug || '';
      return {
        id: slugify(c.slug || c.id || name),
        name,
        slug: c.slug || null,
        emoji: c.emoji || c.icon || mapNameToEmoji(name),
        raw: c,
      };
    });
    if (typeof window !== 'undefined') console.debug('[api] getDonationCategories -> count:', mapped.length, 'sample:', mapped[0] && mapped[0].id);
    return mapped;
  } catch (e) {
    return [];
  }
};

export const getDonationItems = async (params = {}) => {
  try {
    const data = await donationsApi.listRaw(params);
    // normalize payload to frontend-friendly shape
    const rawItems = Array.isArray(data) ? data : (data && Array.isArray(data.results) ? data.results : []);
    const mapped = rawItems.map((i) => ({
      id: i.id,
      slug: i.slug,
      title: i.title,
      description: decodeHtmlEntities(i.short_description || i.description || ''),
      // category: human-readable label used in UI
      category: i.category_name || (i.category && i.category.name) || 'Genel Bağış',
      // categoryId: stable slugified identifier for filtering
      categoryId: slugify(i.category_slug || (i.category && (i.category.slug || i.category.id || i.category.name)) || i.category_name || 'genel'),
      emoji: i.emoji || (i.category && (i.category.emoji || i.category.icon)) || mapNameToEmoji(i.category_name || (i.category && i.category.name)),
      // image: try common fields and normalize to absolute URL
      image: resolveImageUrl(i.image || i.list_image || i.featured_image || i.image_url || i.imageUrl || (i.image && i.image.url)),
      priceType: i.price_type || i.priceType || 'custom',
      fixedPrice: i.fixed_price || i.fixedPrice || null,
      minAmount: i.min_price || i.minPrice || 0,
      suggestedAmounts: (i.price_variants && Array.isArray(i.price_variants) ? i.price_variants.map(v => v.amount) : (i.suggestedAmounts || [])),
      countries: i.available_countries || i.countries || [],
      quantityEnabled: i.quantity_enabled || i.quantityEnabled || false,
      intentEnabled: i.intent_enabled || i.intentEnabled || false,
      countryEnabled: (i.available_countries && i.available_countries.length > 0) || i.countryEnabled || false,
      monthlyEnabled: i.monthly_enabled || i.monthlyEnabled || false,
      monthlyRequired: i.monthly_required || i.monthlyRequired || false,
      progressEnabled: !!(i.target_amount || i.share_progress || i.progress_percent || i.progressPercent),
      progressPercent: i.share_progress || i.progress_percent || i.progressPercent || 0,
      collectedAmount: i.raised_amount || i.collectedAmount || 0,
      targetAmount: i.target_amount || i.targetAmount || 0,
    }));
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.debug('[api] getDonationItems -> count:', mapped.length, 'sample:', mapped[0] && mapped[0].slug);
    }
    return mapped;
  } catch (e) {
    return [];
  }
};

export const getQuickDonationSettings = async () => {
  try {
    const res = await request('/icerik/hizli-bagis/');
    // view wraps response as { success: True, data: {...} }
    const payload = res && res.data ? res.data : res;
    // Normalize available_donations images and category ids
    if (payload && Array.isArray(payload.available_donations)) {
        payload.available_donations = payload.available_donations.map(d => {
          const title = d.title || d.name || d.label || '';
          const categoryName = d.category_name || (d.category && (d.category.name || d.category)) || '';
          return {
            ...d,
            title,
            image: resolveImageUrl(d.image || d.list_image || d.featured_image || d.image_url || d.imageUrl),
            category: categoryName,
            categoryId: slugify(d.category_slug || d.category_id || categoryName),
            emoji: d.emoji || d.icon || mapNameToEmoji(title || categoryName),
            priceType: d.price_type || d.priceType || (d.fixed_price ? 'fixed' : 'custom'),
            fixedPrice: d.fixed_price || d.fixedPrice || null,
            suggestedAmounts: (d.price_variants && Array.isArray(d.price_variants) ? d.price_variants.map(v => v.amount) : (d.suggestedAmounts || [])),
          };
        });
    }
    return payload;
  } catch (e) {
    return null;
  }
};

// --- Donations API ---
export const donationsApi = {
  list: (params) => request('/bagislar/bagislar/' + buildQuery(params), { method: 'GET' }),
  listRaw: (params) => request('/bagislar/bagislar/', { method: 'GET', params }),
  getDetail: (slug) => request(`/bagislar/bagislar/${encodeURIComponent(slug)}/`),
  getCategories: () => request('/bagislar/kategoriler/'),
  getPrice: (donationId, params) => request(`/bagislar/${donationId}/fiyat/`, { method: 'GET', params }),
  search: (q) => request('/bagislar/bagislar/ara/', { method: 'GET', params: { q } }),
};

// --- Cart API ---
export const cartApi = {
  getCart: () => request('/sepet/'),
  addToCart: (payload) => request('/sepet/ekle/', { method: 'POST', body: payload }),
  updateQuantity: (payload) => request('/sepet/miktar-guncelle/', { method: 'POST', body: payload }),
  removeItem: (payload) => request('/sepet/cikar/', { method: 'POST', body: payload }),
  clearCart: () => request('/sepet/temizle/', { method: 'POST' }),
  count: () => request('/sepet/say/'),
  createOrder: (payload) => request('/sepet/odeme/siparis-olustur/', { method: 'POST', body: payload }),
  payforCheckout: (payload) => request('/sepet/odeme/payfor/', { method: 'POST', body: payload }),
};

// --- Payment API ---
export const paymentApi = {
  initiate: (payload) => request('/sepet/odeme/payfor/', { method: 'POST', body: payload }),
  status: (orderId) => request(`/odemeler/status/${encodeURIComponent(orderId)}/`),
  // legacy: donations checkout
  donationsCheckout: (payload) => request('/bagislar/checkout/', { method: 'POST', body: payload }),
};

// --- Donor API ---
export const donorApi = {
  getProfile: (id) => request(`/bagisci/profiles/${encodeURIComponent(id)}/`),
  quickCreate: (data) => request('/bagisci/profiles/quick-create/', { method: 'POST', body: data }),
};

// --- PDF API ---
export const pdfApi = {
  userPdfUrl: (id) => `${API_URL}/pdf/user-pdf/${id}/`,
  listUserPdfs: () => request('/pdf/api/user-pdfs/'),
};

// Quick contact API
export const contactApi = {
  create: (payload) => request('/icerik/iletisim/', { method: 'POST', body: payload }),
};

// --- Core API ---
export const coreApi = {
  currencies: () => request('/core/currencies/'),
  exchangeRates: () => request('/core/exchange-rates/'),
  donationPriceCalculator: (params) => request('/core/donation-price-calculator/', { method: 'GET', params }),
};

// Backwards compatibility: high-level helpers used by UI
export const createDonation = async ({ donor, items, turnstileToken }) => {
  const [firstName, ...lastNameParts] = (donor.fullName || '').trim().split(/\s+/);
  const contact_info = {
    first_name: firstName || '',
    last_name: lastNameParts.join(' ') || firstName || '',
    email: donor.email,
    phone: donor.phone,
    address: donor.address || donor.city || 'Belirtilmedi',
    city: donor.city || 'Belirtilmedi',
    postal_code: donor.postalCode || '00000',
    notes: donor.note || '',
  };

  const payload = {
    items: items.map((item) => ({
      donation_id: item.id,
      name: item.title,
      price: item.priceType === 'fixed' ? item.fixedPrice : item.amount,
      quantity: item.quantity || 1,
    })),
    contact_info,
    payment_method: 'credit_card',
    payment_source: 'dava_web',
    cf_turnstile_response: turnstileToken || undefined,
  };

  const data = await donationsApi.donationsCheckout ? donationsApi.donationsCheckout(payload) : request('/bagislar/checkout/', { method: 'POST', body: payload });
  return { success: data.success, donationId: data.order_number, orderId: data.order_id };
};

// Keep old simple helpers for templates
export const getDonorPDF = (id) => pdfApi.userPdfUrl(id);
export const getForm = (slug) => request(`/formlar/${encodeURIComponent(slug)}/`);
export const submitForm = (slug, values) => request(`/formlar/${encodeURIComponent(slug)}/gonder/`, { method: 'POST', body: values });
