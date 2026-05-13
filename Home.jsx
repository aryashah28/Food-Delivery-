import { useState } from 'react';
import { ChevronRight, Filter } from 'lucide-react';
import { foodCategories, foodItems } from '../data/mockData';
import FoodItemCard from '../components/FoodItemCard';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFoods = foodItems.filter(item => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1>Feeling Hungry? <br /><span className="text-primary animated-bhookh">Bhookh Lagi Hai?</span></h1>
            <h2 className="order-now-text">ORDER NOW..</h2>
            <p>Order food from favourite restaurants near you. Fast delivery, fresh food, and great discounts specially tailored for you!</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>
                Explore Menu <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="hero-blob"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
              alt="Delicious Food"
              className="hero-image"
            />
            <div className="floating-badge badge-1">
              <span className="star">⭐</span> 4.0+ Rated
            </div>
            <div className="floating-badge badge-2">
              🚀 Fastest Delivery
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="filters-section container" id="menu">
        <div className="filters-header">
          <h2 className="section-title">
            {activeCategory === 'All' ? 'Popular Near You' : `${activeCategory} Options`}
            <span className="count-badge">{filteredFoods.length} Items </span>
          </h2>

          <div className="type-filters" style={{ border: '1px solid #0f8a65', background: '#e6f6eb', padding: '10px 20px', borderRadius: '30px' }}>
            <span style={{ color: '#0f8a65', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="dot dot-veg"></span> 100% Pure Veg
            </span>
          </div>
        </div>

        <div className="filter-scroll">
          {foodCategories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.name)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section container">
        {filteredFoods.length > 0 ? (
          <div className="grid">
            {filteredFoods.map(food => (
              <FoodItemCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="empty-state animate-fade-in">
            <Filter size={60} color="var(--text-light)" />
            <h3>No items found</h3>
            <p>Try selecting a different category.</p>
            <button className="btn btn-outline" onClick={() => setActiveCategory('All')}>
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
