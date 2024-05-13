import { useState } from "react";
import OrderModal from "./OrderModal";

function OrderList({ orders }) {
    const STATUS = Object.freeze({ 
        0: "Created", 
        1: "Received",
        2: "InTransit",
        3: "Completed",
        4: "Cancelled"
    }); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{
            backgroundColor: "#e8e9eb",
            padding: "10px",
            border: '1px',
            borderRadius: '10px'
        }}>
            {orders.map((order, index) => {
                return (
                    <div key={index} style={{
                        backgroundColor: "white",
                        padding: "10px",
                        margin: "10px",
                        border: '1px',
                        borderRadius: '10px',
                    }}>
                        <p>ID: {order.id}</p>
                        <p>Recipient: {order.recieverName}</p>
                        <p>Weight: {order.weight}</p>
                        <p>Country ID: {order.countryId}</p>
                        <p>Status: {STATUS[order.status]}</p>
                        <button onClick={() => handleOpenModal(order)}>Change Status</button>
                    </div>
                );
            })}
            <OrderModal isOpen={isModalOpen} closeModal={closeModal} orderObj={selectedOrder} />
        </div>
    )
}

export default OrderList;
