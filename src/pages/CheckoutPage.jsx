import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    totalSavings,
    deliveryFee,
    handlingFee,
    couponDiscount,
    appliedCoupon,
    grandTotal,
    address,
    placeOrder,
    setActiveView,
    setIsAddressModalOpen,
    showToast
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('aman@okicici');

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="display-1 mb-3">📦</div>
        <h4 className="fw-bold">Your cart is empty!</h4>
        <p className="text-muted small mb-4">Add some groceries before heading to checkout.</p>
        <button className="btn btn-success fw-bold px-4 rounded-pill" onClick={() => setActiveView('home')}>
          Go to Home
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Trigger fireworks/confetti celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newOrder = placeOrder(paymentMethod);
    if (newOrder) {
      showToast(`Order #${newOrder.id} confirmed! Delivering in 10 mins 🛵`);
    }
  };

  return (
    <div className="container max-width-1000 py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setActiveView('home')}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
        <h3 className="fw-bold m-0" style={{ fontSize: '1.4rem' }}>
          Checkout & Place Order
        </h3>
      </div>

      <div className="row g-4">
        
        {/* Left Column: Delivery Address & Payment */}
        <div className="col-12 col-md-7">
          
          {/* Step 1: Delivery Location */}
          <div className="card border-0 shadow-sm p-3 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h5 className="fw-bold m-0" style={{ fontSize: '1.05rem' }}>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                1. Delivery Location
              </h5>
              <button
                className="btn btn-sm btn-outline-success fw-bold"
                onClick={() => setIsAddressModalOpen(true)}
              >
                Change
              </button>
            </div>

            <div className="bg-light p-3 rounded">
              <div className="fw-bold text-dark mb-1">
                {address.receiverName} ({address.type}) • {address.phone}
              </div>
              <div className="text-muted small">
                {address.flat}, {address.area}, {address.city} - {address.pincode}
              </div>
              <div className="mt-2">
                <span className="badge bg-success" style={{ fontSize: '0.72rem' }}>
                  ⚡ EXPRESS 10 MINS DELIVERY
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Options */}
          <div className="card border-0 shadow-sm p-3 mb-4">
            <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontSize: '1.05rem' }}>
              <i className="bi bi-wallet2 text-success me-2"></i>
              2. Select Payment Method
            </h5>

            <div className="d-flex flex-column gap-3">
              
              {/* Option: UPI */}
              <div
                className={`p-3 rounded border cursor-pointer ${
                  paymentMethod === 'UPI' ? 'border-success bg-light' : ''
                }`}
                onClick={() => setPaymentMethod('UPI')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                    />
                    <span className="fw-bold">UPI / Google Pay / PhonePe / Paytm</span>
                  </div>
                  <span className="badge bg-success text-white">Recommended</span>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-2 pt-2 border-top">
                    <label className="form-label small text-muted">Enter UPI ID</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                    />
                    <small className="text-muted">Instant 1-click payment confirmation</small>
                  </div>
                )}
              </div>

              {/* Option: Cash on Delivery */}
              <div
                className={`p-3 rounded border cursor-pointer ${
                  paymentMethod === 'COD' ? 'border-success bg-light' : ''
                }`}
                onClick={() => setPaymentMethod('COD')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <span className="fw-bold">Cash on Delivery (Pay cash/UPI at doorstep)</span>
                </div>
              </div>

              {/* Option: Credit / Debit Card */}
              <div
                className={`p-3 rounded border cursor-pointer ${
                  paymentMethod === 'CARD' ? 'border-success bg-light' : ''
                }`}
                onClick={() => setPaymentMethod('CARD')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                  />
                  <span className="fw-bold">Credit / Debit Card</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Order Items & Summary */}
        <div className="col-12 col-md-5">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ fontSize: '1.05rem' }}>
              Order Summary ({cart.length} Items)
            </h5>

            {/* Item List Preview */}
            <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center justify-content-between py-1 border-bottom">
                  <div className="d-flex align-items-center gap-2" style={{ maxWidth: '70%' }}>
                    <img src={item.image} alt={item.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    <span className="small text-truncate">{item.name} x {item.quantity}</span>
                  </div>
                  <span className="fw-bold small">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="bg-light p-3 rounded mb-3">
              <div className="d-flex justify-content-between mb-2 small">
                <span>Items Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>

              {totalSavings > 0 && (
                <div className="d-flex justify-content-between mb-2 small text-success">
                  <span>Product Savings</span>
                  <span>- ₹{totalSavings}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="d-flex justify-content-between mb-2 small text-success">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2 small">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <strong className="text-success">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="d-flex justify-content-between mb-2 small">
                <span>Handling Fee</span>
                <span>₹{handlingFee}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-6">
                <span>Total Amount Payable</span>
                <span className="text-success">₹{grandTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              className="btn btn-success w-100 py-3 fw-bold shadow-lg"
              style={{ backgroundColor: 'var(--primary-color)', borderRadius: '10px' }}
              onClick={handlePlaceOrder}
            >
              PAY ₹{grandTotal} & PLACE ORDER 🚀
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
