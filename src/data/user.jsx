const { fetchWithResponse } = require("./fetcher.js");

export const getUser = (query = undefined) => {
  let url = "user";

  if (query) {
    url += `?${query}`;
  }

  return fetchWithResponse()(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
};
