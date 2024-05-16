import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import OrderList from '../Orders/OrderList';
import { urlBackendBasePath } from '../../assets/strings.js'

function AdminDashboard() {
    const { user, token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        };

        const fetchOrdersResponse = await fetch(`${urlBackendBasePath}/orders/getAllOrders`, {
            method: "GET",
            headers: headers // Pass the headers object
        });

        if (!fetchOrdersResponse.ok) {
            throw new Error("Failed to get orders from the database");  //Problem
        }

        const orders = await fetchOrdersResponse.json();
        setOrders(orders);
    }

    return (
        <>
            <button onClick={fetchOrders}>Refresh shipments</button>
            <OrderList orders={orders} user={user} />
        </>
    )
}

export default AdminDashboard