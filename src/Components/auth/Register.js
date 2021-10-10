import React from 'react'
import {connect} from "react-redux";
import {storePage} from "../../Actions";
import SignupForm from "../forms/SignupForm";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'

const Register = ()=>{
    return (
        <div className={'Register'}>
            {/* <h1 className={'text-center mt-5 content-center text-lg'}>Register</h1>
            <p className={'mt-3 rounded-md bg-red-200 text-md w-3/4 content-center text-center m-auto'}>{this.props.error ? this.props.error: null}</p> */}
            <ToastContainer/>
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

const mapStateToProps = state =>{
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps,{storePage})(Register)