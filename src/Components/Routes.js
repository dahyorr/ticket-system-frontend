import React from 'react'
import {Switch, Route} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./views/Dashboard";
import NonProtectedRoute from "./auth/NonProtectedRoute";
import NotFound from "./error/NotFound";

const Routes = () =>{
    return(
        <Switch>
            <NonProtectedRoute path={'/login'} exact component={Login}/>
            <NonProtectedRoute path={'/Register'} exact component={Register}/>
            <ProtectedRoute exact path={'/'} component={Home}/>
            <Route component={NotFound}/>
        </Switch>
    )
}
export default Routes