import { useEffect, useState } from "react";

export const useLocalStorageToken = (token) => {
  const localStorageValue = localStorage.getItem(token);
  const [tokenState, setTokenState] = useState(
    localStorageValue ? JSON.parse(localStorageValue) : null
  );
  useEffect(() => {
    if (tokenState) {
      localStorage.setItem(token, JSON.stringify(tokenState));
    }
  }, [token, tokenState]);

  return [tokenState, setTokenState];
};
export default useLocalStorageToken;

//--------------------------------------------

// const useLocalStorage = () => {
//   const getSessionParameter = (key) => {
//     const localStorageValue = localStorage.getItem(key);
//     return localStorageValue;
//   };
//   const setSessionParameter = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
//   };
//   const clearSessionParameter = (key) => {
//     localStorage.removeItem(key);
//   };
//   return [getSessionParameter, setSessionParameter, clearSessionParameter];
// };
// export default useLocalStorage;
