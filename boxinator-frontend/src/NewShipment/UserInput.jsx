import { useEffect, useState, useContext } from "react";
import { fetchCountries } from "./FetchCountries.js";
import { UserContext } from "../App.jsx";

function UserInput({shipmentData, setShipmentData, setMultiplier, setSubmitDisabled}) {
    const { user, allCountries } = useContext(UserContext);
    const [sourceCountries, setSourceCountries] = useState([]);

    useEffect(() => {
        fetchCountries(setSourceCountries);
    }, []);

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setShipmentData({
            ...shipmentData,
            [inputName]: inputValue,
        });

        if (inputName === "sourceCountry") {
            var country = sourceCountries.find(country => country.countryName === inputValue);
            setMultiplier(country.multiplier);
        }

        console.log("från user input: weight: " + shipmentData.weight + " source: " + shipmentData.sourceCountry + " destination: " + shipmentData.destinationCountry + " email: " + shipmentData.email);


        setSubmitDisabled(true);
    }

    return (
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
                    {allCountries && allCountries.map(country => (
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
        </>
    )
}

export default UserInput
