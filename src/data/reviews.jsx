import { fetchWithResponse } from "./fetcher.js";

export const getReviews = (query = undefined) => {
  let url = "reviews";

  if (query) {
    url += `?${query}`;
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
};
