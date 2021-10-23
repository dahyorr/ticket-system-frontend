import {Formik, Form, Field, ErrorMessage} from 'formik' 
import * as Yup from 'yup'
import {FaPlus} from 'react-icons/fa'
import Select from '../common/Select'

const NewTicketForm = ({onFormSubmit, formError, queueList, userList}) => {
    userList = userList.filter((user) => user.is_authorized)
    .map((user) =>{
        return {value: user.id.toString(), label: user.email}
    })

    return(
        <Formik
            initialValues={{ 
                title: '',
                queue: '',
                priority: 3,
                message: '',
                assignedUsers: []
            }}
            onSubmit={values => {
                console.log(values)
            }}
            validationSchema={Yup.object({
                title: Yup.string().max(255).required('You must provide a title'),
                queue: Yup.number().required('You must pick a queue'),
                priority: Yup.number().required('You must pick a Priority'),
                message:  Yup.string().max(255).required('You must provide a message'),
                assignedUsers: Yup.array()
            })
            }
        >
            <Form className='Form'>
                {/* <p className="form-error">{formError}</p> */}
                <div className="form-group">
                    <p className={'form-error'}><ErrorMessage name='title'/></p>
                    <label htmlFor="title">Title</label>
                    <Field type="text" name='title' />
                </div>

                <div className="form-group">
                    <p className={'form-error'}><ErrorMessage name='queue'/></p>
                    <label htmlFor="queue">Queue</label>
                    <Field as="select" name='queue'>
                        <option value=""></option>
                        {queueList.map(queue => <option key={queue.id} value={queue.id}>{queue.title}</option>)}
                    </Field>
                </div>
                
                <div className="form-group">
                    <p className={'form-error'}><ErrorMessage name='priority'/></p>
                    <label htmlFor="priority">Priority</label>
                    <Field as="select" name='priority'>
                        <option value="1">Critical</option>
                        <option value="2">High</option>
                        <option value="3">Normal</option>
                        <option value="4">Low</option>
                        <option value="5">Very Low</option>
                    </Field>
                </div>
                
                <div className="form-group">
                    <p className={'form-error'}><ErrorMessage name='message'/></p>
                    <label htmlFor="message">Message</label>
                    <Field as="textarea" name='message'/>
                </div>

                <div className="form-group">
                    <p className={'form-error'}><ErrorMessage name='assignedUsers'/></p>
                    <label htmlFor="assignedUsers">Assigned Users</label>
                    <Field as={Select} name='assignedUsers' options={userList} isMulti/>
                </div>

                <button type="submit"><FaPlus className='icon'/> Create Ticket</button>
            </Form>
        </Formik>
    )
}

export default NewTicketForm