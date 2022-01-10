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

interface FormDataType {
  username: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (formData: { username: string; password: string }) => void;
  buttonText: string;
}
function LoginForm({ onSubmit, buttonText }: LoginFormProps) {
  function handleSubmit(event: any): void {
    event.preventDefault();
    const [username, password] = event.target.elements;
    onSubmit({
      username: username.value,
      password: password.value,
    });
  }
  return (
    <form
      // css={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'stretch',
      //   '> div': {
      //     margin: '10px auto',
      //     width: '100%',
      //     maxWidth: '300px',
      //   },
      // }}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" type="text" />
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

  function login(formData: FormDataType) {
    console.log("login", formData);
  }
  function register(formData: FormDataType) {
    console.log("register", formData);
  }

  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
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
