import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../App";
import "./Profile.css"
import UserInfo from '../UserInfo/UserInfo';
import { urlBackendBasePath } from '../assets/strings';

function Profile() {
    const { user, setUser, allCountries, lightTheme } = useContext(UserContext);
    const update = true;

    const initialState = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        countryOfResidence: user.countryOfResidence,
        zipCode: user.zipCode,
    };

    const [userData, setUserData] = useState(initialState);
    const [updatedAlert, setUpdatedAlert] = useState(false);

    const updateUser = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

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

        const responseData = await updateUserResponse.json();

        setUser(responseData);

        //User feedback for 3 sec
        setUpdatedAlert(true);
    }

    useEffect(() => {
        if (updatedAlert) {
            setTimeout(() => { setUpdatedAlert(false) }, 3000);
        }
    }, [updatedAlert]);


    return (
        <div className='profile' id={lightTheme ? 'profile-light' : 'profile-dark'} aria-label='profile page'>
            <h2>Profile Page</h2>

            <form>
                <UserInfo userData={userData} setUserData={setUserData} update={update} allCountries={allCountries} />

                {updatedAlert && (
                    <p style={{ color: 'var(--medium-turquoise' }}>User updated</p>
                )}

                <input
                    className="submit-input"
                    type="submit"
                    value="Update"
                    onClick={updateUser}
                />
            </form>
        </div>
    )
}

export default Profile