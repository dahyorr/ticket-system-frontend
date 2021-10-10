import Header from './Header'
import SideNav from './SideNav'
import Viewport from './Viewport'
import {useAuth} from '../../hooks'
function Layout({children}) {
    const {isSignedIn} = useAuth()
    return (
        <>
        <Header/>
        <div style={{display: 'flex'}}>
            {isSignedIn && <SideNav/>}
        <Viewport>
            {children}
        </Viewport>
        </div>
        </>
    )
}

export default Layout
