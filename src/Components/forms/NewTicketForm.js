import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Formik, Form, Field, ErrorMessage} from 'formik' 
import * as Yup from 'yup'

const LoginForm = ({onFormSubmit, formError}) => {
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
                        <Form className='Form'>
                            <p className="form-error">{formError}</p>
                            <div className="input-container">
                                <p className={'form-error'}><ErrorMessage name='email'/></p>
                                <label htmlFor="email">Email</label>
                                <Field type="email" name='email' />
                            </div>

                            <div className="input-container">
                                <p className={'form-error'}><ErrorMessage name='password'/></p>
                                <label htmlFor="password">Password</label>
                                <Field type="password" name='password' />
                            </div>

                            <div className="input-container-checkbox">
                                <Link to='/forgot-password'>Forgot Password?</Link>
                            </div>

                            <button type="submit" className='btn btn-primary' > Login </button>
                            <p>Dont have an account? <Link to='/signup' className='text-primary'>Click here</Link></p>
                        </Form>
                    </Formik>
    )
}

const mapStateToProps = (state) =>({
    formError: state.auth.error
})

export default connect(mapStateToProps)(LoginForm)