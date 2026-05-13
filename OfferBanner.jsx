import React from 'react';
import './OfferBanner.css';

const OfferBanner = () => {
  const offers = [
    "🔥 50% OFF on your first order! Use code: BHOOK50",
    "🍱 Try our new Punjabi Deluxe Thali at ₹350!",
    "🚚 FREE Delivery on orders above ₹300!",
    "🥗 Healthy & Fresh Salads starting at ₹180",
    "🥤 Refreshing Shakes starting at ₹120",
    "🌯 Delicious Rolls & Parathas now available!",
    "🥪 Quick & Tasty Sandwiches for your snack time!"
 ];

  return (
    <div className="offer-banner">
      <div className="banner-content">
        {offers.map((offer, index) => (
          <span key={index} className="offer-item">
            {offer} <span className="separator">•</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {offers.map((offer, index) => (
          <span key={`dup-${index}`} className="offer-item">
            {offer} <span className="separator">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
