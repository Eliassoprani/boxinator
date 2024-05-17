import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { urlBackendBasePath } from "../assets/strings";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "./UpdateOrder";

function ClaimOrder() {
    const navigate = useNavigate();
    const { email, orderId } = useParams();

    //Logga ut får att kunna registrera sig samt gå direkt till sign up
    console.log("Order id: " + orderId);
    console.log("Guest email: " + email);
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

            //Go to sign up
            navigate(`/${orderId}`);
        }
        //Om email finns
        else {
            //Uppdatera order
            updateOrder(userId, orderId);

            //Gå till log in
            navigate("/");
        }
    }

    return (
        <>Please hold</>
    )
}

export default ClaimOrder