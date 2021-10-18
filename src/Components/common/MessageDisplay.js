const MessageDisplay = ({author, message, reply, date}) => {
    const parsedDate = new Date(date).toLocaleString()
    const sampleMessage = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus dicta velit, a asperiores necessitatibus ipsam porro corporis mollitia aperiam.'
    return (
        <div className={'MessageDisplay'} style={reply?{marginLeft: '1rem'}:{}}>
            <div className='flex'>
                {!reply
                ?<div className='pointer pointer-author'></div>
                :<div className='pointer'></div>
                }
                <div className='message-title'>
                    <p className='author'><span>{author || 'Deleted User'}</span> on {parsedDate}</p>
                </div>
                
            </div>
            <p className={'message'}>{message || sampleMessage}</p>
        </div>
    )
}

export default MessageDisplay
