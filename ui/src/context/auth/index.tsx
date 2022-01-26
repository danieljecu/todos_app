import React, { useState, useContext } from "react";

// import { login, logout, register } from "services/userService";

const AuthContext = React.createContext<IAuthContext | null>(null);

interface IAuthContext {
  auth: boolean;
  setAuth: (value: boolean) => void;
  accessToken: string;
  setAccessToken: (value: string) => void;
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
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: "",
};

const localStorageKey = "__auth_provider_token__";
// function handleUserResponse({ accessToken, refreshToken }) {
//   window.localStorage.setItem(localStorageKey, accessToken);
// }

// const handleLogin = ({ email, password }) => {
//   return login({ email, password }).then(({ accessToken, refreshToken }) => {
//     console.log("accessToken", accessToken);));
// }; // make a login request

// const handleRedister = () => {
//   return register({ username, password }).then(handleUserResponse);
// }; // register the user
// const handleLogout = async () => {
//   window.localStorage.removeItem(localStorageKey);
// }; // clear the token in localStorage and the user data

const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  //init from localStorage
  const [accessToken, setAccessToken] = useState(initialUser.accessToken);

  const [auth, setAuth] = useState<boolean>(true);
  console.log("context", process.env.accessToken);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useCurrentUser };
