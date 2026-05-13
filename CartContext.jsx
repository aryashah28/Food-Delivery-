import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('bhook_lagi_hai_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bhook_lagi_hai_cart', JSON.stringify(cartItems));
    
    // Reset coupon if items change and min order is not met
    if (selectedCoupon && getCartTotal() < selectedCoupon.minOrder) {
      setSelectedCoupon(null);
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedCoupon(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (coupon) => {
    if (getCartTotal() >= coupon.minOrder) {
      setSelectedCoupon(coupon);
      return { success: true, message: `Coupon ${coupon.code} applied!` };
    }
    return { success: false, message: `Minimum order ₹${coupon.minOrder} required for this coupon.` };
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
  };

  const calculateDiscount = () => {
    if (!selectedCoupon) return 0;
    
    const total = getCartTotal();
    if (selectedCoupon.discountType === 'percentage') {
      const discount = (total * selectedCoupon.discountValue) / 100;
      return selectedCoupon.maxDiscount ? Math.min(discount, selectedCoupon.maxDiscount) : discount;
    } else if (selectedCoupon.discountType === 'flat') {
      return selectedCoupon.discountValue;
    }
    return 0;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      selectedCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      applyCoupon,
      removeCoupon,
      calculateDiscount
    }}>
      {children}
    </CartContext.Provider>

  );
};
