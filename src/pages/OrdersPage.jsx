import React from 'react';
import { useShop } from '../context/ShopContext';

export const OrdersPage = () => {
  const { orders, reorder, setActiveView } = useShop();

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="display-1 mb-3">📋</div>
        <h4 className="fw-bold">No orders placed yet</h4>
        <p className="text-muted small mb-4">When you place an order, it will appear here.</p>
        <button
          className="btn btn-success fw-bold px-4 rounded-pill"
          onClick={() => setActiveView('home')}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container max-width-900 py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold m-0" style={{ fontSize: '1.4rem' }}>
          My Orders History ({orders.length})
        </h3>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setActiveView('home')}>
          <i className="bi bi-house me-1"></i> Home
        </button>
      </div>

      <div className="d-flex flex-column gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card border-0 shadow-sm overflow-hidden">
            
            {/* Order Header Bar */}
            <div className="card-header bg-light d-flex flex-wrap align-items-center justify-content-between py-3">
              <div>
                <div className="fw-bold text-dark mb-1">
                  Order #{order.id}
                </div>
                <div className="text-muted small">
                  <i className="bi bi-calendar-event me-1"></i> {order.date}
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                <span
                  className={`badge ${
                    order.status.includes('Delivered') ? 'bg-success' : 'bg-warning text-dark'
                  } p-2`}
                  style={{ fontSize: '0.8rem' }}
                >
                  <i className="bi bi-truck me-1"></i> {order.status}
                </span>

                <button
                  className="btn btn-sm btn-outline-success fw-bold"
                  onClick={() => reorder(order.items)}
                >
                  <i className="bi bi-arrow-repeat me-1"></i> Reorder
                </button>
              </div>
            </div>

            {/* Order Body Items */}
            <div className="card-body">
              <div className="row g-3 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="col-12 col-sm-6 d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#f8f9fa' }}
                    />
                    <div>
                      <div className="fw-semibold text-truncate small" style={{ maxWidth: '200px' }}>
                        {item.name}
                      </div>
                      <div className="text-muted small">
                        Qty: {item.quantity} • ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              {/* Order Footer Summary */}
              <div className="d-flex flex-wrap align-items-center justify-content-between small text-muted">
                <div>
                  <strong>Delivered to:</strong> {order.address || 'Saved Address'}
                </div>
                <div className="fw-bold fs-6 text-dark mt-2 mt-sm-0">
                  Total Paid: <span className="text-success">₹{order.totalAmount}</span> ({order.paymentMethod || 'UPI'})
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
