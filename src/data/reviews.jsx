import { fetchWithResponse } from "./fetcher.js";

export const getReviews = (id = undefined) => {
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
};

export const createUpdateReview = (review, id) => {
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
  let url = 'reviews'

  return fetchWithResponse(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(review)
  })
}
