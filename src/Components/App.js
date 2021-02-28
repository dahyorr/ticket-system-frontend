import React from 'react'
import {Router} from "react-router-dom";
import {connect} from 'react-redux'
import history from "../history";
import noToken from "../Actions/noToken";
import Header from "./common/Header";
import refreshLogin from "../Actions/refreshLogin";
import Routes from "./Routes";


class App extends React.Component{
    constructor(props){
        super(props)
        const token = localStorage.getItem('token')
        if(token){
            this.props.refreshLogin(token)
        }
        else{
            this.props.noToken()
        }
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Header/>
                    <Routes/>
                </Router>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {refreshLogin, noToken})(App);
