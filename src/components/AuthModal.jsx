import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const AuthModal = () => {
  const { user, setUser, isAuthModalOpen, setIsAuthModalOpen, showToast } = useShop();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(user?.name || 'Aman Sharma');
  const [phone, setPhone] = useState(user?.phone || '9876543210');

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'danger');
      return;
    }
    setUser({
      name: isSignup ? name : (user?.name || 'Aman Sharma'),
      phone,
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${isSignup ? name : 'Aman'}! 👋`);
  };

  const handleLogout = () => {
    setUser({ name: 'Guest', phone: '', isLoggedIn: false });
    setIsAuthModalOpen(false);
    showToast('Logged out successfully', 'info');
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}></div>

      <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1070 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">

            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-person-circle text-success me-2"></i>
                {user?.isLoggedIn ? 'User Account Profile' : isSignup ? 'Create QuickGrocery Account' : 'Login to QuickGrocery'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsAuthModalOpen(false)}
              ></button>
            </div>

            <div className="modal-body">
              {user?.isLoggedIn ? (
                <div className="text-center py-3">
                  <div className="mb-3 display-4 text-success">👤</div>
                  <h5 className="fw-bold">{user.name}</h5>
                  <p className="text-muted small mb-4">📱 +91 {user.phone}</p>
                  
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>
                      Logout Account
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit}>
                  {isSignup && (
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text fw-bold">+91</span>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-success fw-bold py-2">
                      {isSignup ? 'Create Account & Continue' : 'Login / Get OTP'}
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none small text-success fw-bold"
                      onClick={() => setIsSignup(!isSignup)}
                    >
                      {isSignup ? 'Already have an account? Login' : "New to QuickGrocery? Create account"}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
