import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PrivateRoute, PublicRoute} from "./auth/RouteTypes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './views/Dashboard';
import Tickets from './views/Tickets';
import TicketView from './views/TicketView';
import NotFound from "./error/NotFound";
import Layout from './common/Layout'
import { AuthProvider } from "../context/AuthContext";

const App = () =>{
    return (
        <div className="App">
            <AuthProvider>
                <ToastContainer/>
                <BrowserRouter>
                    <Switch>
                        <PublicRoute path={'/login'}  component={Login}/>
                        <PublicRoute path={'/register'}  component={Register}/>
                        <PrivateRoute path={'/'} exact component={Dashboard}/>
                        <PrivateRoute path={'/tickets'} exact component={Tickets}/>
                        <PrivateRoute path={'/tickets/create'}  component={Dashboard}/> {/* change */}
                        <PrivateRoute path={'/tickets/:id'} component={TicketView}/> {/* change */}

                        <Route render={(props) => (
                            <Layout>
                                <NotFound {...props}/>
                            </Layout>
                        )}/>
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
