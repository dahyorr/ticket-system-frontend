import React from 'react'
import {connect} from "react-redux";

const RenderPermission = ({isSignedIn, children}) =>{
    if(isSignedIn){
        return(
            <>
                {children}
            </>
        )
    }
    else{
        return null
    }
}
const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps)(RenderPermission)
