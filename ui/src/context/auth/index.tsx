import React, { useState, useContext } from "react";
import { useLocalStorageState } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthService, TokenService } from "../../services";

const AuthContext = React.createContext<IAuthContext | null>(null);
interface UserCredentialsFormDataType {
  email: string;
  password: string;
}

interface IAuthContext {
  auth: boolean;
  setAuth: (value: boolean) => void;
  accessToken: string | null;
  setAccessToken: (value: string) => void;
  logout?: () => void;
  // handleLogin: (formData: UserCredentialsFormDataType) => void;
  // handleRegister: (formData: UserCredentialsFormDataType) => void;
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
  const [auth, setAuth] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState(() => {
    let val = localStorage.getItem("accessToken") || "not set";
    if (val === "not set") {
      setAuth(false);
    }
    // console.log("set initial context", val);
    return val;
  });

  const logout = () => {
    setAccessToken("");
    setAuth(false);
    console.log("logout");
    // AuthService.logout(initialUser.refreshToken);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        accessToken,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useCurrentUser };
