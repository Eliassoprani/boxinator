import { useContext } from 'react'
import { UserContext } from "../App";
import "./Profile.css"

function Profile() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className="profile">
                {user.role !== "guest" && (
                    <div>
                        <p>First name: {user.firstName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                )}
                {user.role === "guest" && (
                    <div>
                        <p>Logged in as guest.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile