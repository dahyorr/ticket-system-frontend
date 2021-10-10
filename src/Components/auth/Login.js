import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import LoginForm from "../forms/LoginForm";

class Login extends React.Component {
    render() {
        return (
                <div className={'Login'}>
                    <ToastContainer/>
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
}

export default (Login)