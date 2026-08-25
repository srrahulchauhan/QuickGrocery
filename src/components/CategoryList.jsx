import React from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategoryList = () => {
  const { activeCategory, setActiveCategory, setActiveView } = useShop();

  const handleSelect = (catId) => {
    setActiveCategory(catId);
  };

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="fw-bold m-0" style={{ fontSize: '1.05rem' }}>
          Explore Categories
        </h5>
        <span
          className="text-success cursor-pointer fw-semibold"
          style={{ fontSize: '0.82rem', cursor: 'pointer' }}
          onClick={() => setActiveView('search')}
        >
          View All <i className="bi bi-chevron-right"></i>
        </span>
      </div>

      <div className="d-flex gap-2 overflow-auto py-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill d-flex align-items-center gap-2 ${
              activeCategory === cat.id ? 'active' : ''
            }`}
            onClick={() => handleSelect(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
