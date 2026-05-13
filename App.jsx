import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import OfferBanner from './components/OfferBanner';
import OfferPopup from './components/OfferPopup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Modals from './components/Modals';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <OfferBanner />
            <OfferPopup />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            <Modals />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
