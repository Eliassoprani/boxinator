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
                <div className='title'>
                    <h1>Boxinator</h1>
                </div>

                <div className='menu'>
                    <div>About Us</div>
                    {loggedIn && (
                        <div onClick={() => navigate('/newshipment')}>New Shipment</div>
                    )}
                </div>

                {loggedIn && user.role === "guest" && (
                    <button onClick={logout}>Log in / Sign up</button>
                )}

                {loggedIn && user.role !== "guest" && (
                    <>
                        <div className='userLogo'>
                            <p>{user.firstName}</p>
                        </div>
                        <button onClick={logout}>Log out</button>
                    </>
                )}
            </div>
        </>
    )
}

export default Nav