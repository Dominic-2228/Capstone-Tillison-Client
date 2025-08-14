export const createBooking = async (bookingTime) => {
  const token = localStorage.getItem("token");
  let url = "bookingtimes";

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(bookingTime),
  });
};