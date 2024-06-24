import './Nav.css'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


function Nav() {
    const navigate = useNavigate();
    const { user, setUser, loggedIn, setLoggedIn, lightTheme, setLightTheme } = useContext(UserContext);
    const [themeSymbol, setThemeSymbol] = useState("☀️");
    const [smallScreen, setSmallScreen] = useState(false);

    const handleResize = () => {
        setSmallScreen(window.innerWidth < 1024);
      };
    
      useEffect(() => {
        handleResize(); //Get correct layout from start
        window.addEventListener('resize', handleResize);    //Set layout if screen size changes
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

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
        <header>
            <nav id={lightTheme ? 'nav-light' : 'nav-dark'}>
                <h1>Boxinator</h1>

                {!loggedIn ? (
                    <>
                        <button aria-label="light dark mode" style={{ marginLeft: '40px', marginTop: '10px' }} className='theme-btn' onClick={setTheme} >{themeSymbol}</button>
                    </>
                ) : (
                    <>
                        {smallScreen ? (
                            <>
                                <div className='dropdown-container' >
                                    <p className='dropdown-header'>Menu</p>
                                    <ul className='dropdown-content'>
                                        <li>
                                            <a href="/dashboard" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/dashboard'); }}>Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/newshipment" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/newshipment'); }}>New Shipment</a>
                                        </li>
                                        <li>
                                            <a href="/aboutus" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/aboutus'); }}>About Us</a>
                                        </li>
                                        {(user.role === 0 || user.role === 1) && (
                                            <li>
                                                <a href="/profile" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/profile'); }}>{user.firstName}</a>
                                            </li>
                                        )}
                                        <li>
                                            <a href="/" onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</a>
                                        </li>
                                    </ul>
                                </div>
                                <button aria-label="light dark mode" className='theme-btn' onClick={(e) => { e.target.blur(); setTheme(); }} >{themeSymbol}</button>
                            </>
                        ) : (

                            <>
                                <ul>
                                    <li>
                                        {/* e.preventDefault makes the page not reload (for SPA)  e.target.blur changes link color back to normal */}
                                        <a href="/dashboard" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/dashboard'); }}>Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="/newshipment" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/newshipment'); }}>New Shipment</a>
                                    </li>
                                    <li>
                                        <a href="/aboutus" onClick={(e) => { e.preventDefault(); e.target.blur(); navigate('/aboutus'); }}>About Us</a>
                                    </li>
                                </ul>

                                <section className='nav-btns'>
                                    {(user.role === 0 || user.role === 1) && (
                                        <button style={{ border: 'none' }} onClick={(e) => { e.target.blur(); navigate('/profile'); }}>{user.firstName}</button>
                                    )}

                                    <button onClick={logout}>{(user.role === 0 || user.role === 1) ? "Log out" : "Log in / Sign up"}</button>

                                    <button aria-label="light dark mode" className='theme-btn' onClick={(e) => { e.target.blur(); setTheme(); }} >{themeSymbol}</button>
                                </section>
                            </>
                        )}
                    </>
                )}
            </nav>
        </header >
    )
}

export default Nav