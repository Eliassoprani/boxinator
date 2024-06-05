import { useEffect, useState } from 'react'
import OrderList from '../Orders/OrderList';
import { urlBackendBasePath } from '../../assets/strings.js'

function RoleDashboard({ pathEnd }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const fetchOrdersResponse = await fetch(`${urlBackendBasePath}/orders/${pathEnd}`, {
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

export default RoleDashboard