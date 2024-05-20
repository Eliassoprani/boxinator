import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import { urlBackendBasePath, guestUserId } from '../assets/strings.js'
import { orderConfirmationEmail } from "../Email/OrderConfirmation.js";

function ShipmentModal({ isOpen, closeModal }) {
    const { user, token } = useContext(UserContext);
    const [thankYouNote, setThankYouNote] = useState(false);

    const initialState = {
        userId: guestUserId,
        email: "",
        recieverName: "",
        weight: 0,
        boxColor: "",
        destinationCountry: "",
        orderStatus: 0,
        sourceCountry: user.countryOfResidence,
    }

    const [shipmentData, setShipmentData] = useState(initialState);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));

        console.log(inputName + " " + inputValue);
    };

    useEffect(() => {
        //Basic user id för alla guests
        if (user.hasOwnProperty('role')) {
            console.log("in own property");
            setShipmentData({ ...shipmentData, userId: user.id });
            setShipmentData({ ...shipmentData, email: user.email });
        }
    }, []);

    const submitNewShipment = async (e) => {
        e.preventDefault();
        console.log(shipmentData);
        console.log("token: " + token);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const newShipmentResponse = await fetch(`${urlBackendBasePath}/orders/createAnOrder`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(shipmentData),
        });

        if (!newShipmentResponse.ok) {
            throw new Error("Failed to create a new order");
        }

        // Retur objektet
        const responseData = await newShipmentResponse.json();

        //Skicka email
        //orderConfirmationEmail(user, shipmentData.email, responseData);

        setThankYouNote(true);

        closeModal();
    }

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div className="new-shipment">
                <form className="form">
                    <button className="close-button" onClick={closeModal}>X</button>

                    {!thankYouNote && (
                        <>
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
                                    style={{
                                        backgroundColor: shipmentData.boxColor,
                                        cursor: "pointer",
                                        outline: "none",
                                        width: "70px",
                                        height: "70px",
                                    }}
                                    type="color"
                                    name="boxColor"
                                    value={shipmentData.boxColor}
                                    onChange={handleChange}
                                />
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

                            {!user.hasOwnProperty('role') && (
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
                                            value={shipmentData.email}
                                            onChange={handleChange}
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
                        </>
                    )}
                    {thankYouNote && (
                        <div>Thank you for your order!</div>
                    )}
                </form>
            </div>
        </Modal>
    )
}

ShipmentModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func
};

export default ShipmentModal