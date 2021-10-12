import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../../hooks'
import Layout from '../common/Layout'

export const PrivateRoute = ({component: Component, path, ...props}) => {
    const {isSignedIn} = useAuth()
    return (
        <Route 
        path={path} 
        {...props}
        render={props => {
            return isSignedIn  
            ? <Layout><Component {...props}/></Layout>
            : <Redirect to="/login"/>
        }} 
        />
    )
}

export const PublicRoute = ({component: Component, path, ...props}) => {
    const {isSignedIn} = useAuth()
    return (
        <Route 
        path={path} 
        {...props}
        render={props => {
            return isSignedIn 
            ? <Redirect to="/"/>
            : <Layout><Component {...props}/></Layout>
        }} 
        />
    )
}