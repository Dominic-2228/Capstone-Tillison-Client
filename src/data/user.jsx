const { fetchWithResponse } = require("./fetcher.js");

export const getUser = (query = undefined) => {
  if (!token) {
    throw new Error("No auth token");
  }
  let url = "users";

  if (query) {
    url += `?${query}`;
  }

  return fetchWithResponse(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
};
