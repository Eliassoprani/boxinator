import { useContext, useState } from 'react'
import { UserContext } from "../App";
import "./Profile.css"
import UserInfo from '../UserInfo/UserInfo';

function Profile() {
    const { user } = useContext(UserContext);

    const initialState = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        countryOfResidence: user.countryOfResidence,
        zipCode: user.zipCode,
    };

    const [userData, setUserData] = useState(initialState);

    const updateUser = async () => {
        const updateUserResponse = await fetch("http://localhost:5012/updateUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!updateUserResponse.ok) {
            throw new Error("Failed to update user");
        }
    }

    return (
        <>
            <form className="profile">
                <h2>Profile Page</h2>

                <UserInfo userData={userData} setUserData={setUserData} />

                <input
                    className="submit-input"
                    type="submit"
                    value="Update"
                    onClick={updateUser}
                />
            </form>
        </>
    )
}

export default Profile