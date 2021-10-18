import {useState} from 'react'

const MessageReply = ({handleReply}) => {
    
    const [input, setInput] = useState('')

    const handleChange = (e) =>{
        setInput(e.target.value)
    } 

    return (
        <div className="MessageReply">
            <textarea value={input} onChange={handleChange}/>
            <div className="bottom-toolbar">
                <button className='btn btn-dark' onClick={() => handleReply(input)}>Reply</button>
            </div>
        </div>
    )
}

export default MessageReply
