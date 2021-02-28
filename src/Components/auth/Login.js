import React from 'react'
import LoginForm from "../forms/LoginForm";

class Login extends React.Component {
    render() {
        return (
                <div className={'Login'}>
                    <LoginForm/>
                </div>
        )
    }
}

export default Login