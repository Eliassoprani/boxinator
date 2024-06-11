import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../App";
import './Footer.css'
import { useNavigate } from "react-router-dom";

function Footer() {
    const [email, setEmail] = useState("");
    const [signedUp, setSignedUp] = useState(false);
    const { lightTheme } = useContext(UserContext);
    const navigate = useNavigate();

    const signUpForNewsLetter = () => {
        setEmail("");
        setSignedUp(true);
    }

    useEffect(() => {
        if (signedUp) {
            setTimeout(() => { setSignedUp(false) }, 3000);
        }
    }, [signedUp]);

    return (
        <footer id={lightTheme ? 'footer-light' : 'footer-dark'}>
            <section className='newsletter'>
                <label htmlFor="newsLetterEmail">
                    Sign up for our Newsletter:
                    <input
                        id='newsLetterEmail'
                        type="email"
                        name="newsLetterEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </label>

                <div className='button-response'>
                    <button onClick={signUpForNewsLetter}>Sign me up</button>

                    {signedUp && (
                        <p style={{ marginLeft: "14px" }} role="status">Thanks!</p>
                    )}
                </div>
            </section>

            <section>
                <h3>Our Locations</h3>
                <p>Stockholm</p>
                <p>Växjö</p>
            </section>

            <section>
                <a href="/sitemap" onClick={(e) => { e.preventDefault(); navigate('/sitemap'); }}>Sitemap</a>
            </section>
        </footer >
    )
}

export default Footer