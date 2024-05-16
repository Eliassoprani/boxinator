import './Login.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App";
import UserInfo from '../UserInfo/UserInfo';
import emailjs from '@emailjs/browser';
import { useParams } from "react-router-dom";
import { urlBackendBasePath, urlFrontendBasePath } from '../assets/strings.js'

function Login() {
    const { user, setUser, setLoggedIn } = useContext(UserContext);

    const [signUp, setSignUp] = useState(false);
    const [userData, setUserData] = useState({});

    //Hämta order id från parametrar om det är en guest som valt att registrera sig
    const { orderId } = useParams();

    //Logga ut får att kunna registrera sig samt gå direkt till sign up
    useEffect(() => {
        if (orderId) {
            console.log("Order id: " + orderId);
            localStorage.clear();
            setSignUp(true);
        }
    }, []);

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

        //Save to local storage in case user refreshes/closes window
        localStorage.setItem('token', logInResponseData.token);

        localStorage.setItem('loggedIn', JSON.stringify(true));

        setLoggedIn(true);
    }

    const signup = async (e) => {
        e.preventDefault();

        //Send email before activating account
        const serviceId = 'service_krhq75r';
        const templateId = 'template_7v9fupt';
        const publicKey = 'llG6edCvnODXdraEf';
        const templateParams = {
            to_name: userData.firstName,
            to_email: userData.email,
            message: `Visit us at ${urlFrontendBasePath}`
        }

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then(
                () => {
                    console.log('Account activation email sent');
                },
                (error) => {
                    console.log('Account activation email failed: ', error);
                },
            );

        const signUpResponse = await fetch(`${urlBackendBasePath}/authentication/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!signUpResponse.ok) {
            throw new Error("Failed to sign up");
        }

        if (orderId) {
            // Retur objektet från sign up
            const signUpResponseData = await signUpResponse.json();
            const guestUserId = signUpResponseData.id;

            //Uppdatera order med user_id = guestUserId
            const updateShipmentResponse = await fetch(`${urlBackendBasePath}/orders/updateOrdersUser`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ UserId: guestUserId, OrderId: orderId }),
            });

            if (!updateShipmentResponse.ok) {
                throw new Error("Failed to update order's user id");
            }
        }

        setSignUp(false);
    }

    const guestLogin = () => {
        setUser({
            role: 2,
        });

        localStorage.setItem('user', JSON.stringify({ role: 2 }));  //Ta bort. Checka loggedIn !& user.role
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