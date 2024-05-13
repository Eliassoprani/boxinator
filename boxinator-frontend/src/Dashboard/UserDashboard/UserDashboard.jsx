import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import OrderList from '../AdminDashboard/OrderList';

function UserDashboard() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const fetchOrdersResponse = await fetch(`http://localhost:5012/orders/getAllUserOrders?UserId=${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!fetchOrdersResponse.ok) {
            throw new Error("Failed to get orders from database");
        }

        let orders = await fetchOrdersResponse.json();

        setOrders(orders);
    }

    return (
        <>
            <button onClick={fetchOrders}>Refresh shipments</button>
            <OrderList orders={orders} />
        </>
    )
}

export default UserDashboard