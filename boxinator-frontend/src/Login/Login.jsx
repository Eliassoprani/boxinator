import './Login.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import UserInfo from '../UserInfo/UserInfo';
import { urlBackendBasePath } from '../assets/strings.js'
import { accountActivationEmail } from '../Email/AccountActivation.js';
import { updateOrder } from '../ClaimOrder/UpdateOrder.js';

function Login() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { user, setUser, setLoggedIn } = useContext(UserContext);
    const [signUp, setSignUp] = useState(false);
    const [userData, setUserData] = useState({});

    if(Object.keys(orderId).length !== 0) { //If there is an orderId param
        //setSignUp(true);  //För många re-renders
        console.log("Order id: " + orderId);
    }

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

        const logInResponse = await fetch(`${urlBackendBasePath}/authentication/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userData.email, password: userData.password }),
        });

        if (!logInResponse.ok) {
            throw new Error("Failed to log in");
        }

        const logInResponseData = await logInResponse.json();

        setUser(logInResponseData);

        localStorage.setItem('token', logInResponseData.token);
        localStorage.setItem('loggedIn', JSON.stringify(true));

        setLoggedIn(true);

        navigate("/dashboard");
    }

    const signup = async (e) => {
        e.preventDefault();

        //Send email before activating account
        accountActivationEmail(userData.firstName, userData.email);

        const signUpResponse = await fetch(`${urlBackendBasePath}/authentication/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!signUpResponse.ok) {
            throw new Error("Failed to sign up");
        }

        const signUpResponseData = await signUpResponse.json();
        const userId = signUpResponseData.id;

        if(Object.keys(orderId).length !== 0) {
            updateOrder(userId, orderId);
        }

        setSignUp(false);
    }

    const guestLogin = () => {
        localStorage.setItem('loggedIn', JSON.stringify(true));
        setLoggedIn(true);
        navigate("/dashboard");
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
                                className="submit-input"
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

                            <UserInfo userData={userData} setUserData={setUserData} />

                            <input
                                className="submit-input"
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