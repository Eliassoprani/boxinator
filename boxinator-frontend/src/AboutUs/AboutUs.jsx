import './AboutUs.css'
import dogPackageImage from '../assets/dog_package.jpg';
import dogPackageImage2 from '../assets/dog_package2.jpg';

function AboutUs() {

    return (
        <div className="about-us">
            <h2>About us</h2>

            <div>
                <p>StoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStory</p>
                <img src={dogPackageImage} alt="dog package" />
            </div>
            <div>
                <img src={dogPackageImage2} alt="dog package 2" />
                <p>StoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStoryStory</p>
            </div>
        </div>
    )
}

export default AboutUs