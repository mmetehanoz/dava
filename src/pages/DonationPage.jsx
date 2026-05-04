import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import DonationCategoryTabs from '../components/donation/DonationCategoryTabs';
import DonationCard from '../components/donation/DonationCard';
import { donationCategories } from '../data/donationCategories';
import { donationItems } from '../data/donationItems';

export default function DonationPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? donationItems
    : donationItems.filter(i => i.category === activeCategory);

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
            categories={donationCategories}
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
