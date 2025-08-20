import { fetchWithResponse } from "./fetcher.js";

export const createBookingTime = async (bookingTime) => {
  const token = localStorage.getItem("token");
  let url = "bookingtimes";

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };

  return fetchWithResponse(url, {
    method: "POST",
    headers,
    body: JSON.stringify(bookingTime),
  });
};
