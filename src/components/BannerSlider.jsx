import React, { useState } from 'react';
import { BANNERS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveCategory } = useShop();

  return (
    <div className="mb-4">
      <div
        className="banner-card text-white position-relative overflow-hidden"
        style={{
          background: BANNERS[currentSlide].bg,
          minHeight: '160px',
          borderRadius: '16px'
        }}
      >
        <div className="row align-items-center h-100">
          <div className="col-12 col-md-8">
            <h3 className="fw-extrabold mb-1" style={{ fontSize: '1.4rem' }}>
              {BANNERS[currentSlide].title}
            </h3>
            <p className="mb-3 opacity-90" style={{ fontSize: '0.88rem' }}>
              {BANNERS[currentSlide].subtitle}
            </p>
            <button
              className="btn btn-light btn-sm fw-bold px-3 text-dark rounded-pill"
              onClick={() => setActiveCategory('all')}
            >
              {BANNERS[currentSlide].btnText} <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="position-absolute bottom-0 end-0 p-3 d-flex gap-2">
          {BANNERS.map((banner, index) => (
            <span
              key={banner.id}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
