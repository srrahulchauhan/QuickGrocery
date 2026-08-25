import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist, setActiveView } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="display-1 text-danger mb-3">❤️</div>
        <h4 className="fw-bold">Your Wishlist is Empty</h4>
        <p className="text-muted small mb-4">
          Save your favorite products to quickly buy them later.
        </p>
        <button
          className="btn btn-success fw-bold px-4 rounded-pill"
          onClick={() => setActiveView('home')}
        >
          Explore Grocery Store
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid max-width-1200 py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold m-0" style={{ fontSize: '1.4rem' }}>
          My Saved Items ({wishlist.length})
        </h3>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setActiveView('home')}>
          <i className="bi bi-house me-1"></i> Home
        </button>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
        {wishlist.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
