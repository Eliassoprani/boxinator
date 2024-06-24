import { useState, useContext, useEffect } from "react";
import OrderModal from "./OrderModal";
import PropTypes from 'prop-types';
import { UserContext } from "../../App";
import('./OrderList.css')
import { useNavigate } from "react-router-dom";

function OrderList({ orders, setOrders }) {
    const { user, lightTheme } = useContext(UserContext);
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
    const [selectedStatus, setSelectedStatus] = useState(null); //Changes the text in the dropdown menu
    const [fullTextSearch, setFullTextSearch] = useState("");
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

    const findOrders = () => {
        setSelectedStatus(null);
        setFilteredOrders(orders.filter(object =>
            Object.values(object).some(value =>
                String(value).toLowerCase().includes(fullTextSearch.toLowerCase())
            )));
    }

    const clearFullTextSearch = () => {
        setFilteredOrders(orders);
        setSelectedStatus("");
        setFullTextSearch("");
    }

    const sortByColumn = (property) => {
        const sortedOrders = [...orders].sort((a, b) => a[property] - b[property]);
        setFilteredOrders(sortedOrders);
    }

    function setBackgroundColor(status) {
        switch (status) {
            case 0:
                return '#C7E5EF';
            case 1:
                return '#D5D5D5';
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
        <div className="order-list" id={lightTheme ? 'orders-light' : 'orders-dark'} aria-label="order table">
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

                <section className="full-text-search">
                    <label htmlFor="fullTextSearch">
                        Full text search:
                        <input
                            id="fullTextSearch"
                            type="text"
                            name="fullTextSearch"
                            value={fullTextSearch}
                            onChange={(event) => setFullTextSearch(event.target.value)}
                        />
                    </label>
                    <button onClick={findOrders}>Find</button>
                    <button onClick={clearFullTextSearch}>Clear all</button>
                </section>
            </div>

            <p style={{ marginLeft: '17px' }}>Number of orders: {filteredOrders.length}</p>

            <table className="order-table">
                <thead>
                    <tr>
                        <th className="sort-column" onClick={() => sortByColumn('id')}>Order ID ▼</th>
                        <th>Sender ID</th>
                        <th>Recipient Name</th>
                        <th>Destination Country</th>
                        <th>Source Country</th>
                        <th>Box Color</th>
                        <th className="sort-column" onClick={() => sortByColumn('weight')}>Weight ▼</th>
                        <th className="sort-column" onClick={() => sortByColumn('cost')}>Cost ▼</th>
                        <th>Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => {
                        const backgroundColor = setBackgroundColor(order.status);
                        return (
                            <tr key={index} style={{ backgroundColor: backgroundColor }}>
                                <td>{order.id}</td>
                                <td className="user-id" onClick={() => navigate(`/sender/${order.userId}`)}>{order.userId}</td>
                                <td>{order.recieverName}</td>
                                <td>{order.destinationCountry}</td>
                                <td>{order.sourceCountry}</td>
                                <td>{order.boxColor !== 'N/A' && (
                                    <span className="color-box" style={{ backgroundColor: order.boxColor }}></span>)}
                                    {order.boxColor || 'N/A'}
                                </td>
                                <td>{order.weight}</td>
                                <td>{order.cost}</td>
                                <td>{STATUS[order.status].toUpperCase()}</td>
                                {user.role === 0 && (
                                    <td>
                                        <button style={{ backgroundColor: 'var(--dark-btn)' }} onClick={() => handleOpenModal(order)}>Update Status</button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <OrderModal isOpen={isModalOpen} closeModal={closeModal} orderObj={selectedOrder} orders={orders} setOrders={setOrders} />
        </div>
    )
}

OrderList.propTypes = {
    orders: PropTypes.array,
    setOrders: PropTypes.func,
};

export default OrderList;
