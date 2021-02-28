import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import history from "../../history";
import {storePath} from "../../Actions";

const ProtectedRoute =({storePath, component: Component, isSignedIn, ...rest}) => {
    const redirectLogin = () =>{
        storePath(history.location.pathname)
        return <Redirect to={"/login"}/>
    }
    return (
        <Route {...rest} render={(props) =>
            isSignedIn ? (<Component {...props}/>) : (redirectLogin())
        }
        />
    );
}

const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {storePath})(ProtectedRoute)