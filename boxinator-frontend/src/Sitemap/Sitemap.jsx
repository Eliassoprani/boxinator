import sitemap from '../assets/sitemap.png';
import { UserContext } from "../App";
import { useContext } from 'react';
import './Sitemap.css';

function Sitemap() {
    const { lightTheme } = useContext(UserContext);

    return (
        <div className="sitemap" id={lightTheme ? "sitemap-light" : "sitemap-dark"}>
            <h2>Sitemap</h2>
            
            <img src={sitemap} alt="sitemap image" />
        </div>
    )
}

export default Sitemap