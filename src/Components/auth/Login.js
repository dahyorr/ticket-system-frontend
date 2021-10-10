import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import LoginForm from "../forms/LoginForm";

const Login = () => {
    return (
            <div className={'Login'}>
                <div className="content">
                    <div className="logo"><h1>Ticketrr</h1></div>
                    <h2>Sign in to your account</h2>
                    <div className="form-container">
                        <LoginForm toast={toast}/>
                    </div>
                </div>
            </div>
    )
}

export default (Login)