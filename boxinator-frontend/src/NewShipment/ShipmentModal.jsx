import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import('./ShipmentModal.css');
import Modal from 'react-modal';
Modal.setAppElement('#root'); // Set the root element for accessibility
import PropTypes from 'prop-types';
import { urlBackendBasePath, guestUserId } from '../assets/strings.js'
import { orderConfirmationEmail } from "../Email/OrderConfirmation.js";
import { fetchCountries } from "./FetchCountries.js";

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
    const { user } = useContext(UserContext);
    const [thankYouNote, setThankYouNote] = useState(false);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData((shipmentData) => ({
            ...shipmentData,
            [inputName]: inputValue,
        }));

        if (inputName === "sourceCountry") {
            var countryInList = countries.find(country => country.countryName === inputValue);
            if (countryInList === undefined) {
                console.log("wrong source country");
            }
            else {
                setCountry(countryInList);
            }
        }

        setSubmitDisabled(true);
    }

    const calculateCost = (e) => {
        e.preventDefault();

        //Kolla så alla fält är ifyllda
        if (shipmentData.weight === 0 || shipmentData.sourceCountry === "" || shipmentData.destinationCountry === "" || shipmentData.email === "") {
            console.log("wrong fields");
            return;
        }

        if (shipmentData.destinationCountry === "Sweden" || shipmentData.destinationCountry === "Norway" || shipmentData.destinationCountry === "Denmark") {
            //Flat rate
            setShipmentData({ ...shipmentData, cost: 100 });
        }
        else {
            var calculatedCost = country.multiplier * shipmentData.weight;
            setShipmentData({ ...shipmentData, cost: calculatedCost });
        }

        setSubmitDisabled(false);
    }

    useEffect(() => {
        if (user.hasOwnProperty('role')) {
            setShipmentData({ ...shipmentData, userId: user.id });
            setShipmentData({ ...shipmentData, email: user.email });
            setShipmentData({ ...shipmentData, countryOfResidence: user.countryOfResidence });
        }
    }, []);

    useEffect(() => {
        fetchCountries(setCountries);
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

        // Retur objektet
        const responseData = await newShipmentResponse.json();

        //Skicka email
        //orderConfirmationEmail(user, shipmentData.email, responseData);

        setThankYouNote(true);
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
                                        <input
                                            type="text"
                                            name="sourceCountry"
                                            value={shipmentData.sourceCountry}
                                            onChange={handleChange}
                                        />
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

                            <button onClick={calculateCost}>Calculate</button>

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