import React from "react";
import PropTypes from "prop-types";
import { useLocalStorageToken } from "../hooks/useLocalStorageToken";

export const authContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [tokenState, setTokenState] = useLocalStorageToken("token");
  return (
    <authContext.Provider value={[tokenState, setTokenState]}>
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
