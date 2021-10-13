import {Link} from 'react-router-dom'

const styles = {
    Link: {
        background: '#FFECE4',
        color: '#2E2520',
        padding: '0.35rem 0.5rem',
        borderRadius: '5px'
    }
}
const DetailLink= ({path}) => {
    return(
        <Link to={path} style={styles.Link}>
            View
        </Link>
    )
}
export default DetailLink