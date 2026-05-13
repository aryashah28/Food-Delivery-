import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { foodItems } from '../data/mockData';
import FoodItemCard from '../components/FoodItemCard';

const Search = () => {
  const [query, setQuery] = useState('');

  const filteredFoods = query.trim() === '' ? [] : foodItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.restaurant.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search for restaurants, cuisines or dishes..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '20px 20px 20px 60px',
              fontSize: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--border-color)',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
            autoFocus
          />
          <SearchIcon size={28} color="var(--text-light)" style={{ position: 'absolute', left: '20px' }} />
        </div>
      </div>

      {query && (
        <h2 style={{ marginBottom: '30px' }}>
          Search results for "<span className="text-primary">{query}</span>" ({filteredFoods.length})
        </h2>
      )}

      {filteredFoods.length > 0 ? (
        <div className="grid">
          {filteredFoods.map(food => (
            <FoodItemCard key={food.id} food={food} />
          ))}
        </div>
      ) : query.trim() !== '' ? (
        <div className="empty-state animate-fade-in" style={{ padding: '40px' }}>
          <SearchIcon size={60} color="var(--text-light)" />
          <h3>No matches found</h3>
          <p>Try searching for something else like "Pizza" or "Burger".</p>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
