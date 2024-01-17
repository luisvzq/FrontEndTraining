import React from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const authContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [context, setContext] = useLocalStorage();
  return (
    <authContext.Provider value={[context, setContext]}>
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
