import { useState, useContext, useEffect } from "react";
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
    const [selectedStatus, setSelectedStatus] = useState(null); // Ändrar text i dropdown menyn
    const [senderId, setSenderId] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(orders);

    useEffect(() => {
        setFilteredOrders(orders);
    }, [orders]);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (e) => {
        const status = parseInt(e.target.value);
        setSelectedStatus(status !== -1 ? status : null);
        setFilteredOrders(status !== -1 ? orders.filter(order => order.status === status) : orders);
    };

    const findOrdersBySender = () => {
        setFilteredOrders(orders.filter(order => order.userId === senderId));
        setSelectedStatus(null);
    }

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
            <div className="order-nav">
                <select
                    className="status-dropdown"
                    value={selectedStatus !== null ? selectedStatus.toString() : '-1'} 
                    onChange={handleStatusChange}>
                    <option value="-1">All statuses</option>
                    {Object.keys(STATUS).map(statusKey => (
                        <option key={statusKey} value={parseInt(statusKey)}>{STATUS[statusKey]}</option>
                    ))}
                </select>

                <div className="filter-by-sender">
                    <label>
                        Find orders by sender id:
                        <input
                            type="text"
                            name="senderId"
                            value={senderId}
                            onChange={(event) => setSenderId(event.target.value)}
                        />
                    </label>
                    <button style={{backgroundColor: '#0a253bc7'}} onClick={findOrdersBySender}>Find</button>
                </div>
            </div>

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
                <p style={{ color: 'transparent' }}>Empty</p>
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
                        <p>{STATUS[order.status].toUpperCase()}</p>
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
