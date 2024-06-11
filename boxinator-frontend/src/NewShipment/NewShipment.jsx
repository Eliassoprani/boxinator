import { useState } from "react";
import ShipmentModal from "./ShipmentModal";
import ('./NewShipment.css')
import { UserContext } from "../App";
import { useContext } from 'react'

function NewShipment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lightTheme } = useContext(UserContext);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    return (
        <div className="new-shipment" id={lightTheme ? 'shipment-light' : 'shipment-dark'}>
            <h2>New Shipment</h2>
            <p>Shipments can be sent from Sweden, Norway, and Denmark to anywhere in the world.</p>
            <p>There is a set fee for shipments sent within Sweden, Norway, and Denmark, at SEK 100.</p>
            <p>The fee for shipments to other destination countries is based on the weight of the package.</p>
            <br />
            <button onClick={handleOpenModal}>Create new shipment</button>
            <ShipmentModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default NewShipment