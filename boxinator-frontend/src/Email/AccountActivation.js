import emailjs from "@emailjs/browser";
import { urlFrontendBasePath, serviceId, templateIdAccountActivation, publicKey } from "../assets/strings.js";

export function accountActivationEmail(firstName, email) {
  const templateParams = {
    to_name: firstName,
    to_email: email,
    message: `Visit us at ${urlFrontendBasePath}`,
  };

  emailjs.send(serviceId, templateIdAccountActivation, templateParams, publicKey).then(
    () => {
      console.log("Account activation email sent");
    },
    (error) => {
      console.log("Account activation email failed: ", error);
    }
  );
}
