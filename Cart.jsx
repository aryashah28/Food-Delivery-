import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Ticket, X, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/mockData';
import { useState } from 'react';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    selectedCoupon,
    applyCoupon,
    removeCoupon,
    calculateDiscount
  } = useCart();
  const navigate = useNavigate();
  const [showCoupons, setShowCoupons] = useState(false);
  const [couponError, setCouponError] = useState('');

  const total = getCartTotal();
  const discount = calculateDiscount();
  const deliveryFee = total > 0 ? (selectedCoupon?.discountType === 'delivery' ? 0 : 40) : 0;
  const taxes = (total - discount) * 0.05; // 5% GST on discounted total
  const grandTotal = total - discount + deliveryFee + taxes;

  const handleApplyCoupon = (coupon) => {
    const result = applyCoupon(coupon);
    if (result.success) {
      setShowCoupons(false);
      setCouponError('');
    } else {
      setCouponError(result.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container cart-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <ShoppingBag size={80} color="var(--text-light)" style={{ marginBottom: '20px', opacity: 0.5 }} />
        <h2 style={{ marginBottom: '10px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>You can go to home page to view more restaurants</p>
        <Link to="/" className="btn btn-primary">See Restaurants Near You</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 style={{ marginBottom: '30px' }}>Secure Checkout</h1>

      <div className="cart-layout">
        <div className="cart-items-wrapper">
          <div className="cart-items animate-fade-in">
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Items in Cart</h2>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>{item.restaurant}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>

                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div style={{ fontWeight: '700', fontSize: '1.1rem', minWidth: '80px', textAlign: 'right' }}>
                  ₹{item.price * item.quantity}
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="offers-section animate-fade-in" style={{ animationDelay: '0.1s', marginTop: '20px' }}>
            <div className="offer-card" onClick={() => setShowCoupons(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Ticket color="var(--primary-color)" />
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {selectedCoupon ? `Coupon "${selectedCoupon.code}" Applied` : 'Apply Coupon'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    {selectedCoupon ? selectedCoupon.description : 'Save more with available offers'}
                  </div>
                </div>
              </div>
              {selectedCoupon ? (
                <button
                  className="remove-coupon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCoupon();
                  }}
                >
                  <X size={16} />
                </button>
              ) : (
                <ChevronRight size={20} color="var(--text-light)" />
              )}
            </div>
          </div>
        </div>

        <div className="bill-details-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bill-details">
            <h3 className="bill-title">Bill Details</h3>

            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="bill-row" style={{ color: 'var(--success-color)' }}>
                <span>Coupon Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="bill-row">
              <span>Delivery Fee</span>
              {selectedCoupon?.discountType === 'delivery' ? (
                <span style={{ color: 'var(--success-color)' }}>FREE</span>
              ) : (
                <span>₹{deliveryFee.toFixed(2)}</span>
              )}
            </div>

            <div className="bill-row">
              <span>Taxes and Charges</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

            <div className="bill-total">
              <span>To Pay</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Coupons Modal */}
      {showCoupons && (
        <div className="modal-overlay" onClick={() => setShowCoupons(false)}>
          <div className="modal-content coupon-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Available Coupons</h2>
              <button className="close-btn" onClick={() => setShowCoupons(false)}><X size={24} /></button>
            </div>

            {couponError && (
              <div className="error-banner" style={{ marginBottom: '15px' }}>
                {couponError}
              </div>
            )}

            <div className="coupon-list">
              {coupons.map(coupon => {
                const isDisabled = total < coupon.minOrder;
                const isApplied = selectedCoupon?.id === coupon.id;

                return (
                  <div
                    key={coupon.id}
                    className={`coupon-item ${isDisabled ? 'disabled' : ''} ${isApplied ? 'applied' : ''}`}
                  >
                    <div className="coupon-icon">{coupon.icon}</div>
                    <div className="coupon-info">
                      <div className="coupon-header">
                        <span className="coupon-code">{coupon.code}</span>
                        {!isDisabled && !isApplied && (
                          <button
                            className="apply-text-btn"
                            onClick={() => handleApplyCoupon(coupon)}
                          >
                            APPLY
                          </button>
                        )}
                        {isApplied && (
                          <span className="applied-badge"><Check size={14} /> APPLIED</span>
                        )}
                      </div>
                      <div className="coupon-desc">{coupon.description}</div>
                      {isDisabled && (
                        <div className="min-order-msg">
                          Add ₹{(coupon.minOrder - total).toFixed(0)} more to avail this offer
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
