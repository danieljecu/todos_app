import { css } from "@emotion/css";

import "@reach/dialog/styles.css";
import React from "react";
import { Dialog } from "@reach/dialog";
import { Logo } from "../../components/logo";
import { Input, Spinner, FormGroup, CircleButton } from "../../components/lib";
import { display } from "@mui/system";
import Button from "@mui/material/Button";
import { AxiosResponse } from "axios";
import { IUserSession } from "interfaces/users";

interface UserCredentialsFormDataType {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  buttonText: string;
}
function LoginForm({ onSubmit, buttonText }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(event: any): void {
    setIsLoading(true);
    event.preventDefault();
    const [email, password] = event.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
    setIsLoading(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <Button variant="contained" type="submit">
        {buttonText}
      </Button>
      {isLoading ? <Spinner style={{ marginLeft: 5 }} /> : null}
    </form>
  );
}

interface LoginPropsInterface {
  login: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
  register: (
    formData: UserCredentialsFormDataType
  ) => Promise<AxiosResponse<IUserSession>>;
}

export const Login = ({ login, register }: LoginPropsInterface) => {
  const [openModal, setOpenModal] = React.useState("none");
  const [error, setError] = React.useState("");

  const handleLogin = (formData: UserCredentialsFormDataType) => {
    console.log("login", formData);

    login(formData)
      .then((response) => {
        console.log("login acc data", response.data.accessToken);
      })
      .catch((err) => {
        console.log("err", err.response);
        if (err.response.status === 401) {
          alert(JSON.stringify(err.response.data));
        }
      });
  };

  const handleRegister = (formData: UserCredentialsFormDataType) => {
    console.log("register", formData);
    register(formData)
      .then((response) => {
        console.log("register acc data", response.data);
        return login(formData);
      })
      .catch((err) => {
        console.log("err", err.response);
        if (err.response.status === 409) {
          alert(err.response.data.error);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <Logo width="80" height="80" />
      <h1>Todos app</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenModal("login");
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenModal("register");
          }}
        >
          Register
        </Button>
      </div>
      {openModal === "login" && (
        <Dialog aria-label="login form" isOpen={openModal === "login"}>
          <div>
            <CircleButton
              onClick={() => {
                setOpenModal("none");
              }}
            >
              Close
            </CircleButton>
            <LoginForm onSubmit={handleLogin} buttonText="Login" />
          </div>
        </Dialog>
      )}
      {openModal === "register" && (
        <Dialog aria-label="register form" isOpen={openModal === "register"}>
          <div>
            <CircleButton
              onClick={() => {
                setOpenModal("none");
              }}
            >
              Close
            </CircleButton>
            <LoginForm onSubmit={handleRegister} buttonText="register" />
          </div>
        </Dialog>
      )}
    </div>
  );
};
