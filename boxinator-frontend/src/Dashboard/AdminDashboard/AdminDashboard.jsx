import { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../App";
import OrderList from './OrderList';

function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, [])

    async function fetchOrders() {
        const fetchOrdersResponse = await fetch("http://localhost:5012/orders/getAllOrders", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: '{"email": "abc@abc.com", "password": "ABCdef123"}'
        });
        

    if (!fetchOrdersResponse.ok) {
        throw new Error("Failed to get orders from database");
    }

    let orders = await fetchOrdersResponse.json()

    console.log(orders);

    setOrders(orders)
}

return (
    <>
        <button>Refresh shipments</button>
        <OrderList orders={orders} />
    </>
)
}

export default AdminDashboard