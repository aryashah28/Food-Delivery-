import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, UtensilsCrossed, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, location, setIsLocationModalOpen, setIsSignInModalOpen, logout } = useUser();
  const routerLocation = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link to="/" className="logo">
            <UtensilsCrossed size={32} />
            <span>BHOOKH LAGI HAI?</span>
          </Link>

          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-light)', fontSize: '0.9rem' }}
            onClick={() => setIsLocationModalOpen(true)}
            title="Change Location"
          >
            <MapPin size={18} color="var(--primary-color)" />
            <span style={{ fontWeight: '600', color: 'var(--text-dark)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {location}
            </span>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="nav-links">
          <Link to="/" className={`nav-item ${routerLocation.pathname === '/' ? 'text-primary font-bold' : ''}`}>
            Home
          </Link>
          <div
            className={`nav-item ${routerLocation.pathname === '/search' ? 'text-primary font-bold' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/search')}
          >
            <Search size={20} />
            <span>Search</span>
          </div>

          {user ? (
            <div className="nav-item" style={{ cursor: 'pointer' }} onClick={logout} title="Click to Logout">
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
            </div>
          ) : (
            <div className="nav-item" style={{ cursor: 'pointer' }} onClick={() => setIsSignInModalOpen(true)}>
              <User size={20} />
              <span>Sign In</span>
            </div>
          )}

          <Link to="/cart" className={`nav-item ${routerLocation.pathname === '/cart' ? 'text-primary font-bold' : ''}`}>
            <div className="cart-icon-wrapper">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
