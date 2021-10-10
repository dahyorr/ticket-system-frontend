import React from 'react'
import {Router} from "react-router-dom";
import {connect} from 'react-redux'
import history from "../history";
import noToken from "../Actions/noToken";
import refreshLogin from "../Actions/refreshLogin";
import Routes from "./Routes";
import fetchTickets from '../Actions/fetchTickets'

class App extends React.Component{
    constructor(props){
        super(props)
        const token = localStorage.getItem('accessToken')
        const refresh = localStorage.getItem('refreshToken')
        if(token && refresh){
            this.props.refreshLogin(refresh)
        }
        else{
            this.props.noToken()
        }
    }

    componentDidMount(){
        this.props.fetchTickets()
    }

    render() {
        if(this.props.authLoading) return(
            <h1>Loading...</h1>
        )
        else return (
            <div className="App">
                <Router history={history}>
                        <Routes/>
                </Router>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn,
        authLoading: state.auth.loading
    }
}
export default connect(mapStateToProps, {refreshLogin, noToken, fetchTickets})(App);
