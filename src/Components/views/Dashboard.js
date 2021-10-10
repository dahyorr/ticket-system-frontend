import React from 'react'
import {connect} from "react-redux"

class Dashboard extends React.Component{
    render() {
        return (
            <div className={'Dashboard'} >
                <div className="container">
                    <div className="platform">

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Dashboard)