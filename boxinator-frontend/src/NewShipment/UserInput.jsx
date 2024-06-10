import { useEffect, useState, useContext } from "react";
import { fetchCountries } from "./FetchCountries.js";
import { UserContext } from "../App.jsx";

function UserInput({ shipmentData, setShipmentData, setMultiplier, setSubmitDisabled }) {
    const { user, allCountries } = useContext(UserContext);
    const [sourceCountries, setSourceCountries] = useState([]);

    useEffect(() => {
        fetchCountries(setSourceCountries);
    }, []);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName === 'weight' && inputValue < 0) {
            return;
        }

        setShipmentData((prevShipmentData) => ({
            ...prevShipmentData,
            [inputName]: inputValue,
        }));

        if (inputName === "sourceCountry") {
            var country = sourceCountries.find(country => country.countryName === inputValue);
            setMultiplier(country.multiplier);
        }

        setSubmitDisabled(true);
    }

    return (
        <>
            <label htmlFor="receiverName">
                Receiver name:
                <input
                    id="receiverName"
                    type="text"
                    name="recieverName"
                    value={shipmentData.recieverName}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="weight">
                Weight:
                <input
                    id="weight"
                    type="number"
                    name="weight"
                    value={shipmentData.weight}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="boxColor">
                Box colour:
                <input
                    id="boxColor"
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

            <label htmlFor="destinationCountry">
                Destination country:
                <select
                    id="destinationCountry"
                    className="dropdown"
                    name="destinationCountry"
                    value={shipmentData.destinationCountry}
                    onChange={handleChange}
                >
                    {allCountries && allCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>

            {!user.sourceCountry && (
                <label htmlFor="sourceCountry">
                    Source country:
                    <select
                        id="sourceCountry"
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
            )}

            {!user.hasOwnProperty('role') && (
                <label htmlFor="email">
                    Your email:
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={shipmentData.email}
                        onChange={handleChange}
                    />
                </label>
            )}
        </>
    )
}

export default UserInput
