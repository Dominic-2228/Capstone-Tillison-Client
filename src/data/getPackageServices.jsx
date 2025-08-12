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


export const createPackageService = (packageService) => {
    let url = 'packageservices'

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(packageService)
  })
}