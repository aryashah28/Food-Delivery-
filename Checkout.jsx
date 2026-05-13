import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, selectedCoupon, calculateDiscount } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = getCartTotal();
  const discount = calculateDiscount();
  const deliveryFee = total > 0 ? (selectedCoupon?.discountType === 'delivery' ? 0 : 40) : 0;
  const taxes = (total - discount) * 0.05;
  const grandTotal = total - discount + deliveryFee + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (cartItems.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const paymentOptions = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard size={20} />, description: 'Visa, Mastercard, RuPay' },
    { id: 'upi', name: 'UPI (GPay, PhonePe)', icon: <Smartphone size={20} />, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: <Building2 size={20} />, description: 'All major Indian banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={20} />, description: 'Pay when your food arrives' },
  ];

  return (
    <div className="container cart-page">
      <h1 style={{ marginBottom: '30px' }}>Checkout</h1>
      
      <div className="cart-layout">
        <div className="checkout-form animate-fade-in">
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>Delivery Address</h2>
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" required placeholder="+91 9876543210" pattern="[0-9]{10}" />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input type="text" required placeholder="Flat, House no., Building, Company, Apartment" />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>City</label>
                <input type="text" required placeholder="City" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" required placeholder="Pincode" />
              </div>
            </div>

            <h2 style={{ margin: '30px 0 20px', fontSize: '1.3rem' }}>Payment Method</h2>
            <div className="payment-options">
              {paymentOptions.map(option => (
                <div 
                  key={option.id} 
                  className={`payment-option-card ${paymentMethod === option.id ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(option.id)}
                >
                  <div className="payment-icon-wrapper">
                    {option.icon}
                  </div>
                  <div className="payment-info">
                    <div className="payment-name">{option.name}</div>
                    <div className="payment-desc">{option.description}</div>
                  </div>
                  <div className="payment-radio">
                    <div className={`radio-circle ${paymentMethod === option.id ? 'checked' : ''}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
        
        <div className="bill-details-wrapper animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="bill-details">
            <h3 className="bill-title">Order Summary</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span>{item.quantity} x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            {discount > 0 && (
              <div className="bill-row" style={{ color: 'var(--success-color)', fontSize: '0.9rem', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                <span>Coupon ({selectedCoupon.code})</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="bill-total" style={{ marginTop: '0', paddingTop: '15px' }}>
              <span>Total Amount</span>
              <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button 
              form="checkout-form"
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '20px', padding: '15px', fontSize: '1.1rem' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₹${grandTotal.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ textAlign: 'center' }}>
            <div className="success-icon" style={{ margin: '0 auto 20px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success-color)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={40} />
            </div>
            <h2 style={{ marginBottom: '10px' }}>Order Placed Successfully!</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
              Your food is being prepared and will be delivered soon.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>
              Redirecting to home page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
