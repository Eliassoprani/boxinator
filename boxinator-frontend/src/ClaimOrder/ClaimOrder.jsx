import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { urlBackendBasePath } from "../assets/strings";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "./UpdateOrder";
import { UserContext } from "../App";

function ClaimOrder() {
    const navigate = useNavigate();
    const { email, orderId } = useParams();
    const { order, setOrder } = useContext(UserContext);

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
            //Uppdatera order
            updateOrder(userId, orderId);

            //User feedback, modal
        }

        //Gå till log in / sign up
        navigate("/");
    }

    return (
        <>Verifying email and order id...</>
    )
}

export default ClaimOrder