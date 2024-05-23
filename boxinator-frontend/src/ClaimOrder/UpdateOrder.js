import { urlBackendBasePath } from "../assets/strings";

export const updateOrder = async (userId, orderId) => {

  const updateShipmentResponse = await fetch(`${urlBackendBasePath}/orders/updateOrdersUser`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserId: userId, OrderId: orderId }),
    }
  );

  if (!updateShipmentResponse.ok) {
    throw new Error("Failed to update order's user id");
  }
};
