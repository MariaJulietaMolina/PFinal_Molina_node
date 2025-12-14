import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('authUser');
    if (token && username) setUser(username);
  }, []);

  const login = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
