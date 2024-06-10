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
        <div className='nav'>
            <h1>Boxinator</h1>

            {loggedIn && (
                <>
                    <div className="nav-link">
                        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                        <button onClick={() => navigate('/newshipment')}>New Shipment</button>
                        <button onClick={() => navigate('/aboutus')}>About Us</button>
                    </div>

                    <div>
                        <div className="nav-link">
                            {(user.role === 0 || user.role === 1) && (
                                <button onClick={() => navigate('/profile')}>{user.firstName}</button>
                            )}
                        </div>

                        <button onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Nav