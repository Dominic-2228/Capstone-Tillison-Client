"use client";
import Link from "next/link";
import { useUser } from "@/components/hooks/useUser.js";
import { getReviews } from "@/data/reviews.jsx";
import { useEffect, useState } from "react";
import { fetchWithResponse } from "@/data/fetcher.js";
import "./page.css";

export default function Home() {
  const [review, setReview] = useState([]);
  const { user, loading } = useUser();

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/page`);
      const data = await response.json();
      console.log("Fetched data:", data);
      setReview(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    const res = await fetchWithResponse(`reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (res.ok) {
      setReview((prevRev) => prevRev.filter((rev) => rev.id !== reviewId));
    }
  };

  return (
    <>
      {/* {make this a component} */}

      <div className="initial-view">
        <img className="initial-photo" src="/DOM_6368.jpg" loading="lazy" alt="Sample" />
        <img src="https://i.imgur.com/fduJ8ba.png" alt="logo" />
        <h3>Capturing</h3>
        <h3>the</h3>
        <h3>Moment</h3>
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <div>
          <img src="/DSC_4503.jpg" loading="lazy" alt="our Photo" />
        </div>
        <div className="paragraph-about-us">
          <h4>
            Hi, we’re Bethany and Dominic Tillison — a husband and wife
            photography team who love turning everyday moments into lasting
            memories. What began as a shared creative hobby has grown into a
            passion for capturing the real, honest, and joyful parts of life. We
            believe that photography is more than just taking pictures — it’s
            about connection, comfort, and telling your story as it truly is.
            Whether we're photographing families, couples, or individuals, our
            goal is to create a relaxed space where you feel seen and
            celebrated.
          </h4>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <img className="image-samples" loading="lazy" src="/DOM_6586.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DOM_6619.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DSC_0177.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DSC_0212.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DOM_6243.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DOM_6311.jpg" alt="Sample" />
          <img className="image-samples" loading="lazy" src="/DOM_6313.jpg" alt="Sample" />
        </div>
      </div>
      <div>
        <h1>Reviews</h1>
        <ul>
          {Array.isArray(review) && review.length > 0 ? (
            review.map((r, idx) => (
              <div key={idx} className="card">
                <div className="card-body">
                  <h5 className="card-title">{r.description}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {r.user.first_name} {""} {`${r.rating}/5`}
                  </h6>
                  {user ? (
                    user.is_superuser || user.id === r.user.id ? (
                      <div>
                        <Link href={`/edit/${r.id}`} className="card-link">
                          Edit
                        </Link>{" "}
                        <button onClick={() => handleDelete(r.id)}>
                          Delete
                        </button>
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
