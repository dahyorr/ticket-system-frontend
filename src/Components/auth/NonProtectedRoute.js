import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'

const NonProtectedRoute =({component: Component, isSignedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) =>
            !isSignedIn ? (<Component {...props}/>) : (<Redirect to={"/"}/>)
        }
        />
    );
}

const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps)(NonProtectedRoute)