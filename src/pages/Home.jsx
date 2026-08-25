import React from 'react';
import { useShop } from '../context/ShopContext';
import { BannerSlider } from '../components/BannerSlider';
import { CategoryList } from '../components/CategoryList';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products, activeCategory, setActiveView } = useShop();

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const trendingProducts = products.slice(0, 8);
  const dairyProducts = products.filter((p) => p.category === 'dairy');
  const snackProducts = products.filter((p) => p.category === 'munchies' || p.category === 'drinks');

  return (
    <div className="container-fluid max-width-1200 py-3">
      
      {/* Banner Carousel */}
      <BannerSlider />

      {/* Category List */}
      <CategoryList />

      {/* Dynamic Products Grid based on Category selection */}
      {activeCategory !== 'all' ? (
        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="fw-bold m-0 text-capitalize">
              {activeCategory.replace('-', ' ')} ({filteredProducts.length})
            </h4>
          </div>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Section 1: Trending Now */}
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h4 className="fw-bold m-0">🔥 Trending Today</h4>
                <p className="text-muted small m-0">Fastest selling items delivered in 10 minutes</p>
              </div>
              <button
                className="btn btn-sm btn-link text-success fw-bold text-decoration-none"
                onClick={() => setActiveView('search')}
              >
                See All <i className="bi bi-chevron-right"></i>
              </button>
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
              {trendingProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Dairy, Bread & Eggs */}
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h4 className="fw-bold m-0">🥛 Dairy, Bread & Eggs</h4>
                <p className="text-muted small m-0">Fresh daily essentials for your breakfast</p>
              </div>
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
              {dairyProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Snacks & Drinks */}
          <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h4 className="fw-bold m-0">🍿 Snacks, Chips & Drinks</h4>
                <p className="text-muted small m-0">Crunchy munchies & chilled beverages</p>
              </div>
            </div>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
              {snackProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};
