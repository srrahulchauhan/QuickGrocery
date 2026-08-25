import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const AddressModal = () => {
  const { address, setAddress, isAddressModalOpen, setIsAddressModalOpen, showToast } = useShop();

  const [formData, setFormData] = useState({ ...address });

  if (!isAddressModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(formData);
    setIsAddressModalOpen(false);
    showToast('Delivery address updated 📍');
  };

  const handleQuickFill = (preset) => {
    if (preset === 'noida') {
      setFormData({
        type: 'Home',
        flat: 'Flat 302, Green Acres Apt',
        area: 'Sector 62',
        city: 'Noida',
        pincode: '201301',
        receiverName: 'Aman Sharma',
        phone: '9876543210'
      });
    } else if (preset === 'delhi') {
      setFormData({
        type: 'Office',
        flat: 'Tower B, 4th Floor',
        area: 'Connaught Place',
        city: 'New Delhi',
        pincode: '110001',
        receiverName: 'Aman Sharma',
        phone: '9876543210'
      });
    } else if (preset === 'bengaluru') {
      setFormData({
        type: 'Home',
        flat: 'House #45, 2nd Main',
        area: 'Koramangala 4th Block',
        city: 'Bengaluru',
        pincode: '560034',
        receiverName: 'Aman Sharma',
        phone: '9876543210'
      });
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}></div>
      
      <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1070 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            
            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Select Delivery Location
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsAddressModalOpen(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                
                {/* Quick Presets */}
                <div className="mb-3">
                  <label className="form-label small text-muted fw-bold">QUICK TEST PRESETS</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                      onClick={() => handleQuickFill('noida')}
                    >
                      🏡 Noida Home
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                      onClick={() => handleQuickFill('delhi')}
                    >
                      🏢 Delhi Office
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                      onClick={() => handleQuickFill('bengaluru')}
                    >
                      📍 Bengaluru
                    </button>
                  </div>
                </div>

                <hr />

                {/* Form Fields */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Address Type</label>
                  <div className="d-flex gap-3">
                    {['Home', 'Office', 'Other'].map((t) => (
                      <div key={t} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="addressType"
                          id={`type-${t}`}
                          checked={formData.type === t}
                          onChange={() => setFormData({ ...formData, type: t })}
                        />
                        <label className="form-check-input-label small" htmlFor={`type-${t}`}>
                          {t}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">House / Flat / Building</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.flat}
                      onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Street / Area / Sector</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold">Pincode</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold">Receiver Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.receiverName}
                      onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success btn-sm fw-bold px-3">
                  Save & Deliver Here
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};
