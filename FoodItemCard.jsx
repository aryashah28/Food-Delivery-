import { Plus as PlusIcon, Check as CheckIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const FoodItemCard = ({ food }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(food);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const cartItem = cartItems.find(item => item.id === food.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="food-card animate-fade-in">
      <div className="food-img-wrapper">
        <img src={food.image} alt={food.name} className="food-img" loading="lazy" />
        <div className={`food-badge ${food.isVeg ? 'veg' : 'non-veg'}`}>
          <div style={{ 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            backgroundColor: food.isVeg ? '#0f8a65' : '#e43b4f' 
          }}></div>
          {food.isVeg ? 'VEG' : 'NON-VEG'}
        </div>                      
      </div>
      
      <div className="food-info">
        <h3 className="food-title">{food.name}</h3>
        <p className="food-desc">{food.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>
            ★ {food.rating} • {food.restaurant}
          </span>
        </div>
        
        <div className="food-meta">
          <div className="food-price">₹{food.price}</div>
          
          <button 
            className={`btn ${isAdded ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '8px 16px' }}
            onClick={handleAdd}
          >
            {isAdded ? (
              <><CheckIcon size={18} /> Added</>
            ) : quantityInCart > 0 ? (
              <>+ Add more ({quantityInCart})</>
            ) : (
              <><PlusIcon size={18} /> Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
