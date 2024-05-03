import { useState, useContext } from "react";
import { UserContext } from "../App";
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';

function ShipmentModal({ isOpen, closeModal }) {
    const { user } = useContext(UserContext);

    const initialState = {
        receiverName: "",
        weight: "",
        boxColour: "",
        destinationCountry: "",
        email: "",
    }

    const [shipmentData, setShipmentData] = useState(initialState);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));
    };

    const submitNewShipment = async () => {
        //todo: post to database

        // Close modal
        closeModal();

        //todo: set up thank you note
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="New Shipment Prompt"
        >
            <div className="new-shipment">
                <form className="form">
                    <h2>New Shipment</h2>

                    <label>
                        Receiver name:
                        <input
                            type="text"
                            name="receiverName"
                            value={shipmentData.receiverName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Weight:
                        <input
                            type="text"
                            name="weight"
                            value={shipmentData.weight}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Box colour:
                        <input
                            type="text"
                            name="boxColour"
                            value={shipmentData.boxColour}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Destination country:
                        <input
                            type="text"
                            name="destinationCountry"
                            value={shipmentData.destinationCountry}
                            onChange={handleChange}
                        />
                    </label>

                    {user.role === "guest" && (
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={shipmentData.email}
                                onChange={handleChange}
                            />
                        </label>
                    )}

                    <input
                        className="form-submit"
                        type="submit"
                        value="submit"
                        onClick={submitNewShipment}
                    />
                </form>
            </div>
        </Modal>
    )
}

ShipmentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

export default ShipmentModal