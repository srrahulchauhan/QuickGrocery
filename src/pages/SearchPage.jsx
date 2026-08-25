import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/products';

export const SearchPage = () => {
  const { products, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useShop();
  const [sortBy, setSortBy] = useState('relevance');

  // Filter logic
  let results = products.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="container-fluid max-width-1200 py-3">
      
      {/* Search Header Controls */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-center">
          
          <div className="col-12 col-md-6">
            <h4 className="fw-bold mb-1">
              {searchQuery ? `Results for "${searchQuery}"` : 'Browse & Search Products'}
            </h4>
            <p className="text-muted small mb-0">
              Found {results.length} item{results.length === 1 ? '' : 's'} matching your search criteria
            </p>
          </div>

          <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end gap-2">
            
            {/* Category Select Filter */}
            <select
              className="form-select form-select-sm w-auto"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>

            {/* Sort Select */}
            <select
              className="form-select form-select-sm w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

        </div>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {results.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">🔎</div>
          <h5 className="fw-bold">No products found</h5>
          <p className="text-muted small mb-4">
            Try searching for something else like "milk", "onion", "chips", or "atta".
          </p>
          <button
            className="btn btn-outline-success fw-bold rounded-pill px-4"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
