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

    //Logga ut får att kunna registrera sig samt gå direkt till sign up
    localStorage.clear();

    useEffect(() => {
        claimOrder();
    });

    const claimOrder = async () => {
        //Kolla om email finns i databasen
        const userResponse = await fetch(`${urlBackendBasePath}/authentication/getUserByEmail/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!userResponse.ok) {
            throw new Error("Failed to get user id");
        }

        const userId = await userResponse.json();

        //Om email inte finns registrerad
        if (userId === "notRegistered") {
            console.log("User is not in database");

            setOrder(orderId);
            console.log("Order set to " + orderId);
        }
        //Om email finns
        else {
            setRegistered(true);

            //Uppdatera order
            updateOrder(userId, orderId);
        }
    }

    const goToLogin = () => {
        //Gå till log in / sign up
        navigate("/");
    }

    return (
        <>
            {registered && (
                <div>
                    Order {orderId} has been added to your account with email address: {email}
                </div>
            )}
            {!registered && (
                <div>
                    To claim your order with order id: {orderId}, you will need to create an account.
                </div>
            )}
            <button onClick={goToLogin}>{registered ? "Log in" : "Sign up"}</button>
        </>
    )
}

export default ClaimOrder