import { useState, useContext } from "react";
import OrderModal from "./OrderModal";
import PropTypes from 'prop-types';
import { UserContext } from "../../App";
import('./OrderList.css')
import { useNavigate } from "react-router-dom";

function OrderList({ orders, setOrders }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

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

    const filteredOrders = selectedStatus !== null ? orders.filter(order => order.status === selectedStatus) : orders; // If selectedStatus is null, show all orders

    const handleStatusChange = (e) => {
        const status = parseInt(e.target.value);
        setSelectedStatus(status !== -1 ? status : null); // Set selectedStatus to null for "All statuses" option
    };

    function setBackgroundColor(status) {
        switch (status) {
            case 0:
                return '#C7E5EF';
            case 1:
                return '#C7C7C7';
            case 2:
                return '#EFE9C4';
            case 3:
                return '#BCED88';
            case 4:
                return '#E6D0C2';
            default:
                return '#FFF';
        }
    }


    return (
        <div className="order-list" >
            {/* Status filter dropdown */}
            <select
                className="status-dropdown"
                value={selectedStatus !== null ? selectedStatus.toString() : '-1'}
                onChange={handleStatusChange}>
                <option value="-1">All statuses</option>
                {Object.keys(STATUS).map(statusKey => (
                    <option key={statusKey} value={parseInt(statusKey)}>{STATUS[statusKey]}</option>
                ))}
            </select>

            <div className="order-item-top">
                        <p>Order ID:</p>
                        <p>Sender ID:</p>
                        <p>Recipient Name:</p>
                        <p>Destination Country:</p>
                        <p>Source Country:</p>
                        <p>Box Color:</p>
                        <p>Weight:</p>
                        <p>Cost:</p>
                        <p>Current Status:</p>
                    </div>

            {filteredOrders.map((order, index) => {
                const backgroundColor = setBackgroundColor(order.status);
                return (
                    <div className="order-item" key={index} style={{ backgroundColor: backgroundColor }}>
                        <p>{order.id}</p>
                        <p className="user-id" onClick={() => navigate(`/sender/${order.userId}`)}>{order.userId}</p>
                        <p>{order.recieverName}</p>
                        <p>{order.destinationCountry}</p>
                        <p>{order.sourceCountry}</p>
                        <p>{order.boxColor || 'N/A'}</p>
                        <p>{order.weight}</p>
                        <p>{order.cost}</p>
                        <p>{STATUS[order.status]}</p>
                        {user.role === 0 && <button onClick={() => handleOpenModal(order)}>Change Status</button>}
                    </div>
                );
            })}

            <OrderModal isOpen={isModalOpen} closeModal={closeModal} orderObj={selectedOrder} orders={orders} setOrders={setOrders} />
        </div>
    )
}

OrderList.propTypes = {
    orders: PropTypes.array,
    setOrders: PropTypes.func,
};

export default OrderList;
