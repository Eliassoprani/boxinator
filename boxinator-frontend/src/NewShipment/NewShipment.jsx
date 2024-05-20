import { useState } from "react";
import ShipmentModal from "./ShipmentModal";
import ('./NewShipment.css')

function NewShipment() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="new-shipment">
            <h2>New Shipment</h2>
            <button onClick={handleOpenModal}>Create new shipment</button>
            <ShipmentModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default NewShipment