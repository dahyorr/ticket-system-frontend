import {connect} from 'react-redux'
import Header from './Header'
import SideNav from './SideNav'
import Viewport from './Viewport'

function Layout({isSignedIn, children}) {
    console.log(isSignedIn)
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

const mapStateToProps = (state) =>{
    return{
        isSignedIn: state.auth.isSignedIn,
    }
}

export default connect(mapStateToProps)(Layout)
