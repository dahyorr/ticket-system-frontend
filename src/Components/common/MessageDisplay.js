const MessageDisplay = ({author, message, reply}) => {
    const sampleMessage = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus dicta velit, a asperiores necessitatibus ipsam porro corporis mollitia aperiam.'
    const sampleAuthor = 'Author@test.com'
    return (
        <div className={'MessageDisplay'} style={reply?{marginLeft: '1rem'}:{}}>
            <div className='flex'>
                {!reply
                ?<div className='pointer pointer-author'></div>
                :<div className='pointer'></div>
                }
                <h4 className='author'>{author || sampleAuthor}</h4>
            </div>
            <p className={'message'}>{message || sampleMessage}</p>
        </div>
    )
}

export default MessageDisplay
