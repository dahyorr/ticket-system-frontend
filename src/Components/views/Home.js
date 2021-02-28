import React from 'react'
import {connect} from "react-redux"

class Home extends React.Component{
    componentDidMount() {

    }
    render() {
        return (
            <div className={'Home'}>
                Home
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps,{})(Home)