import { useState } from 'react';
import './UserInfo.css'

function UserInfo({ userData, setUserData, update, allCountries }) {
    const [inputTextInvalid, setInputTextInvalid] = useState(false);
    const [inputEmailInvalid, setInputEmailInvalid] = useState(false);
    const [inputNumberInvalid, setInputNumberInvalid] = useState(false);

    const nameRegex = /^[a-zA-ZåäöÅÄÖ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d+$/;

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName && inputValue !== undefined) {
            //Validera user input dynamiskt
            switch (inputName) {
                case "firstName":
                case "lastName":
                    validation(inputValue, nameRegex);
                    break;
                case "email":
                    validation(inputValue, emailRegex);
                    break;
                case "zipCode":
                case "phone":
                    validation(inputValue, numberRegex);
                    break;
            }

            setUserData({
                ...userData,
                [inputName]: inputValue,
            });
        }
    }

    const validation = (inputValue, regex) => {
        if (!regex.test(inputValue)) {
            switch (regex) {
                case nameRegex:
                    setInputTextInvalid(true);
                    break;
                case emailRegex:
                    setInputEmailInvalid(true);
                    break;
                case numberRegex:
                    setInputNumberInvalid(true);
                    break;
            }

        }
        else {
            switch (regex) {
                case nameRegex:
                    setInputTextInvalid(false);
                    break;
                case emailRegex:
                    setInputEmailInvalid(false);
                    break;
                case numberRegex:
                    setInputNumberInvalid(false);
                    break;
            }
        }
    }


    return (
        <div className='user-info'>
            <label htmlFor="firstName">
                First Name:
                <input
                    id='firstName'
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="lastName">
                Last Name:
                <input
                    id='lastName'
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                />
            </label>
            {inputTextInvalid && (
                <p>Invalid input. Name can only be characters.</p>
            )}

            <label htmlFor='email'>
                Email:
                <input
                    id='email'
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </label>
            {inputEmailInvalid && (
                <p>Invalid input. Email must follow format doe@host.com</p>
            )}

            {/* Om komponent används i Profile page ska password ej finnas med */}
            {!update && (
                <label htmlFor='password'>
                    Password:
                    <input
                        id='password'
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>
            )}

            <label htmlFor='dateOfBirth'>
                Date of birth:
                <input
                    id='dateOfBirth'
                    type="date"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor='countryOfResidence'>
                Country of residence:
                <select
                    id='countryOfResidence'
                    className="dropdown-signup"
                    name="countryOfResidence"
                    value={userData.countryOfResidence}
                    onChange={handleChange}
                >
                    {allCountries && allCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>

            <label htmlFor='zipCode'>
                Zip code:
                <input
                    id='zipCode'
                    type="number"
                    name="zipCode"
                    value={userData.zipCode}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor='phoneNumber'>
                Phone number:
                <input
                    id='phoneNumber'
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                />
            </label>

            {inputNumberInvalid && (
                <p>Invalid input. Can only be numbers.</p>
            )}
        </div>
    )
}

export default UserInfo