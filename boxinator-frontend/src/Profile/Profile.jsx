import { useContext, useState } from 'react'
import { UserContext } from "../App";
import "./Profile.css"
import UserInfo from '../UserInfo/UserInfo';
import { urlBackendBasePath } from '../assets/strings';

function Profile() {
    const { user } = useContext(UserContext);
    const update = true;
    /*
    ----UPDATING A SINGLE VALUE EXAMPLE----------
        {
            "firstName": "asd",
            "lastName": null,
            "password": null,
            "dateOfBirth": null,
            "phone": null,
            "countryOfResidence": null,
            "zipCode": null
        }
    */
    const initialState = {
        firstName: user.firstName,
        lastName: user.lastName,
        password: null,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        countryOfResidence: user.countryOfResidence,
        zipCode: user.zipCode,
    };

    const [userData, setUserData] = useState(initialState);

    const updateUser = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        
        console.log(token, userData);

        const updateUserResponse = await fetch(`${urlBackendBasePath}/authentication/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
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

                <UserInfo userData={userData} setUserData={setUserData} update={update} />

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