import {Link, withRouter} from 'react-router-dom'
import {MdDashboard, MdPeople} from 'react-icons/md'
import {FaList, FaProjectDiagram} from 'react-icons/fa'
import ReactTooltip from 'react-tooltip';

function SideNav({location: {pathname}}) {
    return (
        <div className='SideNav'>
            <ReactTooltip place="right" type="dark" effect="solid"/>

            <nav className="nav">

                    <Link to='/' className={`nav-item ${pathname=== '/' ?'active':''}`} >
                        <MdDashboard className='icon' data-tip="Dashboard"/> <p>Dashboard</p>
                    </Link>

                    <Link to='/open-tickets' className={`nav-item ${
                        pathname.split('/').includes('open-tickets')
                        ?'active'
                        :''}`}
                        >
                        <FaList className='icon' data-tip="Open Tickets"/>  <p>Open Tickets</p>
                    </Link>
                    
                    <Link to='/tickets' className={`nav-item ${pathname.split('/')[1]=== 'tickets' ?'active':''}`} >
                        <FaList className='icon' data-tip="All Tickets"/>  <p>All Tickets</p>
                    </Link>

                    <Link to='/user/tickets' className={`nav-item ${
                        pathname.split('/').includes('user') && pathname.split('/').includes('tickets')
                        ?'active'
                        :''}`}
                        >
                        <FaProjectDiagram className='icon' data-tip="Created Tickets"/> <p>Created Tickets</p>
                    </Link>

                    <Link to='/users' className={`nav-item ${pathname.split('/')[1]=== 'users' ?'active':''}`}>
                        <MdPeople className='icon' data-tip="Users"/> <p>Users</p>
                    </Link>
                </nav>
        </div>
    )
}

export default withRouter(SideNav)
