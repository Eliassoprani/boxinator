import './Nav.css'
import { useContext, useState } from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


function Nav() {
    const navigate = useNavigate();
    const { user, setUser, loggedIn, setLoggedIn, lightTheme, setLightTheme } = useContext(UserContext);
    const [themeSymbol, setThemeSymbol] = useState("☀️");

    const logout = () => {
        localStorage.clear();

        setUser({});
        setLoggedIn(false);

        navigate("/");
    }

    const setTheme = () => {
        localStorage.setItem('lightTheme', !lightTheme);
        setLightTheme(!lightTheme);
        setThemeSymbol(themeSymbol === "🌙" ? "☀️" : "🌙");
    }


    return (
        <nav id={lightTheme ? 'nav-light' : 'nav-dark'}>
            <h1>Boxinator</h1>

            {!loggedIn ? (
                <>
                    <button aria-label="light dark mode" style={{ marginLeft: '40px', marginTop: '10px'}} className='theme-btn' onClick={setTheme} >{themeSymbol}</button>
                </>
            ) : (
                <>
                    <ul>
                        <li>
                            {/* e.preventDefault gör så att sidan ej laddar om (för SPA) */}
                            <a href="/dashboard" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Dashboard</a>
                        </li>
                        <li>
                            <a href="/newshipment" onClick={(e) => { e.preventDefault(); navigate('/newshipment'); }}>New Shipment</a>
                        </li>
                        <li>
                            <a href="/aboutus" onClick={(e) => { e.preventDefault(); navigate('/aboutus'); }}>About Us</a>
                        </li>
                    </ul>

                    <section>
                        {(user.role === 0 || user.role === 1) && (
                            <button style={{ border: 'none' }} onClick={() => navigate('/profile')}>{user.firstName}</button>
                        )}

                        <button onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</button>

                        <button aria-label="light dark mode" className='theme-btn' onClick={setTheme} >{themeSymbol}</button>
                    </section>
                </>
            )}


        </nav>
    )
}

export default Nav