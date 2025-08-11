import { fetchWithResponse } from "./fetcher.js";

export const getPackageServices = (id = undefined) => {
  let url = "packageservices";

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