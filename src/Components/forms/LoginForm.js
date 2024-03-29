import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik' 
import {FaLock} from 'react-icons/fa'
import * as Yup from 'yup'

const LoginForm= ({onFormSubmit}) => {
    return(
        <Formik
            initialValues={{ 
                email: '', 
                password: '', 
            }}
            onSubmit={values => {
                onFormSubmit(values)
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Please provide a vaild email').required('You must provide a valid email'),
                password: Yup.string().required('You must provide a password')
            })}
        >
            
            <Form className='LoginForm Form'>
                <div className="error">
                    <p className={'form-error'}><ErrorMessage name='email' /></p>
                    <p className={'form-error'}><ErrorMessage name='password'/></p>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <Field name='email' type="email"  placeholder="Email"/>
                    <div style={{borderBottom:'1px solid grey'}}></div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <Field name='password' type="password" placeholder='Password'/>
                </div>
                <p className='no-account'>Dont have an account? <Link to='/register'>Sign up</Link></p>
                <button type="submit"><FaLock className='icon'/> Login</button>
            </Form>
        </Formik>

    )
}

export default LoginForm
