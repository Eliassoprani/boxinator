import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import OrderList from '../Orders/OrderList';
import { urlBackendBasePath } from '../../assets/strings.js'

function UserDashboard() {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const fetchOrdersResponse = await fetch(`${urlBackendBasePath}/orders/getAllUserOrders`, {
            method: "GET",
            headers: headers
        });

        if (!fetchOrdersResponse.ok) {
            throw new Error("Failed to get orders from the database");
        }

        const orders = await fetchOrdersResponse.json();
        setOrders(orders);
    }

    return (
        <OrderList orders={orders} setOrders={setOrders} />
    )
}

export default UserDashboard