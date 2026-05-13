import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: 'John Doe' }
  const [location, setLocation] = useState('Ahmedabad, Gujarat'); // Default mocked location
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bhook_lagi_hai_user');
    const savedLocation = localStorage.getItem('bhook_lagi_hai_location');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedLocation) setLocation(savedLocation);
  }, []);

  const login = (name) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem('bhook_lagi_hai_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bhook_lagi_hai_user');
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('bhook_lagi_hai_location', newLocation);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      location,
      updateLocation,
      isLocationModalOpen,
      setIsLocationModalOpen,
      isSignInModalOpen,
      setIsSignInModalOpen
    }}>
      {children}
    </UserContext.Provider>
  );
};
