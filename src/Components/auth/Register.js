import React from 'react';
import SignupForm from '../forms/SignupForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks';

const Register = ({ history }) => {
    const { signUp } = useAuth();

    const onSignup = async ({ name, email, password }) => {
        // TODO: showLoader
        const res = await signUp(name, email, password);
        console.log(res);
        if (res.status === 'error') {
            toast.error(res.message);
        } else {
            if (res.message) toast.success(res.message);
            history.push('/');
        }
    };

    return (
        <div className={'Register'}>
            <div className="content">
                <div className="logo">
                    <h1>Ticketrr</h1>
                </div>
                <h2>Create a new account</h2>
                <div className="form-container">
                    <SignupForm onFormSubmit={onSignup} />
                </div>
            </div>
            <div className="info">
                <p>Use the credentials below to sign in</p>

                <b>
                    <p> email: test@test.com</p>
                </b>
                <b>
                    <p> password: tryingoutdemo</p>
                </b>
                <p>
                    PS: It might take a while to spin up the backend, its free
                    hosting
                </p>
            </div>
        </div>
    );
};

export default Register;
