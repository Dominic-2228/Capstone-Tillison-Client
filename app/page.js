"use client";
import Link from "next/link";
import { useUser } from "@/components/hooks/useUser.js";
import { getReviews } from "@/data/reviews.jsx";
import { useEffect, useState } from "react";
import { fetchWithResponse } from "@/data/fetcher.js";

export default function Home() {
  const [review, setReview] = useState([]);
  const { user, loading } = useUser();

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const response = await fetch("/api/page");
      const data = await response.json();
      console.log("Fetched data:", data);
      setReview(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  const handleDelete = async (reviewId) => {

    const res = await fetchWithResponse(
      `reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setReview((prevRev) => prevRev.filter((rev) => rev.id !== reviewId));
    }
  };

  console.log("Review array before render:", review);

  return (
    <>
      {/* {make this a component} */}
      <div>
        <h1>Reviews</h1>
        <ul>
          {Array.isArray(review) && review.length > 0 ? (
            review.map((r, idx) => (
              <div key={idx} className="card">
                <div className="card-body">
                  <h5 className="card-title">{r.description}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {r.user.first_name}
                  </h6>
                  {user ? (
                    user.is_superuser || user.id === r.user_id ? (
                      <div>
                        <Link href={`/edit/${r.id}`} className="card-link">
                          Edit
                        </Link>{" "}
                        <button onClick={() => handleDelete(r.id)}>Delete</button>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <li>No reviews found</li>
          )}
        </ul>
      </div>
    </>
  );
}
