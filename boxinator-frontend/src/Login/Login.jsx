import './Login.css'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App";
import UserInfo from '../UserInfo/UserInfo';
import emailjs from '@emailjs/browser';
import { useParams } from "react-router-dom";

function Login() {
    const { user, setUser, setLoggedIn } = useContext(UserContext);

    const [signUp, setSignUp] = useState(false);
    const [userData, setUserData] = useState({});

    //Hämta order id från parametrar om det är en guest som valt att registrera sig
    const { orderId } = useParams();
    //Logga ut får att kunna registrera sig samt gå direkt till sign up
    useEffect(() => {
        if (orderId) {
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

        const logInResponse = await fetch("http://localhost:5012/authentication/login", {
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

    const signup = async (e) => {
        e.preventDefault();

        //Send email before activating account
        const serviceId = 'service_krhq75r';
        const templateId = 'template_7v9fupt';
        const publicKey = 'llG6edCvnODXdraEf';
        const templateParams = {
            to_name: userData.firstName,
            to_email: userData.email,
            message: `Visit us at http://localhost:5173/`
        }

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );

        userData.dateOfBirth = userData.dateOfBirth + "T08:59:07.200Z"

        const signUpResponse = await fetch("http://localhost:5012/authentication/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!signUpResponse.ok) {
            throw new Error("Failed to sign up");
        }

        // Retur objektet från sign up
        const signUpResponseData = await signUpResponse.json();
        const guestUserId = signUpResponseData.id;  //Korrekt id

        //Uppdatera order med user_id = guestUserId
        const updateShipmentResponse = await fetch("http://localhost:5012/orders/updateOrdersUser", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ UserId: guestUserId, OrderId: orderId }),    //OrderId kommer ej med till BE
        });

        if (!updateShipmentResponse.ok) {
            console.log("Log: " + JSON.stringify(signUpResponseData));
            throw new Error("Failed to update order's user id");
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