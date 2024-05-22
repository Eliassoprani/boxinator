import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import { urlBackendBasePath, guestUserId } from '../assets/strings.js'
import { orderConfirmationEmail } from "../Email/OrderConfirmation.js";
import { fetchCountries } from "./FetchCountries.js";
import { calculateCost } from "./CalculateCost.js";

function ShipmentModal({ isOpen, closeModal }) {
    const initialState = {
        userId: guestUserId,
        email: "",
        recieverName: "",
        weight: 0,
        boxColor: "",
        destinationCountry: "",
        orderStatus: 0,
        sourceCountry: "",
        cost: 0
    }

    const [shipmentData, setShipmentData] = useState(initialState);
    const { user, allCountries } = useContext(UserContext);
    const [thankYouNote, setThankYouNote] = useState(false);
    const [countries, setCountries] = useState([]);
    const [multiplier, setMultiplier] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));

        if (inputName === "sourceCountry") {
            var country = countries.find(country => country.countryName === inputValue);
            setMultiplier(country.multiplier);
        }

        setSubmitDisabled(true);
    }

    useEffect(() => {
        console.log(allCountries);

        fetchCountries(setCountries);

        if (user.hasOwnProperty('role')) {
            setShipmentData({ ...shipmentData, userId: user.id });
            setShipmentData({ ...shipmentData, email: user.email });
            setShipmentData({ ...shipmentData, sourceCountry: user.countryOfResidence });
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
                        <>
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
                                <select
                                    className="dropdown"
                                    name="destinationCountry"
                                    value={shipmentData.destinationCountry}
                                    onChange={handleChange}
                                >
                                    {allCountries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </label>

                            {!user.hasOwnProperty('role') && (
                                <>
                                    <label>
                                        Source country:
                                        <select
                                            className="dropdown"
                                            name="sourceCountry"
                                            value={shipmentData.sourceCountry}
                                            onChange={handleChange}
                                        >
                                            <option value="Sweden">Sweden</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Denmark">Denmark</option>
                                        </select>
                                    </label>

                                    <label>
                                        Your email:
                                        <input
                                            type="email"
                                            name="email"
                                            value={shipmentData.email}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </>
                            )}

                            <button onClick={calculate}>Calculate</button>

                            <div>Cost is: {shipmentData.cost}</div>

                            <input
                                disabled={submitDisabled}
                                className="form-submit"
                                type="submit"
                                value="Submit"
                                onClick={submitNewShipment}
                            />
                        </>
                    )}
                    {thankYouNote && (
                        <p>Thank you for your order! Check your inbox for a confirmation email.</p>
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