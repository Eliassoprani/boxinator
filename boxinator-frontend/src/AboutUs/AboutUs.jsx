import './AboutUs.css'
import dogPackageImage from '../assets/dog_package.jpg';
import dogPackageImage2 from '../assets/dog_package2.jpg';
import { text } from '../assets/loremipsum.json'

function AboutUs() {
    const loremIpsum = text[0].text;

    return (
        <div className="about-us">
            <h2>About us</h2>

            <div>
                <p className='text-left'>{loremIpsum}</p>
                <img src={dogPackageImage} alt="dog package" />
            </div>
            <div>
                <img src={dogPackageImage2} alt="dog package 2" />
                <p className='text-right'>{loremIpsum}</p>
            </div>
        </div>
    )
}

export default AboutUs