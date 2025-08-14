import { fetchWithResponse } from "./fetcher.js";

export const getServices = (id = undefined) => {
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("No auth token");
  }
  let url = "services";

  // If an id is provided, fetch a single review
  if (id) {
    url += `/${id}`;
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
};
