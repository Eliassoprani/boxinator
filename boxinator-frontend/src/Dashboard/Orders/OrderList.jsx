import { useState } from "react";
import OrderModal from "./OrderModal";

function OrderList({ orders, user }) {
    const STATUS = Object.freeze({
        0: "Created",
        1: "Received",
        2: "InTransit",
        3: "Completed",
        4: "Cancelled"
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(null); // State to store selected status filter

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filteredOrders = selectedStatus !== null
        ? orders.filter(order => order.status === selectedStatus)
        : orders; // If selectedStatus is null, show all orders

    const handleStatusChange = (e) => {
        const status = parseInt(e.target.value);
        setSelectedStatus(status !== -1 ? status : null); // Set selectedStatus to null for "All statuses" option
    };

    return (
        <div style={{
            color: "#000",
            backgroundColor: "#e8e9eb",
            padding: "10px",
            border: '1px',
            borderRadius: '10px'
        }}>
            {/* Status filter dropdown */}
            <select value={selectedStatus !== null ? selectedStatus.toString() : '-1'} onChange={handleStatusChange}>
                <option value="-1">All statuses</option>
                {Object.keys(STATUS).map(statusKey => (
                    <option key={statusKey} value={parseInt(statusKey)}>{STATUS[statusKey]}</option>
                ))}
            </select>
            
            {filteredOrders.map((order, index) => {
                let backgroundColor;
                switch (order.status) {
                    case 0:
                        backgroundColor = '#C7E5EF';
                        break;
                    case 1:
                        backgroundColor = '#C7C7C7';
                        break;
                    case 2:
                        backgroundColor = '#EFE9C4';
                        break;
                    case 3:
                        backgroundColor = '#BCED88';
                        break;
                    case 4:
                        backgroundColor = '#E6D0C2';
                        break;
                    default:
                        backgroundColor = '#FFF';
                        break;
                }
                return (
                    <div key={index} style={{
                        backgroundColor: backgroundColor,
                        padding: "10px",
                        margin: "10px",
                        border: '1px',
                        borderRadius: '10px',
                    }}>
                        <p>ID: {order.id}</p>
                        <p>Recipient: {order.recieverName}</p>
                        <p>Weight: {order.weight}</p>
                        <p>Country ID: {order.sourceCountry}</p>
                        <p>Status: {STATUS[order.status]}</p>
                        {user.role === 0 && <button onClick={() => handleOpenModal(order)}>Change Status</button>}
                    </div>
                );
            })}
            <OrderModal isOpen={isModalOpen} closeModal={closeModal} orderObj={selectedOrder} />
        </div>
    )
}

export default OrderList;
