import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { urlBackendBasePath } from "../assets/strings";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "./UpdateOrder";
import { UserContext } from "../App";

function ClaimOrder() {
    const navigate = useNavigate();
    const { email, orderId } = useParams();
    const { order, setOrder } = useContext(UserContext);
    const [registered, setRegistered] = useState(false);

    //Log out 
    localStorage.clear();

    useEffect(() => {
        claimOrder();
    });

    const claimOrder = async () => {
        //Check if user is registered by checking if email is in database
        const userResponse = await fetch(`${urlBackendBasePath}/authentication/getUserByEmail/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!userResponse.ok) {
            throw new Error("Failed to get user id");
        }

        const userId = await userResponse.json();

        //If email is not registered
        if (userId === "notRegistered") {
            console.log("User is not in database");

            setOrder(orderId);  //Handled in Login component at line 20

            console.log("Order set to " + orderId);
        }
        //If email is registered
        else {
            setRegistered(true);

            //Update order with user's id
            updateOrder(userId, orderId);
        }
    }

    const goToLogin = () => {
        //Go to log in for registered user / sign up for guest
        navigate("/");
    }

    return (
        <>
            {registered && (
                <p>Order {orderId} has been added to your account with email address: {email}</p>
            )}
            {!registered && (
                <p>To claim your order with order id: {order}, you will need to create an account.</p>
            )}
            <button onClick={goToLogin}>{registered ? "Log in" : "Sign up"}</button>
        </>
    )
}

export default ClaimOrder