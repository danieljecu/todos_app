import React, { useState, useContext } from "react";
import { useLocalStorageState } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthService, TokenService } from "../../services";

// import { login, logout, register } from "services/userService";
import { IUserDetails } from "interfaces";

const AuthContext = React.createContext<IAuthContext | null>(null);
interface UserCredentialsFormDataType {
  email: string;
  password: string;
}

interface IAuthContext {
  user: any | null;
  auth: boolean;
  setAuth: (value: boolean) => void;
  accessToken: string | null;
  setAccessToken: (value: string) => void;
  logout: () => void;
  login: (formData: UserCredentialsFormDataType) => void;
  register: (formData: UserCredentialsFormDataType) => void;
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

async function getUser() {
  let userData: IUserDetails | null = null;

  const token = await TokenService.getLocalAccessToken();
  if (token) {
    userData = await TokenService.getUser();
  }
  console.log("user get user", userData);

  return userData;
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<IUserDetails | null>(null);
  const [auth, setAuth] = useState<boolean>(true);
  const [error, setError] = useState<string>("test error");
  const [accessToken, setAccessToken] = useState(() => {
    let val = localStorage.getItem("accessToken") || "not set";
    if (val === "not set") {
      setAuth(false);
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

  console.log("user 1", user);

  const handleLogin = async ({
    email,
    password,
  }: UserCredentialsFormDataType) => {
    AuthService.login({ email, password }).then(({ data }) => {
      console.log("accessToken", data.accessToken);
      console.log("refreshToken", data.refreshToken);
      // console.log("user", data.user);

      setUser(data.user);
      // console.error("error",err)
      setAuth(true);
    });
    // .then(handleUserResponse);
  };
  const handleRegister = async (formData: UserCredentialsFormDataType) =>
    AuthService.register(formData).then((res) => setUser(res.data?.user));
  // .then(handleUserResponse);

  const logout = () => {
    setAccessToken("");
    setAuth(false);
    console.log("logout");
    AuthService.logout(); // calls tokenService to remove user data from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        setAuth,
        accessToken,
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
