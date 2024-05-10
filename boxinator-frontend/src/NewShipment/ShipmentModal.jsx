import { useState, useContext } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';

function ShipmentModal({ isOpen, closeModal }) {
    const { user } = useContext(UserContext);

    const initialState = {
        userId: user.id,
        recieverName: "",
        weight: 2,
        boxColor: "",
        destinationCountry: "",
        orderStatus: 1,
        //sourceCountry: "",
    }

    const [shipmentData, setShipmentData] = useState(initialState);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));
        console.log("from handleChange " + inputValue);
        console.log("user id" + shipmentData.userId)
    };

    const submitNewShipment = async (e) => {

        e.preventDefault();

        console.log(shipmentData);

        const newShipmentResponse = await fetch("http://localhost:5012/orders/createAnOrder", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shipmentData),
        });

        // I objektet som returneras från posten finns order id som kan länka en guest till en order. Ska skickas med all annan info till guest's email

        if (!newShipmentResponse.ok) {
            throw new Error("Failed to create a new order");
        }

        // Close modal
        closeModal();

        //todo: send email
        //todo: set up thank you note
    }

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="New Shipment Prompt"
        >
            <div className="new-shipment">
                <form className="form">
                    <button className="close-button" onClick={closeModal}>X</button>

                    <h2>New Shipment</h2>

                    <label>
                        Receiver name:
                        <input
                            type="text"
                            name="recieverName"
                            value={shipmentData.recieverName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Weight:
                        <input
                            type="number"
                            name="weight"
                            value={shipmentData.weight}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Box colour:
                        <input
                            type="color"
                            name="boxColor"
                            value={shipmentData.boxColor}
                            onChange={handleChange}
                        />
                        <p className="picked-color">{shipmentData.boxColor}</p>
                    </label>

                    {user.role === "guest" && (
                        <label>
                            Source country:
                            <input
                                type="text"
                                name="sourceCountry"
                                value={shipmentData.sourceCountry}
                                onChange={handleChange}
                            />
                        </label>
                    )}

                    <label>
                        Destination country:
                        <input
                            type="text"
                            name="destinationCountry"
                            value={shipmentData.destinationCountry}
                            onChange={handleChange}
                        />
                    </label>

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