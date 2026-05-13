import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { MapPin, User, X } from 'lucide-react';

const Modals = () => {
  const {
    isLocationModalOpen, setIsLocationModalOpen, location, updateLocation,
    isSignInModalOpen, setIsSignInModalOpen, login
  } = useUser();

  const [locInput, setLocInput] = useState(location);
  const [nameInput, setNameInput] = useState('');

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locInput.trim()) {
      updateLocation(locInput);
      setIsLocationModalOpen(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      login(nameInput);
      setIsSignInModalOpen(false);
    }
  };

  return (
    <>
      {isLocationModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
            <button style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={() => setIsLocationModalOpen(false)}>
              <X size={24} />
            </button>
            <div className="success-icon" style={{ backgroundColor: 'rgba(252, 128, 25, 0.1)', color: 'var(--primary-color)' }}>
              <MapPin size={40} />
            </div>
            <h2 style={{ marginBottom: '10px' }}>Set Your Location</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
              Where do you want your food delivered?
            </p>
            <form onSubmit={handleLocationSubmit} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <input
                  type="text"
                  value={locInput}
                  onChange={(e) => setLocInput(e.target.value)}
                  placeholder="e.g. Bandra, Mumbai"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Location</button>
            </form>
          </div>
        </div>
      )}

      {isSignInModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSignInModalOpen(false)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
            <button style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={() => setIsSignInModalOpen(false)}>
              <X size={24} />
            </button>
            <div className="success-icon" style={{ backgroundColor: 'rgba(252, 128, 25, 0.1)', color: 'var(--primary-color)' }}>
              <User size={40} />
            </div>
            <h2 style={{ marginBottom: '10px' }}>Sign In</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
              Enter your name to continue
            </p>
            <form onSubmit={handleLoginSubmit} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
