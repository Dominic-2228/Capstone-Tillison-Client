import { useEffect, useState } from "react";
import { getReviews } from "../../data/reviews.jsx";

export default function Homepage() {
  const [review, setReview] = useState([]);

  useEffect(() => {
    setReview([{ comment: "Test review" }, { comment: "Another review" }]);
  }, []);

  console.log("Review array before render:", review);

  return (
    <>
      <div>
        <h1>Reviews</h1>
        <ul>
          {Array.isArray(review) && review.length > 0 ? (
            review.map((r, idx) => (
              <li key={idx}>
                {typeof r.comment === "string"
                  ? r.comment
                  : r.comment
                  ? JSON.stringify(r.comment)
                  : "No comment provided"}
              </li>
            ))
          ) : (
            <li>No reviews found</li>
          )}
        </ul>
      </div>
    </>
  );
}