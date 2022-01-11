import React, { useState, useContext } from "react";

const AuthContext = React.createContext<IAuthContext | null>(null);

interface IAuthContext {
  auth: boolean;
  setAuth: (value: boolean) => void;
  // TODO add authentication
  // isAuthLoading: boolean;
  // userSession: IUserSession;
  // updateUserSession: (userSession: IUserSession) => void;
  // clearUserSession: () => void;
}

const useCurrentUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useCurrentUser must ve used inside the AuthContext.Provider"
    );
  }
  return context;
};

const initialUser = {
  firstName: "Daniel",
  lastName: "J",
  email: "cj@example.com",
  accessToken: "",
  refreshToken: "",
};

const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [userState, setUserState] = useState(initialUser);

  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useCurrentUser };
