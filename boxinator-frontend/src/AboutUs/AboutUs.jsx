import './AboutUs.css'
import dogPackageImage from '../assets/dog_package.jpg';
import dogPackageImage2 from '../assets/dog_package2.jpg';
import { text } from '../assets/loremipsum.json'
import { UserContext } from "../App";
import { useContext } from 'react'

function AboutUs() {
    const { lightTheme } = useContext(UserContext);
    const loremIpsum = text[0].text;

    return (
        <div className="about-us" id={lightTheme ? 'about-light' : 'about-dark'}>
            <h2>About us</h2>

            <section>
                <p className='text-left'>{loremIpsum}</p>
                <img src={dogPackageImage} alt="big dog delivering package" />
            </section>
            <section>
                <img src={dogPackageImage2} alt="small dog delivering package" />
                <p className='text-right'>{loremIpsum}</p>
            </section>
        </div>
    )
}

export default AboutUs