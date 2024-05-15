import { useState } from "react";
import ShipmentModal from "./ShipmentModal";

function NewShipment() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={handleOpenModal}>Create new shipment</button>
            <ShipmentModal
                isOpen={isModalOpen}
                onClose={closeModal} />
        </>
    )
}

export default NewShipment