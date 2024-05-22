import './Nav.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


function Nav() {
    const navigate = useNavigate();
    const { user, setUser, loggedIn, setLoggedIn } = useContext(UserContext);

    const logout = () => {
        localStorage.clear();

        setUser({});
        setLoggedIn(false);
        
        navigate("/");
    }

    return (
        <>
            <div className='nav'>
                <div className='title' onClick={loggedIn ? () => navigate('/dashboard') : undefined}>
                    <h1>Boxinator</h1>
                </div>

                {loggedIn && (
                    <>
                        <div>
                            <div className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</div>
                            <div className="nav-link" onClick={() => navigate('/newshipment')}>New Shipment</div>
                            <div className="nav-link" onClick={() => navigate('/aboutus')}>About Us</div>
                        </div>

                        <div>
                            {(user.role === 0 || user.role === 1) && (
                                <div className="nav-link" onClick={() => navigate('/profile')}>{user.firstName}</div>
                            )}

                            <button onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Nav