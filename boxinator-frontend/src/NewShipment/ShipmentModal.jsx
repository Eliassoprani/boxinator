import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import { urlBackendBasePath, guestUserId } from '../assets/strings.js'
import { orderConfirmationEmail } from "../Email/OrderConfirmation.js";
import { calculateCost } from "./CalculateCost.js";
import UserInput from './UserInput/UserInput.jsx';


function ShipmentModal({ isOpen, closeModal }) {
    const initialState = {
        userId: guestUserId,
        email: "",
        recieverName: "",
        weight: 0,
        boxColor: "",
        destinationCountry: "Afghanistan",
        orderStatus: 0,
        sourceCountry: "Sweden",
        cost: 0
    }

    const [shipmentData, setShipmentData] = useState(initialState);
    const { user } = useContext(UserContext);
    const [thankYouNote, setThankYouNote] = useState(false);
    const [multiplier, setMultiplier] = useState(1);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (user.role === 0 || user.role === 1) {
            setShipmentData((prevShipmentData) => ({
                ...prevShipmentData,
                userId: user.id,
                email: user.email,
                sourceCountry: user.countryOfResidence !== "" ? user.countryOfResidence : "Sweden"
            }));
        }
    }, []);

    const submitNewShipment = async (e) => {
        e.preventDefault();
        console.log(shipmentData);

        const newShipmentResponse = await fetch(`${urlBackendBasePath}/orders/createAnOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shipmentData),
        });

        if (!newShipmentResponse.ok) {
            throw new Error("Failed to create a new order");
        }

        const responseData = await newShipmentResponse.json();

        //Skicka email
        //orderConfirmationEmail(user, shipmentData.email, responseData);

        setThankYouNote(true);
    }

    const calculate = (e) => {
        e.preventDefault();

        calculateCost(shipmentData, setShipmentData, multiplier, setSubmitDisabled);
    }

    return (
        <Modal
            className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <form>
                <div className="modal-title">
                    <h2>New Shipment</h2>
                    <button className="close-button" onClick={closeModal}>X</button>
                </div>

                {!thankYouNote && (
                    <section>
                        <UserInput shipmentData={shipmentData} setShipmentData={setShipmentData} setMultiplier={setMultiplier} setSubmitDisabled={setSubmitDisabled} />

                        <div className="calc-submit">
                            <button className="calc-btn" onClick={calculate}>Calculate</button>

                            <p className="cost" aria-live="polite">Cost is SEK {shipmentData.cost}</p>

                            <input
                                disabled={submitDisabled}
                                className="form-submit"
                                type="submit"
                                value="Submit"
                                onClick={submitNewShipment}
                            />
                        </div>
                    </section>
                )}

                {thankYouNote && (
                    <section>
                        <br />
                        <p>Thank you for your order!</p>
                        <p>Check your inbox for a confirmation email.</p>
                        <br />
                        <button style={{ marginRight: 'auto' }} className="close-button" onClick={closeModal}>Close</button>
                    </section>
                )}
            </form>
        </Modal >
    )
}

ShipmentModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func
};

export default ShipmentModal