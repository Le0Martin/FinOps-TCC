import axios from "axios";

export const holoriGet = async () => {
  const response = await axios.get(
    "https://app.holori.com/api/price-server/filters/compute?payment_period=hour&currency=USD"
  );
  return response.data;
};
