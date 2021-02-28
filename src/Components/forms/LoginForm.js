import React from "react";
import {Form, Field} from 'react-final-form'
import {connect} from 'react-redux'
import signIn from "../../Actions/signIn";

class LoginForm extends React.Component {
    renderError({error, touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label htmlFor={label.toLowerCase()}>{label}</label>
                <input name={label} {...input} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues)=>{
        this.props.signIn(formValues, this.props.preLoginPath ? this.props.preLoginPath : null  )
    }
    validate = (formValues) =>{
        const errors = {}
        if(!formValues.email){
            errors.email = 'You must enter an email'
        }
        if(!formValues.password){
            errors.password = 'You must enter a Password'
        }
        return errors
    }


    render() {
        return (
                <Form
                    className={'LoginForm'}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <Field name={"email"} component={this.renderInput} placeholder={"Email"} type={"email"} label={'Email'}/>
                            <Field name={"password"} component={this.renderInput} placeholder={"Password"} label={'Password'} type={"password"}/>
                            <button className="" type={"submit"}>Submit</button>
                        </form>
                    )}
                />
        )
    }
}
const mapStateToProps = state =>{
    return{
        preLoginPath: state.auth.preLoginPath
    }
}
export default connect(mapStateToProps, {signIn})(LoginForm)