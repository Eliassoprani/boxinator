import emailjs from "@emailjs/browser";
import { urlFrontendBasePath } from "../assets/strings.js";

export function orderConfirmation(user, email, responseData) {

  const toName = user.role === 2 ? "guest" : user.firstName;
  const toEmail = user.role === 2 ? email : user.email;
  var message = "";

  if (user.role === 2) {
    message = `Order id: ${responseData.id} 
            Receiver name: ${responseData.recieverName} 
            Weight: ${responseData.weight}
            Box colour: ${responseData.boxColor}
            Destination: ${responseData.countryId}
            Register and claim your shipment at ${urlFrontendBasePath}/${responseData.id}`;
  } else {
    message = `Order id: ${responseData.id} 
            Receiver name: ${responseData.recieverName} 
            Weight: ${responseData.weight}
            Box colour: ${responseData.boxColor}
            Destination: ${responseData.countryId}`;
  }

  const serviceId = "service_krhq75r";
  const templateId = "template_86k79yo";
  const publicKey = "llG6edCvnODXdraEf";
  const templateParams = {
    to_name: toName,
    to_email: toEmail,
    message: message,
  };

  emailjs.send(serviceId, templateId, templateParams, publicKey).then(
    () => {
      console.log("Order confirmation email sent");
    },
    (error) => {
      console.log("Order confirmation email failed: ", error);
    }
  );
}
