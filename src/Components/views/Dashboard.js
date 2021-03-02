import React from 'react'
import {connect} from "react-redux"
import {storePage} from "../../Actions";

class Dashboard extends React.Component{
    componentDidMount() {
        this.props.storePage('Dashboard')
    }
    render() {
        return (
            <div className={'Dashboard'}>
                Home
                <button className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
                    Hover me
                </button>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps,{storePage})(Dashboard)