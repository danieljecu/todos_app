import "@reach/dialog/styles.css";
import React from "react";
import { Dialog } from "@reach/dialog";
import { Logo } from "../../components/logo";
import {
  Button,
  Input,
  Spinner,
  FormGroup,
  CircleButton,
} from "../../components/lib";
import { AuthService } from "services";
import { useCurrentUser } from "context/auth";
import { useNavigate } from "react-router-dom";

interface UserCredentialsFormDataType {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  buttonText: string;
}
function LoginForm({ onSubmit, buttonText }: LoginFormProps) {
  function handleSubmit(event: any): void {
    event.preventDefault();
    const [email, password] = event.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">email</label>
        <Input id="email" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <Button type="submit">{buttonText}</Button>
      <Spinner />
    </form>
  );
}

export const Login = () => {
  const [openModal, setOpenModal] = React.useState("none");

  const { accessToken, setAccessToken, setAuth } = useCurrentUser();
  let navigate = useNavigate();

  function login(formData: UserCredentialsFormDataType) {
    console.log("login", formData);
    AuthService.login(formData).then((response) => {
      console.log("login acc data", response.data.accessToken);
      localStorage.setItem("token", response.data.accessToken || "not set");
      setAccessToken(String(response.data.accessToken));
      setAuth(true);
      navigate("/");
      window.location.reload();
    });
    console.log("login result acctok=", accessToken);
  }
  function register(formData: UserCredentialsFormDataType) {
    console.log("register", formData);
    AuthService.register(formData).then((response) => {
      console.log("register", response.data);
      // setAccessToken(String(accessToken));
      navigate("/login");
    });
  }

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Todos app</h1>
      <Button
        onClick={() => {
          setOpenModal("login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          setOpenModal("register");
        }}
      >
        Register
      </Button>

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
            <LoginForm onSubmit={login} buttonText="Login" />
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
            <LoginForm onSubmit={register} buttonText="register" />
          </div>
        </Dialog>
      )}
    </>
  );
};
