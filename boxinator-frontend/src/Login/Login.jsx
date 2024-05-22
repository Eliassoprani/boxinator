import './Login.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import UserInfo from '../UserInfo/UserInfo';
import { urlBackendBasePath } from '../assets/strings.js'
import { accountActivationEmail } from '../Email/AccountActivation.js';
import { updateOrder } from '../ClaimOrder/UpdateOrder.js';

function Login() {
    const navigate = useNavigate();
    const { setUser, setLoggedIn, order, setOrder, allCountries } = useContext(UserContext);
    const [signUp, setSignUp] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [addedOrder, setAddedOrder] = useState(false);

    //Om order finns är det en re-direct från Claim Order
    useEffect(() => {
        if (order !== "") {
            setSignUp(true);
        }
    }, [order]); // Only run the effect when the value of 'order' changes

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
        localStorage.setItem('loggedIn', true);

        setLoggedIn(true);

        navigate("/dashboard");
    }

    const signup = async (e) => {
        e.preventDefault();

        //Send email before activating account
        //accountActivationEmail(userData.firstName, userData.email);

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

        if (order !== "") {
            updateOrder(userId, order);
            setAddedOrder(true);
        }

        setSignUp(false);

        setOrder("");
    }

    const guestLogin = () => {
        localStorage.setItem('loggedIn', true);
        setLoggedIn(true);
        navigate("/dashboard");
    }

    return (
        <div className="user-input">

            {!signUp && (
                <>
                    <h2>Log in Page</h2>

                    {addedOrder && (
                        <div>Your order was added successfully! Log in to track the shipment.</div>
                    )}

                    <form>
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
                    <h2>Sign up Page</h2>

                    <form>
                        <UserInfo userData={userData} setUserData={setUserData} allCountries={allCountries} />

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

            <div className="guest-login">
                <button onClick={guestLogin}>Continue as guest</button>
            </div>

        </div>
    )
}

export default Login