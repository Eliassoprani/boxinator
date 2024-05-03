import './Login.css'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
    const navigate = useNavigate();

    const { user, setUser, setLoggedIn } = useContext(UserContext);

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        phone: "",
        countryOfResidence: "",
        zipCode: "",
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

    const login = async () => {

        //A confirmation e-mail should be sent before an account becomes activated. (https://sendgrid.com/)

        const logInResponse = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userData.email, password: userData.password }),
        });

        if (!logInResponse.ok) {
            throw new Error("Failed to log in");
        }

        const {
            id,
            firstName,
            lastName,
            email,
            dateOfBirth,
            phone,
            countryOfResidence,
            zipCode,
            role,
            token } = await logInResponse.json();

        setUser({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            phone: phone,
            countryOfResidence: countryOfResidence,
            zipCode: zipCode,
            role: role,
            token: token,
        });

        //Save to local storage in case user refreshes/closes window
        localStorage.setItem('user', JSON.stringify(user));

        setLoggedIn(true);

        //Navigate maybe not needed?
        navigate("/");
    }

    const signup = async () => {
        const signUpResponse = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!signUpResponse.ok) {
            throw new Error("Failed to sign up");
        }

        login();
    }

    const guestLogin = () => {
        setUser({
            role: "guest",
        });

        localStorage.setItem('user', JSON.stringify(user));

        setLoggedIn(true);
    }

    return (
        <>
            <div className="login">

                <div className="guest-login">
                    <button onClick={guestLogin}>Continue as guest</button>
                </div>

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
                            <button onClick={() => setSignUp(true)}>Sign up</button>
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
                                Phone number:
                                <input
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
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
                            <button onClick={() => setSignUp(false)}>Log in</button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default Login