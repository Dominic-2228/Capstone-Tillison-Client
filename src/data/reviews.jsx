import { fetchWithResponse } from "./fetcher.js";

export const getReviews = (id = undefined) => {
  try {
    let url = "reviews";

    // If an id is provided, fetch a single review
    if (id) {
      url += `/${id}`;
    }

    return fetchWithResponse(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return []; // optional fallback for logged-out users
  }
};

export const createUpdateReview = (review, id) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error("No auth token");
  }
  let url = `reviews/${id}`;

  return fetchWithResponse(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(review),
  });
};

export const createReviewFun = (review) => {
  let url = "reviews";

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(review),
  });
};
