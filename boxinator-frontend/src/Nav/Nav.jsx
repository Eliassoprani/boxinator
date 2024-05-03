import './Nav.css'
import { useContext } from 'react'
import { UserContext } from "../App";

function Nav() {
    const { user, loggedIn } = useContext(UserContext);
    const initials = user.firstName.get(0) + user.lastName.get(0);

    return (
        <>
            <div className="nav">
                <div className='title'>
                    <h1>Boxinator</h1>
                </div>
                <div className='userLogo'>
                    {loggedIn && (
                        <p>{initials}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Nav