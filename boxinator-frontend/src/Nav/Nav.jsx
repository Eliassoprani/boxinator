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
                <div className='title' onClick={() => navigate('/')}>
                    <h1>Boxinator</h1>
                </div>

                <div>
                    <div onClick={() => navigate('/aboutus')}>About Us</div>
                    {loggedIn && (
                        <>
                            <div onClick={() => navigate('/')}>Orders</div>
                            <div onClick={() => navigate('/newshipment')}>New Shipment</div>
                        </>
                    )}
                </div>

                <div className='nav-btn'>
                    {loggedIn && user.role === 2 && (
                        <button onClick={logout}>Log in / Sign up</button>
                    )}

                    {loggedIn && user.role !== 2 && (
                        <>
                            <div onClick={() => navigate('/profile')}>{user.firstName}</div>
                            <button onClick={logout}>Log out</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Nav