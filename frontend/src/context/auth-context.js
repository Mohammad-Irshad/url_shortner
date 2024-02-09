// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Implement your login logic here
    setUser(userData);
    setAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
