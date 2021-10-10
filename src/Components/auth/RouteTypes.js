import {Redirect, Route} from 'react-router-dom'

export const PrivateRoute = ({ authenticated, children, ...rest}) =>{
    return (
    <Route {...rest}>
        {authenticated? children:<Redirect to={{pathname: '/login'}}/>}
    </Route>
    )
}

export const PublicRoute = ({children, authenticated, ...rest}) =>{
    return (
    <Route {...rest}>
        {!authenticated? children:<Redirect to={{pathname: '/'}}/>}
    </Route>

    )
}