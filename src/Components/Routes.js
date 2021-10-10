import React from 'react'
import {Switch} from "react-router-dom";
import {connect} from 'react-redux'
import Layout from './common/Layout'
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./views/Dashboard";
import {PrivateRoute, PublicRoute} from "./auth/RouteTypes";
import NotFound from "./error/NotFound";
import Header from './common/Header';
import Tickets from './views/Tickets';
import TicketView from './views/TicketView';
import NewTicket from './views/NewTicket';

const Routes = ({isSignedIn}) =>{
    return(
        <Switch>
            <PublicRoute path={'/login'} exact authenticated={isSignedIn}>
                <Header/>
                <Login/>
            </PublicRoute>

            <PublicRoute path={'/Register'} exact authenticated={isSignedIn}>
                <Header/>    
                <Register/>
            </PublicRoute>

            <PrivateRoute exact path={'/'} authenticated={isSignedIn}>
                <Layout>
                    <Dashboard/>
                </Layout>
            </PrivateRoute>

            <PrivateRoute exact path={'/tickets'} authenticated={isSignedIn}>
                <Layout>
                    <Tickets/>
                </Layout>
            </PrivateRoute>



            <PrivateRoute exact path={'/tickets/create'} authenticated={isSignedIn}>
                <Layout>
                    <Dashboard/>
                </Layout>
            </PrivateRoute>
            <PrivateRoute exact path={'/tickets/:id'} authenticated={isSignedIn}>
                <Layout>
                    <TicketView/>
                </Layout>
            </PrivateRoute>

            <PublicRoute>
                <Layout>
                    <NotFound/>
                </Layout>
            </PublicRoute>
        </Switch>
    )
}

const mapStateToProps = state =>{
    return{
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps)(Routes);