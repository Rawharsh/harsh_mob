import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    phone: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
