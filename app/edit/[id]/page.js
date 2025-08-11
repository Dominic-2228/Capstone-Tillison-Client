"use client";
import { createUpdateReview, getReviews } from "@/data/reviews.jsx";
import { useParams, useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function Edit() {
  const { id } = useParams();
  const router = useRouter();
  const [review, setReview] = useState({});
  const [updateReview, setUpdateReview] = useState({
    description: "",
    rating: "",
  });

  useEffect(() => {
    getReviews(id).then((data) => {
      setUpdateReview({
        description: data.description,
        rating: data.rating
      })
    });
  }, [id]);

  const handleChange = (e) => {
    const {name, value} = e.target
    setUpdateReview((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleSave = (e) => {
    e.preventDefault()

    if (
      updateReview.description &&
      updateReview.rating
    ) {
      createUpdateReview(updateReview, id).then(() => handleNavigation("/"))
    }
  }

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Description</label>
            <input
            name="description"
              value={updateReview.description || ""}
              type="text"
              className="form-control"
              id="inputCity"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Rating</label>
            <select
            name="rating"
              id="inputState"
              className="form-control"
              value={updateReview.rating || ""}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={parseInt(num)}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleNavigation("/")}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
