import './UserInfo.css'

function UserInfo({ userData, setUserData, update, allCountries }) {
    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName && inputValue !== undefined) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [inputName]: inputValue,
            }));
        }
    }


    return (
        <>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </label>

            {/* Om komponent används i Profile page ska password ej finnas med */}
            {!update && (
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>
            )}

            <label>
                Date of birth:
                <input
                    type="date"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                />
            </label>

            <label>
            Country of residence:
                <select
                    className="dropdown-signup"
                    name="countryOfResidence"
                    value={userData.countryOfResidence}
                    onChange={handleChange}
                >
                    {allCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>

            <label>
                Zip code:
                <input
                    type="text"
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={handleChange}
                />
            </label>

            <label>
                Phone number:
                <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                />
            </label>
        </>
    )
}

export default UserInfo