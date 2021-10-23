import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import LoginForm from "../forms/LoginForm";
import {useAuth} from '../../hooks'

const Login = ({history,location}) => {
    const queryString = location.search;
    const sp = new URLSearchParams(queryString);
    const next = sp.get('next')
    console.log(next)
    const {logIn} = useAuth() 

    const onLogin = async ({email, password}) => {
        // TODO: showLoader
        const res = await logIn(email, password)
        if (res.status === 'error'){
            toast.error(res.message)
        }
        else{
            history.push(next || '/')
        }
    }

    return (
            <div className={'Login'}>
                <div className="content">
                    <div className="logo"><h1>Ticketrr</h1></div>
                    <h2>Sign in to your account</h2>
                    <div className="form-container">
                        <LoginForm onFormSubmit={onLogin}/>
                    </div>
                </div>
            </div>
    )
}

export default (Login)