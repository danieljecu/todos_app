import React, { useState, useContext } from "react";
import { useLocalStorageState } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthService, TokenService } from "../../services";
import { AxiosResponse } from "axios";

// import { login, logout, register } from "services/userService";
import { IUserDetails } from "interfaces";
import { IUserSession } from "interfaces/users";

// TokenService in Local Storage to persist the access token, maybe the user too
// AuthService is the service that handles the login and register
// AuthProvider is the context provider that holds the auth state

// where do you handle user response from the server at context level (authprovider)?
// (AuthService)

const AuthContext = React.createContext<IAuthContext | null>(null);
interface UserCredentialsFormDataType {
  email: string;
  password: string;
}

function handleUserResponse(response: AxiosResponse<IUserSession>) {
  TokenService.setAccessToken(response.data.accessToken || "");
  TokenService.setRefreshToken(response.data.refreshToken || "");
  TokenService.setUser(response.data.user || "");
  return response;
}

interface IAuthContext {
  user: any | null;
  // accessToken: string | null;
  setAccessToken: (value: string) => void;
  logout: () => void;
  login: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
  register: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
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

async function getUser() {
  let userData: IUserDetails | null = null;

  const token = TokenService.getLocalAccessToken();
  if (token) {
    userData = await TokenService.getUser();
  }

  return userData;
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<IUserDetails | null>(null);
  const [error, setError] = useState<string>("test error");
  const [accessToken, setAccessToken] = useState(() => {
    let val = localStorage.getItem("accessToken") || "not set";
    if (val === "not set") {
      setUser(null);
    }
    // console.log("set initial context", val);
    return val;
  });

  React.useEffect(() => {
    getUser().then((userData) =>
      setUser((ps) => {
        console.log("set user", ps, userData);
        return userData;
      })
    );
  }, []);

  const handleLogin = async ({
    email,
    password,
  }: UserCredentialsFormDataType) =>
    AuthService.login({ email, password })
      .then(handleUserResponse)
      .then((response) => {
        // setAccessToken(response.data.accessToken || "");
        setUser(response.data?.user);
        return response;
      });

  const handleRegister = async (formData: UserCredentialsFormDataType) =>
    AuthService.register(formData)
      .then(handleUserResponse)
      .then((response) => {
        // setAccessToken(response.data.accessToken || "");
        setUser(response.data?.user);
        return response;
      });

  const logout = () => {
    setAccessToken("");
    setUser(null);
    console.log("logout");
    AuthService.logout(); // calls tokenService to remove user data from localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        // accessToken,
        setAccessToken,
        logout,
        login: handleLogin,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useCurrentUser };
