import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik' 
import {FaLock} from 'react-icons/fa'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import signUp from "../../Actions/signUp";
import { clearError } from '../../Actions/error'



const LoginForm= ({signUp,error, clearError, toast}) => {
    if(error){
        toast.error(error)
        clearError()
    }
    return(
        <Formik
            initialValues={{ 
                name: '', 
                email: '', 
                password: '', 
            }}
            onSubmit={values => {
                signUp(values)
            }}
            validationSchema={Yup.object({
                name: Yup.string(),
                email: Yup.string().email('Please provide a vaild email').required('You must provide a valid email'),
                password: Yup.string().required('You must provide a password')
            })}
        >
            
            <Form className='LoginForm Form'>
                <div className="error">
                    <p className={'form-error'}><ErrorMessage name='name' /></p>
                    <p className={'form-error'}><ErrorMessage name='email' /></p>
                    <p className={'form-error'}><ErrorMessage name='password'/></p>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <Field classname='form-input' name='name' type="text" placeholder="Name"/>
                    {/* {divider?<hr className='solid'/>:null} */}
                    <label htmlFor="email" className="sr-only">Email</label>
                    <Field classname='form-input' name='email' type="email" placeholder="Email"/>
                    {/* {divider?<hr className='solid'/>:null} */}
                    <label htmlFor="password" className="sr-only">Password</label>
                    <Field classname='form-input' name='password' type="password" placeholder='Password'/>
                </div>
                <p class='no-account'>Have an account? <Link to='/login'>Sign In</Link></p>
                <button type="submit"><FaLock className='icon'/> Sign Up</button>
            </Form>
        </Formik>

    )
}

const mapStateToProps = state =>{
    return {
        error: state.auth.error
    }
}

export default connect(mapStateToProps, {signUp, clearError})(LoginForm)
