import { createContext, useState } from "react";

export const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  return (
    <ModeContext.Provider value={{ dark, setDark }}>
      {children}
    </ModeContext.Provider>
  );
};
