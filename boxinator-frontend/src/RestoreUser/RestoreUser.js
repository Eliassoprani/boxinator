import { urlBackendBasePath } from "../assets/strings";

export const restoreUser = async (storedToken, setUser) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`
    };

    const fetchUserResponse = await fetch(`${urlBackendBasePath}/authentication/getUserByToken`, {
      method: "GET",
      headers: headers
    });

    if (!fetchUserResponse.ok) {
      throw new Error("Failed to get user from the database");
    }

    const returnedUser = await fetchUserResponse.json();

    setUser(returnedUser);
  }