import { useState, useContext } from "react";
import { UserContext } from "../../App";
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { urlBackendBasePath } from '../../assets/strings.js'

function OrderModal({ isOpen, closeModal, orderObj }) {
    const { user, token } = useContext(UserContext);
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

            const response = await fetch(`${urlBackendBasePath}/orders/updateOrder?OrderId=${orderObj.id}`, {   //Fungerar
                method: 'PUT',
                headers: headers,
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
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    orderId: PropTypes.string,
};

export default OrderModal;
