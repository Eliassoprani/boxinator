import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import('./Sender.css')
import { urlBackendBasePath } from "../assets/strings.js";

function Sender() {
    const { userId } = useParams();
    const [senderData, setSenderData] = useState({});

    useEffect(() => {
        setSender();
    }, [userId]);

    async function setSender() {
        const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const fetchUserResponse = await fetch(`${urlBackendBasePath}/authentication/getUserById/${userId}`, {
            method: "GET",
            headers: headers
        });

        if (!fetchUserResponse.ok) {
            throw new Error("Failed to get user from the database");
        }

        const returnedUser = await fetchUserResponse.json();

        setSenderData(returnedUser);
    }


    return (
        <div className="sender" aria-label="sender information">
            <h2>Sender</h2>
            <p>User status: {senderData.role === 0 ? 'Admin' : senderData.role === 1 ? 'User' : 'Guest'}</p>
            <p>Sender id: {userId}</p>
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>{senderData.firstName} {senderData.lastName}</p>
            <p>Zip code: {senderData.zipCode}</p>
            <p>Country of residence: {senderData.countryOfResidence}</p>
            <p>Email address: {senderData.email}</p>
            <p>Phone number: {senderData.phone}</p>
        </div>
    )
}

export default Sender;