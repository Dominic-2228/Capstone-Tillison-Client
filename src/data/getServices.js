import { fetchWithResponse } from "./fetcher.js";

export const getServices = (id = undefined) => {
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