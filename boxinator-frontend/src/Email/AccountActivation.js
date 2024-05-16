import emailjs from "@emailjs/browser";
import { urlFrontendBasePath } from "../assets/strings.js";

export function accountActivation(firstName, email) {

  const serviceId = "service_krhq75r";
  const templateId = "template_7v9fupt";
  const publicKey = "llG6edCvnODXdraEf";
  
  const templateParams = {
    to_name: firstName,
    to_email: email,
    message: `Visit us at ${urlFrontendBasePath}`,
  };

  emailjs.send(serviceId, templateId, templateParams, publicKey).then(
    () => {
      console.log("Account activation email sent");
    },
    (error) => {
      console.log("Account activation email failed: ", error);
    }
  );
}
