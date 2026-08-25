import React from 'react';
import { useShop } from '../context/ShopContext';

export const MobileNav = () => {
  const {
    activeView,
    setActiveView,
    totalCartCount,
    wishlist,
    setIsCartOpen
  } = useShop();

  return (
    <div className="mobile-bottom-nav d-md-none">
      <button
        className={`nav-item-btn ${activeView === 'home' ? 'active' : ''}`}
        onClick={() => setActiveView('home')}
      >
        <i className="bi bi-house-door-fill"></i>
        <span>Home</span>
      </button>

      <button
        className={`nav-item-btn ${activeView === 'search' ? 'active' : ''}`}
        onClick={() => setActiveView('search')}
      >
        <i className="bi bi-search"></i>
        <span>Search</span>
      </button>

      <button
        className={`nav-item-btn ${activeView === 'orders' ? 'active' : ''}`}
        onClick={() => setActiveView('orders')}
      >
        <i className="bi bi-bag-check-fill"></i>
        <span>Orders</span>
      </button>

      <button
        className={`nav-item-btn ${activeView === 'wishlist' ? 'active' : ''}`}
        onClick={() => setActiveView('wishlist')}
      >
        <i className="bi bi-heart-fill"></i>
        <span>Saved</span>
        {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
      </button>

      <button
        className="nav-item-btn"
        onClick={() => setIsCartOpen(true)}
      >
        <i className="bi bi-cart3 text-success"></i>
        <span className="text-success">Cart</span>
        {totalCartCount > 0 && <span className="badge-count bg-success">{totalCartCount}</span>}
      </button>
    </div>
  );
};
