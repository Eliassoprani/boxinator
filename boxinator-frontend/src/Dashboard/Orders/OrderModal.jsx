import { useState, useContext } from "react";
import { UserContext } from "../../App";
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { urlBackendBasePath } from '../../assets/strings.js'

function OrderModal({ isOpen, closeModal, orderObj, orders, setOrders }) {
    const { token, user } = useContext(UserContext);
    const [selectedStatus, setSelectedStatus] = useState(0);

    const STATUS = Object.freeze({
        0: "Created",
        1: "Received",
        2: "InTransit",
        3: "Completed",
        4: "Cancelled"
    });

    const changeStatus = async () => {
        const data = {
            orderStatus: selectedStatus
        };        

        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const response = await fetch(`${urlBackendBasePath}/orders/updateOrder?OrderId=${orderObj.id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            //Copy 'orders'
            const updatedOrders = [...orders];

            //Find index of the order
            const orderIndex = updatedOrders.findIndex(order => order.id === orderObj.id);

            if (orderIndex !== -1) {
                orderObj.status = selectedStatus;

                //Replace the old object 'updatedOrders[orderIndex]' with the new updated object 'orderObj'
                updatedOrders[orderIndex] = { ...updatedOrders[orderIndex], orderObj: orderObj };

                setOrders(updatedOrders);

                closeModal();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }


    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div className="modal-title">
                <h2>Update status</h2>
                <button className="close-button" onClick={closeModal}>X</button>
            </div>

            {user.role === 0 && (
                <select
                    className="status-dropdown"
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(parseInt(e.target.value))}>
                    {Object.keys(STATUS).map(statusKey => (
                        <option key={statusKey} value={statusKey}>{STATUS[statusKey]}</option>
                    ))}
                </select>
            )}

            <button onClick={changeStatus}>Update Status</button>
        </Modal>
    )
}

OrderModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    orderObj: PropTypes.object,
    orders: PropTypes.array,
    setOrders: PropTypes.func,
};

export default OrderModal;
