import React from 'react'
import {connect} from 'react-redux'
import signOut from "../../Actions/signOut";
import {Link} from "react-router-dom";

const Header = ({signOut, isSignedIn, auth}) => {
    const renderNavContents = () => {
        if (isSignedIn){
            return(
                <p>svrbt</p>
            )
        }
        return (
            <p>rgrbetb</p>
        )
    }
    return(
        <div className="Header hover:bg-red-700">
            {/*Header*/}
            {/*<p>{isSignedIn ? auth.email: "Not Signed in"}</p>*/}
            {/*<button onClick={signOut}>Sign Out</button>*/}
            <nav className={'flex flex-wrap items-center justify-between p-5 bg-steel '}>
                {/*// TODO: Hover*/}
                <Link to={'/'} className={'logo text-peach text-4xl font-bold font-dancingScript hover:bg-red-700'}>Ticketrr</Link>
                <div className="flex md:hidden">
                    <button id="hamburger">
                        <svg className={'toggle block text-peach fill-current'} viewBox="0 0 100 80" width="40" height="40">
                            <rect width="100" height="20" rx="8"/>
                            <rect y="30" width="100" height="20" rx="8"/>
                            <rect y="60" width="100" height="20" rx="8"/>
                        </svg>
                        <img className="toggle hidden"
                             src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40"
                             height="40"/>
                    </button>

                </div>
                <div
                className="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
                <a href="#"
                   className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Home</a>
                <a href="#"
                   className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Products</a>
                <a href="#"
                   className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Pricing</a>
                <a href="#"
                   className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Contact</a>
            </div>
                {/*{renderNavContents()}*/}


            </nav>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        auth: state.auth,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {signOut})(Header)