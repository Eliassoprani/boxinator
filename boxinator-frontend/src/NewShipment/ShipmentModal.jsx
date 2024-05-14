import { useState, useContext } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import emailjs from '@emailjs/browser';

function ShipmentModal({ isOpen, closeModal }) {
    const { user } = useContext(UserContext);

    const initialState = {
        userId: user.id,
        recieverName: "",
        weight: 0,
        boxColor: "",
        destinationCountry: "",
        orderStatus: 0,
        sourceCountry: user.countryOfResidence,
    }

    const [shipmentData, setShipmentData] = useState(initialState);
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));
    };

    const submitNewShipment = async (e) => {

        //För att sidan ej ska ladda om när man klickar submit
        e.preventDefault();

        console.log(shipmentData);

        const newShipmentResponse = await fetch("http://localhost:5012/orders/createAnOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shipmentData),
        });

        if (!newShipmentResponse.ok) {
            throw new Error("Failed to create a new order");
        }

        // Retur objektet
        const responseData = await newShipmentResponse.json();

        const toName = user.role === 2 ? 'guest' : user.firstName;
        const toEmail = user.role === 2 ? email : user.email;

        const serviceId = 'service_krhq75r';
        const templateId = 'template_86k79yo';
        const publicKey = 'llG6edCvnODXdraEf';
        const templateParams = {
            to_name: toName,
            to_email: toEmail,
            message: `Order id: ${responseData.id} 
            Receiver name: ${responseData.recieverName} 
            Weight: ${responseData.weight}`
        }

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );

        // Close modal
        closeModal();

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
                        <br />
                        <input
                            type="text"
                            name="recieverName"
                            value={shipmentData.recieverName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Weight:
                        <br />
                        <input
                            type="number"
                            name="weight"
                            value={shipmentData.weight}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Box colour:
                        <br />
                        <input
                            type="color"
                            name="boxColor"
                            value={shipmentData.boxColor}
                            onChange={handleChange}
                        />
                        <p className="picked-color">{shipmentData.boxColor}</p>
                    </label>

                    <label>
                        Destination country:
                        <br />
                        <input
                            type="text"
                            name="destinationCountry"
                            value={shipmentData.destinationCountry}
                            onChange={handleChange}
                        />
                    </label>

                    {user.role === "guest" && (
                        <>
                            <label>
                                Source country:
                                <br />
                                <input
                                    type="text"
                                    name="sourceCountry"
                                    value={shipmentData.sourceCountry}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                Your email:
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </>
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