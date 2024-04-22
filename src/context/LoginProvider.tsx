import { createContext, useContext, useState } from 'react';
import {LoginContextType} from "../types";

const LoginContext = createContext<LoginContextType>( {
  isLoggedIn: false,
});

const LoginProvider = ({ children }:any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{ 
        isLoggedIn, 
        setIsLoggedIn, 
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
