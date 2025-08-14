import { fetchWithResponse } from "./fetcher.js";

export const getPackageServices = async (id = undefined) => {
  try {
    const token = localStorage.getItem("token");

    let url = "packageservices";
    if (id) {
      url += `/${id}`;
    }

    if (token) {
      const response = await fetchWithResponse(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response;
    } else {
      const response = await fetchWithResponse(url);
      return response;
    }
  } catch (error) {
    console.error("Error fetching package services:", error);
    throw error; // rethrow so calling code can handle it too
  }
};

export const createPackageService = (packageService) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token");
  }
  let url = "packageservices";

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(packageService),
  });
};
