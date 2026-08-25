import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { CartDrawer } from './components/CartDrawer';
import { AddressModal } from './components/AddressModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';

const AppContent = () => {
  const { activeView } = useShop();

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {activeView === 'home' && <Home />}
        {activeView === 'search' && <SearchPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'orders' && <OrdersPage />}
        {activeView === 'wishlist' && <WishlistPage />}
      </main>

      {/* Drawers & Modals */}
      <CartDrawer />
      <AddressModal />
      <AuthModal />

      {/* Floating Notifications */}
      <Toast />

      {/* Mobile Sticky Navigation */}
      <MobileNav />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
