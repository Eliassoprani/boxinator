import './Nav.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


function Nav() {
    const navigate = useNavigate();
    const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);

    const logout = () => {
        setUser({});
        //Remove user credentials from storage
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
    }

    return (
        <>
            <div className='nav'>
                <div className='title' onClick={() => navigate('/dashboard')}>
                    <h1>Boxinator</h1>
                </div>

                <div>
                    {loggedIn && (
                        <>
                            <div onClick={() => navigate('/dashboard')}>Dashboard</div>
                            <div onClick={() => navigate('/newshipment')}>New Shipment</div>
                            <div onClick={() => navigate('/aboutus')}>About Us</div>
                        </>
                    )}
                </div>

                <div className='nav-btn'>
                    {loggedIn && (user.role === 0 || user.role === 1) && (
                        <div onClick={() => navigate('/profile')}>{user.firstName}</div>
                    )}

                    {loggedIn && (
                        <button onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Nav