import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import DonationPage from './pages/DonationPage';
import DonationDetailPage from './pages/DonationDetailPage';
import CartPage from './pages/CartPage';
import DonorInfoPage from './pages/DonorInfoPage';
import DonationSuccessPage from './pages/DonationSuccessPage';
import HafizSahiplenPage from './pages/HafizSahiplenPage';
import HafizBursuPage from './pages/HafizBursuPage';
import KuranKursuPage from './pages/KuranKursuPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import AboutPage from './pages/AboutPage';
import ForFamiliesPage from './pages/ForFamiliesPage';
import ContactPage from './pages/ContactPage';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/bagis" element={<Layout><DonationPage /></Layout>} />
          <Route path="/bagis/:slug" element={<Layout><DonationDetailPage /></Layout>} />
          <Route path="/sepet" element={<Layout><CartPage /></Layout>} />
          <Route path="/bagisci-bilgileri" element={<Layout><DonorInfoPage /></Layout>} />
          <Route path="/bagis-basarili" element={<Layout><DonationSuccessPage /></Layout>} />
          <Route path="/hafiz-sahiplen" element={<Layout><HafizSahiplenPage /></Layout>} />
          <Route path="/hafiz-bursu" element={<Layout><HafizBursuPage /></Layout>} />
          <Route path="/kuran-kursu-insaati" element={<Layout><KuranKursuPage /></Layout>} />
          <Route path="/faaliyetler" element={<Layout><ActivitiesPage /></Layout>} />
          <Route path="/faaliyetler/:slug" element={<Layout><ActivityDetailPage /></Layout>} />
          <Route path="/hakkimizda" element={<Layout><AboutPage /></Layout>} />
          <Route path="/aileler-icin" element={<Layout><ForFamiliesPage /></Layout>} />
          <Route path="/iletisim" element={<Layout><ContactPage /></Layout>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
