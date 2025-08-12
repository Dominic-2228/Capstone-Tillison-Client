import { fetchWithResponse } from "./fetcher.js";

export const getPackages = async (id = undefined) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token");
    }

    let url = "packages";
    if (id) {
      url += `/${id}`;
    }

    const data = await fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Error no auth token:", error);
    throw error;
  }
};


export const createUpdatePackage = (photoPackage) => {
  let url = 'packages'

  return fetchWithResponse(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(photoPackage)
  })
}
