export const calculateCost = (shipmentData, setShipmentData, country, setSubmitDisabled) => {
  //Dessa fält måste vara ifyllda
  if (shipmentData.weight === 0 || shipmentData.sourceCountry === "" || shipmentData.destinationCountry === "" || shipmentData.email === "") {
    console.log("wrong fields");
  } 

  else {
    
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
};
