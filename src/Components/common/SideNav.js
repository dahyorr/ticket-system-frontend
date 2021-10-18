import {Link, withRouter} from 'react-router-dom'
import {MdDashboard, MdPeople} from 'react-icons/md'
import {FaList, FaProjectDiagram} from 'react-icons/fa'
function SideNav({location: {pathname}}) {
    return (
        <div className='SideNav'>
            <nav className="nav">

                    <Link to='/' className={`nav-item ${pathname=== '/' ?'active':''}`}>
                        <MdDashboard className='icon'/> <p>Dashboard</p>
                    </Link>

                    <Link to='/open-tickets' className={`nav-item ${
                        pathname.split('/').includes('open-tickets')
                        ?'active'
                        :''}`}>
                        <FaList className='icon'/>  <p>Open Tickets</p>
                    </Link>
                    
                    <Link to='/tickets' className={`nav-item ${pathname.split('/')[1]=== 'tickets' ?'active':''}`}>
                        <FaList className='icon'/>  <p>All Tickets</p>
                    </Link>

                    <Link to='/user/tickets' className={`nav-item ${
                        pathname.split('/').includes('user') && pathname.split('/').includes('tickets')
                        ?'active'
                        :''}`}>
                        <FaProjectDiagram className='icon'/> <p>Created Tickets</p>
                    </Link>

                    <Link to='/users' className={`nav-item ${pathname.split('/')[1]=== 'users' ?'active':''}`}>
                        <MdPeople className='icon'/> <p>Users</p>
                    </Link>
                    
                    <Link to='/queues' className={`nav-item ${pathname.split('/')[1] === 'queues' ?'active':''}`}>
                    <FaList className='icon'/> <p>Queues</p>
                    </Link>
                </nav>
        </div>
    )
}

export default withRouter(SideNav)
