import { css } from "@emotion/css";

import "@reach/dialog/styles.css";
import React from "react";
import { Dialog } from "@reach/dialog";
import { Logo } from "../../components/logo";
import { Spinner, FormGroup, CircleButton } from "../../components/lib";
import { TextField } from "@mui/material";
import { display } from "@mui/system";
import Button from "@mui/material/Button";
import { AxiosResponse } from "axios";
import { IUserSession } from "interfaces/users";
import { toast } from "react-toastify";

interface UserCredentialsFormDataType {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (formData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }) => void;
  buttonText: string;
}
const LoginForm = ({ onSubmit, buttonText }: LoginFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
        <TextField variant="filled" label={"Email"} id="email" type="text" />

        <TextField
          style={{ marginBottom: "10px" }}
          variant="filled"
          label={"Password"}
          id="password"
          type="password"
        />
      </FormGroup>
      <Button variant="contained" type="submit">
        {buttonText}
      </Button>

      {isLoading ? <Spinner style={{ marginLeft: 5 }} /> : null}
    </form>
  );
};

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
    const loginToastId = toast.loading("Please wait...", {
      closeButton: true,
    });

    login(formData)
      .then((response) => {
        toast.update(loginToastId, {
          render: `Hello ${response.data.user.email}`,
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: 3000,
          icon: "🟢",
        });
      })
      .catch((err) => {
        toast.update(loginToastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        if (err.response.status === 401) {
          toast.warn(JSON.stringify(err.response.data));
        }
      });
  };

  const handleRegister = (formData: UserCredentialsFormDataType) => {
    const registerToastId = toast.loading("Please wait...", {
      closeButton: true,
    });

    register(formData)
      .then((response) => {
        toast.update(registerToastId, {
          render: `Hello ${response.data.user.email}`,
          type: "success",
          autoClose: 3000,
          isLoading: false,
          closeButton: true,
          icon: "🟢",
        });
        return login(formData);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.update(registerToastId, {
            render: err.response.data.error,
            type: "error",
            autoClose: 3000,
            isLoading: false,
            closeButton: true,
            icon: "🔴",
          });
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
        <Dialog
          style={{ borderRadius: "4px" }}
          aria-label="login form"
          isOpen={openModal === "login"}
        >
          <CircleButton
            onClick={() => {
              setOpenModal("none");
            }}
          >
            Close
          </CircleButton>
          <LoginForm onSubmit={handleLogin} buttonText="Login" />
        </Dialog>
      )}
      {openModal === "register" && (
        <Dialog
          style={{ borderRadius: "4px" }}
          aria-label="register form"
          isOpen={openModal === "register"}
        >
          <div>
            <CircleButton
              style={{ display: "flex", justifyContent: "flex-end" }}
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
