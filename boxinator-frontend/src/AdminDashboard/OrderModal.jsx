import { useState, useContext } from "react";
import { UserContext } from "../App";
import '../NewShipment/ShipmentModal.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

function OrderModal({ isOpen, closeModal, orderObj }) {
    const { user } = useContext(UserContext);
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
            const response = await fetch(`http://localhost:5012/orders/updateOrder?OrderId=${orderObj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            closeModal();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }



    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="New Shipment Prompt"
        >
            <h2>Change Order Status</h2>
            <select value={selectedStatus} onChange={e => setSelectedStatus(parseInt(e.target.value))}>
                {Object.keys(STATUS).map(statusKey => (
                    <option key={statusKey} value={statusKey}>{STATUS[statusKey]}</option>
                ))}
            </select>
            <button onClick={changeStatus}>Update Status</button>
        </Modal>
    )
}

OrderModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    orderId: PropTypes.string.isRequired,
};

export default OrderModal;
