"use client";
import { useUser } from "@/components/hooks/useUser.js";
import { getReviews } from "@/data/reviews.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [review, setReview] = useState([]);
  const user = useUser();

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

  const handleDelete = async (e) => {
    const reviewId = e.target.id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/reviews/${reviewId}/`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) {
      setReview((prevRev) => prevRev.filter((rev) => !rev.id === reviewId));
    }
  };

  console.log("Review array before render:", review);

  return (
    <>
      <div>
        <h1>Reviews</h1>
        <ul>
          {Array.isArray(review) && review.length > 0 ? (
            review.map((r, idx) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{r.description}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {r.user.first_name}
                  </h6>
                  {!user
                    ? user.map((usr) => {
                        usr.is_admin || usr.id == r.id ? (
                          <div>
                            <a href="/edit" className="card-link">
                              Edit
                            </a>{" "}
                            <a onClick={handleDelete}>Delete</a>
                          </div>
                        ) : (
                          ""
                        );
                      })
                    : ""}
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
