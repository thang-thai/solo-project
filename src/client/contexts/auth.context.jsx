import { createContext, useState } from 'react';
import React from 'react';

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
