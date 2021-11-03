import {Formik, Form, Field, ErrorMessage} from 'formik' 
import * as Yup from 'yup'
import {FaPlus} from 'react-icons/fa'
import Select from '../common/Select'

const NewTicketForm = ({onFormSubmit, queueList, userList}) => {
    userList = userList.map((user) =>({value: user.id, label: user.email}))
    queueList = queueList.map(queue => ({value: queue.id, label: queue.title}))
    const priorityList = [
        {value: 1, label: 'Critical'},
        {value: 2, label: 'High'},
        {value: 3, label: 'Normal'},
        {value: 4, label: 'Low'},
        {value: 5, label: 'Very Low'},
    ]

    return(
        <Formik
            initialValues={{ 
                title: '',
                queue: queueList.find(queue => queue.label.toLowerCase() === 'miscellaneous'),
                priority: priorityList[2],
                message: '',
                assignedUsers: []
            }}
            onSubmit={({title, priority, queue, message, assignedUsers}) => {
                const data = {
                    title,
                    priority: priority.value,
                    queue: queue.value,
                    opening_text: message,
                    assigned_users: assignedUsers.map(user => user.value)
                }
                onFormSubmit(data)
            }}
            validationSchema={Yup.object({
                title: Yup.string().max(255).required('You must provide a title'),
                queue:Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.number().required()
                }),
                priority:Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.number().required('You must pick a Priority')
                }),
                message:  Yup.string().max(255).required('You must provide a message'),
                assignedUsers: Yup.array()
                .min(1, "Pick at least 1 user")
                    .of(Yup.object().shape({
                        label: Yup.string().required(),
                        value: Yup.number().required()
                    }))
            })
            }
        >
            <Form className='NewTicketForm Form'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field type="text" name='title' />
                    <p className={'form-error'}><ErrorMessage name='title'/></p>
                </div>
                
                <div className="form-group">
                    <label htmlFor="queue">Queue</label>
                    <Field as={Select} name='queue' options={queueList} />
                    <p className={'form-error'}><ErrorMessage name='queue'/></p>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <Field as={Select} name='priority' options={priorityList} />
                    <p className={'form-error'}><ErrorMessage name='priority'/></p>
                </div>
                
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <Field as="textarea" name='message'/>
                    <p className={'form-error'}><ErrorMessage name='message'/></p>
                </div>

                <div className="form-group">
                    <label htmlFor="assignedUsers">Assigned Users</label>
                    <Field as={Select} name='assignedUsers' options={userList} isMulti/>
                    <p className={'form-error'}><ErrorMessage name='assignedUsers'/></p>
                </div>

                <button type="submit"><FaPlus className='icon'/> Create Ticket</button>
            </Form>
        </Formik>
    )
}

export default NewTicketForm