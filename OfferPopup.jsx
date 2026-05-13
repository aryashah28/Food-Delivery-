import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import './OfferPopup.css';

const OfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={() => setIsVisible(false)}>
      <div className="popup-content animate-pop-in" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setIsVisible(false)}>
          <X size={24} />
        </button>
        <div className="popup-icon">
          <Gift size={50} />
        </div>
        <h2>Special Welcome Offers!</h2>
        <p className="offer-code">Use Code: <span>WELCOME100</span></p>
        <p className="offer-desc">Flat ₹100 OFF on your first order above ₹500</p>
        <div className="popup-items">
          <h3>Try Our Best Sellers:</h3>
          <ul>
            <li>🍱 Punjabi Deluxe Thali</li>
            <li>🥤 Belgium Chocolate Shake</li>
            <li>🌯 Veg Kebab Roll</li>
            <li>🥪 Paneer Tikka Sandwich</li>
          </ul>
        </div>
        <button className="btn btn-primary" onClick={() => setIsVisible(false)}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default OfferPopup;
