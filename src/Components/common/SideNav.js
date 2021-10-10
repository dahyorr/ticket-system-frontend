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

                    <Link to='/tickets' className={`nav-item ${pathname.split('/')[1]=== 'tickets' ?'active':''}`}>
                        <FaList className='icon'/>  <p>Tickets</p>
                    </Link>

                    <Link to='/requests' className={`nav-item ${pathname.split('/')[1]=== 'requests' ?'active':''}`}>
                        <FaProjectDiagram className='icon'/> <p>Created Tickets</p>
                    </Link>

                    <Link to='/products' className={`nav-item ${pathname.split('/')[1]=== 'products' ?'active':''}`}>
                        <MdPeople className='icon'/> <p>Users And Groups</p>
                    </Link>
                </nav>
        </div>
    )
}

export default withRouter(SideNav)
