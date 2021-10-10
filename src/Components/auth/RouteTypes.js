import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../../hooks'
import Layout from '../common/Layout'

export const PrivateRoute = ({component: Component, path, ...props}) => {
    const {user} = useAuth()
    return (
        <Route 
        path={path} 
        {...props}
        render={props => {
            return user 
            ? <Layout><Component {...props}/></Layout>
            : <Redirect to="/login"/>
        }} 
        />
    )
}

export const PublicRoute = ({component: Component, path, ...props}) => {
    const {user} = useAuth()
    return (
        <Route 
        path={path} 
        {...props}
        render={props => {
            return user 
            ? <Redirect to="/"/>
            : <Layout><Component {...props}/></Layout>
        }} 
        />
    )
}