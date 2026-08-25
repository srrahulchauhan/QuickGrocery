import React from 'react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    totalCartCount,
    cartSubtotal,
    address,
    user,
    wishlist,
    setIsCartOpen,
    setIsAddressModalOpen,
    setIsAuthModalOpen,
    darkMode,
    toggleDarkMode
  } = useShop();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('search');
    }
  };

  return (
    <header className="app-header py-2 px-3">
      <div className="container-fluid max-width-1200">
        <div className="d-flex align-items-center justify-content-between gap-3">
          
          {/* Brand Logo & Delivery Location */}
          <div className="d-flex align-items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveView('home');
              }}
              className="brand-logo text-nowrap"
            >
              <i className="bi bi-lightning-charge-fill text-warning"></i>
              <span>QuickGrocery</span>
            </a>

            {/* Address Selector Pill */}
            <div
              className="address-selector-btn d-none d-md-flex align-items-center gap-2"
              onClick={() => setIsAddressModalOpen(true)}
              title="Change Delivery Address"
            >
              <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
              <div style={{ lineHeight: '1.2' }}>
                <div className="fw-bold text-truncate" style={{ fontSize: '0.78rem' }}>
                  Delivery in 10 mins <span className="delivery-badge ms-1">EXPRESS</span>
                </div>
                <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: '180px' }}>
                  {address.flat ? `${address.flat}, ${address.area}` : 'Select Address'}
                </div>
              </div>
              <i className="bi bi-chevron-down text-muted ms-1" style={{ fontSize: '0.7rem' }}></i>
            </div>
          </div>

          {/* Search Bar */}
          <form className="search-input-group flex-grow-1 mx-2 max-width-500" onSubmit={handleSearchSubmit}>
            <i className="bi bi-search text-muted fs-6 ms-1"></i>
            <input
              type="text"
              placeholder="Search 'milk', 'chips', 'tomatoes', 'atta'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'search' && e.target.value.length > 0) {
                  setActiveView('search');
                }
              }}
            />
            {searchQuery && (
              <i
                className="bi bi-x-circle-fill text-muted cursor-pointer me-1"
                onClick={() => setSearchQuery('')}
                style={{ cursor: 'pointer' }}
              ></i>
            )}
          </form>

          {/* Right Action Icons */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            
            {/* Theme Toggle */}
            <button
              className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '38px', height: '38px' }}
              onClick={toggleDarkMode}
              title="Toggle Dark/Light Mode"
            >
              <i className={`bi ${darkMode ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill'}`}></i>
            </button>

            {/* Orders Link (Desktop) */}
            <button
              className={`btn btn-sm ${activeView === 'orders' ? 'btn-success' : 'btn-outline-secondary'} d-none d-md-flex align-items-center gap-1`}
              onClick={() => setActiveView('orders')}
            >
              <i className="bi bi-bag-check-fill"></i>
              <span>My Orders</span>
            </button>

            {/* Wishlist Link (Desktop) */}
            <button
              className={`btn btn-sm ${activeView === 'wishlist' ? 'btn-danger' : 'btn-outline-secondary'} d-none d-md-flex align-items-center gap-1 position-relative`}
              onClick={() => setActiveView('wishlist')}
            >
              <i className="bi bi-heart-fill text-danger"></i>
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">{wishlist.length}</span>
              )}
            </button>

            {/* Auth / Profile Modal Trigger */}
            <button
              className="btn btn-sm btn-outline-secondary d-none d-md-flex align-items-center gap-1"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <i className="bi bi-person-circle fs-6"></i>
              <span>{user?.isLoggedIn ? user.name.split(' ')[0] : 'Login'}</span>
            </button>

            {/* Green Blinkit Cart Button */}
            <button
              className="btn btn-success d-flex align-items-center gap-2 fw-bold px-3 py-2 shadow-sm"
              style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)', borderRadius: '10px' }}
              onClick={() => setIsCartOpen(true)}
            >
              <i className="bi bi-cart3 fs-5"></i>
              <div className="d-flex flex-column align-items-start" style={{ lineHeight: '1.1' }}>
                <span style={{ fontSize: '0.78rem' }}>
                  {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}
                </span>
                {cartSubtotal > 0 && (
                  <span style={{ fontSize: '0.85rem' }}>₹{cartSubtotal}</span>
                )}
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Location Sub-bar */}
        <div
          className="d-flex d-md-none align-items-center justify-content-between pt-2 border-top mt-2"
          onClick={() => setIsAddressModalOpen(true)}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt-fill text-danger"></i>
            <span className="fw-bold" style={{ fontSize: '0.8rem' }}>
              Delivering to: <span className="text-muted fw-normal">{address.flat}, {address.area}</span>
            </span>
          </div>
          <i className="bi bi-chevron-right text-muted" style={{ fontSize: '0.75rem' }}></i>
        </div>

      </div>
    </header>
  );
};
