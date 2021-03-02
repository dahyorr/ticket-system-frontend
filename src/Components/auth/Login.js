import React from 'react'
import LoginForm from "../forms/LoginForm";
import {connect} from 'react-redux'
import {storePage} from "../../Actions";

class Login extends React.Component {
    componentDidMount() {
        this.props.storePage('Login')
    }
    render() {
        return (
                <div className={'Login px-20'}>
                    <p className={'mt-8 rounded-md bg-red-200 text-md w-1/2 content-center text-center m-auto'}>{this.props.error ? this.props.error: null}</p>
                    <LoginForm/>
                </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        error: state.auth.error
    }
}
export default connect(mapStateToProps, {storePage})(Login)