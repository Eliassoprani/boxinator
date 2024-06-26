import emailjs from "@emailjs/browser";
import { urlFrontendBasePath, serviceId, templateIdOrderConfirmation, publicKey } from "../assets/strings.js";


export function orderConfirmationEmail(user, email, responseData) {
  var toName = "";
  var toEmail = "";
  var message = `Order id: ${responseData.id} 
  Receiver name: ${responseData.recieverName} 
  Weight: ${responseData.weight}
  Box colour: ${responseData.boxColor}
  Destination: ${responseData.countryId}`;

  if (user.role === 0 || user.role === 1) {
    toName = user.firstName;
    toEmail = user.email;
  } 
  else {
    toName = "Guest";
    toEmail = email;
    const orderLink = `Register and claim your shipment at ${urlFrontendBasePath}/${toEmail}/${responseData.id}`;
    message = `${message}\n${orderLink}`;
  }

  const templateParams = {
    to_name: toName,
    to_email: toEmail,
    message: message,
  };

  emailjs.send(serviceId, templateIdOrderConfirmation, templateParams, publicKey).then(
    () => {
      console.log("Order confirmation email sent");
    },
    (error) => {
      console.log("Order confirmation email failed: ", error);
    }
  );
}
