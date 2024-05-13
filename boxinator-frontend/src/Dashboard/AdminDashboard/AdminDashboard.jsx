import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import OrderList from '../Orders/OrderList';

function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const token = user.token; // Get the token from the user object
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        };

        const fetchOrdersResponse = await fetch("http://localhost:5012/orders/getAllOrders", {
            method: "GET",
            headers: headers // Pass the headers object
        });

        if (!fetchOrdersResponse.ok) {
            throw new Error("Failed to get orders from the database");
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