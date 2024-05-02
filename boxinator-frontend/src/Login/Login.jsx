import './Login.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        countryOfResidence: "",
        zipCode: "",
        contactNumber: "",
    };

    const [signUp, setSignUp] = useState(false);
    const [userData, setUserData] = useState(initialState);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setUserData((userData) => ({
            ...userData,
            [inputName]: inputValue,
        }));
    };

    const login = () => {
        navigate("/dashboard");
    }

    const signup = () => {
        navigate("/dashboard");
    }

    return (
        <>
            <div className="login">

                {!signUp && (
                    <>
                        <form className="form">
                            <h2>Log in Page</h2>

                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </label>

                            <input
                                className="form-submit"
                                type="submit"
                                value="Log in"
                                onClick={login}
                            />
                        </form>

                        <div className="switch">
                            <p>Not already a user?</p>
                            <button className="sign-up-btn" onClick={() => setSignUp(true)}>Sign up</button>
                        </div>
                    </>
                )}

                {signUp && (
                    <>
                    <form className="form">
                        <h2>Sign up Page</h2>

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

                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Date of birth:
                            <input
                                type="text"
                                name="dateOfBirth"
                                value={userData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Country of residence:
                            <input
                                type="text"
                                name="countryOfResidence"
                                value={userData.countryOfResidence}
                                onChange={handleChange}
                            />
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
                            Contact number:
                            <input
                                type="text"
                                name="contactNumber"
                                value={userData.contactNumber}
                                onChange={handleChange}
                            />
                        </label>
                        <input
                            className="form-submit"
                            type="submit"
                            value="Sign up"
                            onClick={signup}
                        />
                    </form>
                    
                    <div className="switch">
                            <p>Already a user?</p>
                            <button className="log-in-btn" onClick={() => setSignUp(false)}>Log in</button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Login