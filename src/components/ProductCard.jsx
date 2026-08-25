import React from 'react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    updateQuantity,
    getItemQuantity,
    toggleWishlist,
    isWishlisted
  } = useShop();

  const quantity = getItemQuantity(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      
      {/* Top badges & Wishlist Button */}
      <div className="product-img-wrapper">
        {product.discount && (
          <span className="discount-tag">{product.discount}</span>
        )}
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
      </div>

      {/* Delivery Time Badge */}
      <div>
        <span className="delivery-time-badge">
          <i className="bi bi-clock-fill me-1"></i>
          {product.deliveryTime || '10 MINS'}
        </span>
      </div>

      {/* Product Title & Unit */}
      <h3 className="product-title" title={product.name}>
        {product.name}
      </h3>
      <div className="product-unit">{product.unit}</div>

      {/* Pricing & Add/Counter Button */}
      <div className="product-footer">
        <div className="price-box">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="old-price">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Counter or ADD button */}
        {quantity > 0 ? (
          <div className="counter-group">
            <button
              className="counter-btn"
              onClick={() => updateQuantity(product.id, -1)}
              title="Decrease quantity"
            >
              -
            </button>
            <span className="counter-value">{quantity}</span>
            <button
              className="counter-btn"
              onClick={() => updateQuantity(product.id, 1)}
              title="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            ADD
          </button>
        )}
      </div>

    </div>
  );
};
