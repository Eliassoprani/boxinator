import { useState } from 'react'
import './Footer.css'

function Footer() {
    const [email, setEmail] = useState("");

    const signUpForNewsLetter = () => {
        setEmail("Thanks!");
    }

    return (
        <div className="footer">
            <div className='newsletter'>
                <div className='newsletter-text'>Sign up for our Newsletter:</div>
                <div className='newsletter-signup'>
                    <input
                        type="text"
                        name="recieverName"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={signUpForNewsLetter}>Sign me up</button>
                </div>
            </div>

            <div>
                <h3>Our Locations</h3>
                <p>Stockholm</p>
                <p>Växjö</p>
            </div>
        </div>
    )
}

export default Footer