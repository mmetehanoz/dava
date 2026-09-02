import { useEffect, useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import DonationCategoryTabs from '../components/donation/DonationCategoryTabs';
import DonationCard from '../components/donation/DonationCard';
import { donationCategories as fallbackCategories } from '../data/donationCategories';
// fallback removed to prefer backend data; ensure dev server restarted to pick up VITE_API_URL
import { getDonationCategories, getDonationItems } from '../services/api';

export default function DonationPage() {
  function slugifyLocal(value) {
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(fallbackCategories);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([getDonationCategories(), getDonationItems()])
      .then(([apiCategories, apiItems]) => {
        if (!active) return;
        setCategories([
          { id: 'all', label: 'Tümü', emoji: '🌟' },
          ...apiCategories.map((category) => ({
            id: category.id || (category.slug || category.name || category.label || '').toString(),
            label: category.name || category.label || category.display_name || category.slug || 'Kategori',
            emoji: category.emoji || '🤲',
          })),
        ]);
        // ensure each item has categoryId (normalized in api.getDonationItems)
        const mappedItems = apiItems.map(it => ({ ...it, categoryId: slugifyLocal(it.categoryId || it.category || '') }));
        // debug to help trace why items/categories mismatch in UI
        // eslint-disable-next-line no-console
        console.debug('[donation-page] categories:', apiCategories, 'itemsSample:', mappedItems.slice(0,3));
        setItems(mappedItems);
      })
      // API yapılandırılmadan arayüzün yerel katalogla çalışması amaçlıdır.
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const filtered = activeCategory === 'all'
    ? items
    : items.filter(i => (i.categoryId || i.category) === activeCategory);

  return (
    <div className="pb-20 lg:pb-0">
      <PageHeader
        title="Bağış Yap"
        subtitle="Güvenle bağışlayın, ihtiyaç sahiplerine ulaştıralım. Her bağışınız için şeffaf rapor sunuyoruz."
        emoji="🤲"
        breadcrumb="Ana Sayfa / Bağış Yap"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Category Filter */}
        <div className="mb-6">
          <DonationCategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Donation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => <DonationCard key={item.id} item={item} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-medium">Bu kategoride bağış bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
