import React from 'react'
import SignupForm from "../forms/SignupForm";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const Register = ()=>{
    return (
        <div className={'Register'}>
            <div className="content">
                <div className="logo"><h1>Ticketrr</h1></div>
                <h2>Create a new account</h2>
                <div className="form-container">
                    <SignupForm toast={toast}/>
                </div>
            </div>
            
        </div>
    )
}

export default Register