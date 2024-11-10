import { createContext, useEffect, useState, ReactNode } from "react";
import {
  doLoginLocalStorage,
  doLogoutLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn
} from "../services/auth.service";

interface UserContextProps {
  userData: any;
  isLogin: boolean;
  doLogin: (user: any, token: string, refreshToken: string) => void;
  doLogout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | null>(null);

function UserProvider({ children }: UserProviderProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Set login value and user data from local storage
    setIsLogin(isLoggedIn());
    setUserData(getUserFromLocalStorage());
  }, []);

  // Login function
  const doLogin = (user: any, token: string, refreshToken: string) => {
    // Set user data and token in local storage
    doLoginLocalStorage(user, token, refreshToken);

    // Set login value and user data in user context
    setIsLogin(true);
    setUserData(getUserFromLocalStorage());
  };

  // Logout function
  const doLogout = () => {
    // Remove user data and token from local storage
    doLogoutLocalStorage();

    // Remove login value and user data in user context
    setIsLogin(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLogin,
        doLogin,
        doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
