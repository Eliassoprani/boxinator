import './Login.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App";

function Login() {
    const { user, setUser, setLoggedIn } = useContext(UserContext);

    const initialState = {
        id: "id",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        dateOfBirth: "dateOfBirth",
        phone: 0,
        countryOfResidence: "countryOfResidence",
        zipCode: -1,
        role: 2,
        token: "token",
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

    const login = async (e) => {
        e.preventDefault();
        //A confirmation e-mail should be sent before an account becomes activated. (https://sendgrid.com/)

        const logInResponse = await fetch("http://localhost:5012/authentication/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userData.email, password: userData.password }),
            //body: '{"email": "abc@abc.com", "password": "ABCdef123"}'
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
        localStorage.setItem('user', JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            phone: phone,
            countryOfResidence: countryOfResidence,
            zipCode: zipCode,
            role: role,
            token: token
        }));

        localStorage.setItem('loggedIn', JSON.stringify(true));

        setLoggedIn(true);
    }

    const signup = async () => {
        const signUpResponse = await fetch("http://localhost:5012/signup", {
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
            role: 2,
        });

        localStorage.setItem('user', JSON.stringify({ role: 2 }));
        localStorage.setItem('loggedIn', JSON.stringify(true));

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