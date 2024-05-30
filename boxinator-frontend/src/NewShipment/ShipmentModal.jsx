import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import { urlBackendBasePath, guestUserId } from '../assets/strings.js'
import { orderConfirmationEmail } from "../Email/OrderConfirmation.js";
import { calculateCost } from "./CalculateCost.js";
import UserInput from './UserInput.jsx';


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
    const [multiplier, setMultiplier] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (user.hasOwnProperty('role')) {
            setShipmentData((prevShipmentData) => ({
                ...prevShipmentData,
                userId: user.id,
                email: user.email,
                sourceCountry: user.countryOfResidence
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
            <div className="user-input">
                <form>
                    <div className="modal-title">
                        <h2>New Shipment</h2>
                        <button className="close-button" onClick={closeModal}>X</button>
                    </div>

                    {!thankYouNote && (
                        <UserInput shipmentData={shipmentData} setShipmentData={setShipmentData} setMultiplier={setMultiplier} setSubmitDisabled={setSubmitDisabled} />
                    )}

                    <button className="calc-btn" onClick={calculate}>Calculate</button>

                    <div className="cost">Cost is: {shipmentData.cost}</div>

                    <input
                        disabled={submitDisabled}
                        className="form-submit"
                        type="submit"
                        value="Submit"
                        onClick={submitNewShipment}
                    />

                    {thankYouNote && (
                        <p>Thank you for your order! Check your inbox for a confirmation email.</p>
                    )}
                </form>
            </div>
        </Modal >
    )
}

ShipmentModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func
};

export default ShipmentModal