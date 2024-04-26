import React, { createContext, useContext, useState } from "react";

type AppContextType = {};
export const AppContext = createContext<AppContextType>("");
export const useAppContext = () => useContext(AppContext);
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <AppContext.Provider value={isAuthenticated}>{children}</AppContext.Provider>;
};
