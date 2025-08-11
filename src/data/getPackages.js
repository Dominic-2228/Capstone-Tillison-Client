import { fetchWithResponse } from "./fetcher.js";

export const getPackages = (id = undefined) => {
  let url = "packages";

    // If an id is provided, fetch a single review
    if (id) {
      url += `/${id}`;
    }
  
    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
}