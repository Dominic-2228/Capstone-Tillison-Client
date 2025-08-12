"use client";
import { useParams } from "next/navigation.js";
import { useAuth } from "../../context/AuthContext.js";
import { use, useEffect, useState } from "react";
import { getPackages } from "@/data/getPackages.js";
import { useUser } from "@/components/hooks/useUser.js";
import { createReviewFun } from "@/data/reviews.jsx";
import { useRouter } from "next/navigation.js";

export default function CreateReview() {
  const { id } = useParams();
  const {user} = useAuth();
  const { photoPackage, setPhotoPackage } = useAuth();
  const [createReview, setCreateReview] = useState({
    description: "",
    rating: "",
    package_id: id,
  });
  const router = useRouter();

  useEffect(() => {
    getPackages(id).then(setPhotoPackage);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (createReview.description && createReview.rating) {
      createReviewFun(createReview).then(() => handleNavigation("/"));
    }
  };

    const handleNavigation = (path) => {
    router.push(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Description</label>
            <input
              name="description"
              value={createReview.description || ""}
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
              value={createReview.rating || ""}
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
