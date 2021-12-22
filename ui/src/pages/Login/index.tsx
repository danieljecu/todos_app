import '@reach/dialog/styles.css'
import React from 'react';
import {Dialog} from '@reach/dialog';

import {Logo} from '../../components/logo';
import {Button, Input, FormGroup} from '../../components/lib';


interface FormDataType {
    username: string;
    password: string;
}
interface LoginFormProps {
    onSubmit: (formData: {username: string, password: string}) => void;
    buttonText: string;
}
function LoginForm({onSubmit, buttonText}: LoginFormProps){
    function handleSubmit(event : any): void{
        event.preventDefault();
        const [username, password] = event.target.elements;
        onSubmit({
            username: username.value,
            password: password.value
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username</label>
                <Input id="username" type="text" />
            </div>
            <div>
            <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    )
}
function Login() {
    const [openModal, setOpenModal] = React.useState("none");

    function login(formData: FormDataType){
        console.log("login",formData);
    }
    function register(formData: FormDataType) {
        console.log("register",formData);
    }

    return(<>
    <Logo width="80" height="80"/>
    <h1>Bookshelf</h1>
    <Button onClick={()=>{setOpenModal("login")}}>Login</Button> 
    <Button onClick={()=>{setOpenModal("register")}}>Register</Button>

    {openModal === 'login' && 
    <Dialog aria-label='login form' isOpen={openModal === 'login'}>
        <div>
            <Button onClick={()=> {setOpenModal('none')}}>Close</Button>
            <LoginForm onSubmit={login} buttonText="Login" />
        </div>
    </Dialog>}
    {openModal === 'register' && <Dialog aria-label='register form' isOpen={openModal === 'register'}>
        <div>
            <Button onClick={()=> {setOpenModal('none')}}>Close</Button>
            <LoginForm onSubmit={register} buttonText="register" />
        </div>
    </Dialog>}
    </>);
}

export default Login;