import { useContext } from 'react'
import { UserContext } from "../App";
import "./Profile.css"

function Profile() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className="profile">
                <p>First name: {user.firstName}</p>
                <p>Email: {user.email}</p>
            </div>
        </>
    )
}

export default Profile