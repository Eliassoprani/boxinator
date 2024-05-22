import emailjs from "@emailjs/browser";
import { urlFrontendBasePath } from "../assets/strings.js";

export function orderConfirmationEmail(user, email, responseData) {

  var toName = "";
  var toEmail = "";
  var message = "";

  if(user.role === 0 || user.role === 1) {
    toName = user.firstName;
    toEmail = user.email;
    message = `Order id: ${responseData.id} 
            Receiver name: ${responseData.recieverName} 
            Weight: ${responseData.weight}
            Box colour: ${responseData.boxColor}
            Destination: ${responseData.countryId}`;
  }
  else {
    toName = "Guest";
    toEmail = email;
    message = `Order id: ${responseData.id} 
            Receiver name: ${responseData.recieverName} 
            Weight: ${responseData.weight}
            Box colour: ${responseData.boxColor}
            Destination: ${responseData.countryId}
            Register and claim your shipment at ${urlFrontendBasePath}/${toEmail}/${responseData.id}`;
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
