import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COUPONS } from '../data/products';

export const CartDrawer = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartOriginalTotal,
    totalSavings,
    deliveryFee,
    handlingFee,
    couponDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    grandTotal,
    address,
    isCartOpen,
    setIsCartOpen,
    setActiveView,
    setIsAddressModalOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [tip, setTip] = useState(0);

  if (!isCartOpen) return null;

  const freeDeliveryGap = Math.max(0, 199 - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / 199) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}></div>
      
      <div className="cart-drawer">
        
        {/* Cart Drawer Header */}
        <div className="cart-header">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-cart-check-fill text-success fs-5"></i>
            <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>
              My Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h5>
          </div>
          <button
            className="btn-close text-reset"
            onClick={() => setIsCartOpen(false)}
          ></button>
        </div>

        {/* Cart Body */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3 display-1 text-muted">🛒</div>
              <h5 className="fw-bold">Your cart is empty</h5>
              <p className="text-muted small mb-4">
                Explore our fresh grocery store and add items to your cart!
              </p>
              <button
                className="btn btn-success fw-bold px-4 rounded-pill"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Delivery Progress Bar */}
              <div className="bg-light p-3 rounded mb-3 border">
                <div className="d-flex align-items-center justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                  <span className="fw-bold text-success">
                    {freeDeliveryGap === 0 ? (
                      '🎉 You unlocked FREE Delivery!'
                    ) : (
                      `Add ₹${freeDeliveryGap} more for FREE Delivery`
                    )}
                  </span>
                  <span className="text-muted">Min ₹199</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Delivery Address Header Strip */}
              <div
                className="d-flex align-items-center justify-content-between p-2 bg-light rounded mb-3 border cursor-pointer"
                onClick={() => setIsAddressModalOpen(true)}
              >
                <div className="d-flex align-items-center gap-2 text-truncate">
                  <i className="bi bi-geo-alt-fill text-danger"></i>
                  <div style={{ lineHeight: '1.2' }}>
                    <div className="fw-bold" style={{ fontSize: '0.78rem' }}>
                      Delivering to {address.type} ({address.pincode})
                    </div>
                    <div className="text-muted text-truncate" style={{ fontSize: '0.75rem', maxWidth: '240px' }}>
                      {address.flat}, {address.area}
                    </div>
                  </div>
                </div>
                <span className="text-success fw-bold" style={{ fontSize: '0.78rem' }}>
                  CHANGE
                </span>
              </div>

              {/* Cart Items List */}
              <div className="cart-items-list mb-3">
                <h6 className="fw-bold mb-2 text-muted" style={{ fontSize: '0.82rem' }}>
                  ITEMS IN CART
                </h6>

                {cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                    
                    <div className="d-flex align-items-center gap-2" style={{ maxWidth: '60%' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px' }}
                      />
                      <div>
                        <div className="fw-semibold text-truncate" style={{ fontSize: '0.85rem' }} title={item.name}>
                          {item.name}
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {item.unit} • ₹{item.price}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Counter */}
                    <div className="d-flex align-items-center gap-2">
                      <div className="counter-group" style={{ transform: 'scale(0.9)' }}>
                        <button className="counter-btn" onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span className="counter-value">{item.quantity}</span>
                        <button className="counter-btn" onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>

                      <div className="fw-bold text-end" style={{ width: '50px', fontSize: '0.9rem' }}>
                        ₹{item.price * item.quantity}
                      </div>

                      <button
                        className="btn btn-link text-danger p-0 ms-1"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Coupons Section */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2 text-muted" style={{ fontSize: '0.82rem' }}>
                  COUPONS & OFFERS
                </h6>

                {appliedCoupon ? (
                  <div className="d-flex align-items-center justify-content-between p-2 bg-success text-white rounded">
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.85rem' }}>
                        <i className="bi bi-tags-fill me-1"></i> {appliedCoupon.code} Applied
                      </div>
                      <div style={{ fontSize: '0.75rem' }}>{appliedCoupon.description}</div>
                    </div>
                    <button className="btn btn-sm btn-light py-0 fw-bold" onClick={removeCoupon}>
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <div>
                    <form className="d-flex gap-2 mb-2" onSubmit={handleApplyCoupon}>
                      <input
                        type="text"
                        className="form-control form-control-sm text-uppercase fw-bold"
                        placeholder="Enter Promo Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-sm btn-outline-success fw-bold">
                        APPLY
                      </button>
                    </form>

                    <div className="d-flex gap-2 overflow-auto py-1">
                      {COUPONS.map((c) => (
                        <span
                          key={c.code}
                          className="badge bg-light text-dark border cursor-pointer p-2"
                          onClick={() => applyCoupon(c.code)}
                          style={{ cursor: 'pointer', fontSize: '0.72rem' }}
                        >
                          🏷️ <strong>{c.code}</strong> ({c.description})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Tip */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2 text-muted" style={{ fontSize: '0.82rem' }}>
                  DELIVERY PARTNER TIP
                </h6>
                <div className="d-flex gap-2">
                  {[0, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      className={`btn btn-sm flex-grow-1 ${
                        tip === amount ? 'btn-success fw-bold' : 'btn-outline-secondary'
                      }`}
                      onClick={() => setTip(amount)}
                    >
                      {amount === 0 ? 'No Tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Bill Summary */}
              <div className="bg-light p-3 rounded border mb-3">
                <h6 className="fw-bold mb-3 border-bottom pb-2" style={{ fontSize: '0.9rem' }}>
                  Bill Details
                </h6>

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                  <span className="text-muted">Item Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success" style={{ fontSize: '0.85rem' }}>
                    <span>Product Discount Savings</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="d-flex justify-content-between mb-2 text-success" style={{ fontSize: '0.85rem' }}>
                    <span>Promo Coupon Discount</span>
                    <span>- ₹{couponDiscount}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                  <span className="text-muted">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-success">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                  <span className="text-muted">Handling & Packaging Fee</span>
                  <span>₹{handlingFee}</span>
                </div>

                {tip > 0 && (
                  <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                    <span className="text-muted">Delivery Partner Tip</span>
                    <span>₹{tip}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between pt-2 border-top fw-bold fs-6">
                  <span>Grand Total</span>
                  <span className="text-success">₹{grandTotal + tip}</span>
                </div>
              </div>

            </>
          )}
        </div>

        {/* Cart Drawer Footer CTA */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <button
              className="btn btn-success w-100 py-2 fw-bold d-flex align-items-center justify-content-between px-3 shadow"
              style={{ backgroundColor: 'var(--primary-color)', borderRadius: '10px' }}
              onClick={handleCheckout}
            >
              <div className="d-flex flex-column align-items-start" style={{ lineHeight: '1.2' }}>
                <span>₹{grandTotal + tip} TOTAL</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 'normal', opacity: 0.9 }}>
                  Included all taxes
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span>Proceed to Checkout</span>
                <i className="bi bi-chevron-right"></i>
              </div>
            </button>
          </div>
        )}

      </div>
    </>
  );
};
