import { fetchWithResponse } from "./fetcher.js";

export const getPackages = async (id = undefined) => {
  try {
    let url = "packages";
    if (id) url += `/${id}`;

    const data = await fetchWithResponse(url); // remove Authorization header
    return data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
};
export const createUpdatePackage = (photoPackage, id) => {
  const token = localStorage.getItem("token")
  let url = "packages";

  if (!token) {
    throw new Error("No auth token");
  }

  if (id) {
    url += `/${id}`;
  }

  return fetchWithResponse(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(photoPackage),
  });
};
