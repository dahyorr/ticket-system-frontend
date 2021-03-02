import React from 'react'
import {connect} from "react-redux";
import {storePage} from "../../Actions";

class Register extends React.Component {
    componentDidMount() {
        this.props.storePage('Register')
    }

    render() {
        return (
                <div className={'Register'}>
                    Register
                </div>
        )
    }
}
export default connect(null,{storePage})(Register)