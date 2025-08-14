"use client";
import { useUser } from "@/components/hooks/useUser.js";
import { getPackages } from "@/data/getPackages.js";
import { getPackageServices } from "@/data/getPackageServices.jsx";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import { fetchWithResponse } from "@/data/fetcher.js";

export default function Packages() {
  const [photoPackage, setPhotoPackage] = useState([]);
  const [photoPackageServices, setPhotoPackageServices] = useState([]);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    getPackages()
      .then(setPhotoPackage)
      .catch((err) => console.log("Fetch packages failed:", err));
  }, []);

  useEffect(() => {
    getPackageServices().then(setPhotoPackageServices);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleDelete = async (packageId) => {
    const token = localStorage.getItem("token");
    const res = await fetchWithResponse(`packages/${packageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    setPhotoPackage(photoPackage.filter((photo) => photo.id !== packageId))
  }

    return (
      <>
        {/* {single responsibility refactor} */}
        {photoPackage.map((packages) => (
          <div className="card" style={{ width: "18rem" }} key={packages.id}>
            <div className="card-body">
              <h5 className="card-title">{packages.name}</h5>
              <p className="card-text">${packages.price}</p>
            </div>
            <ul>
              {photoPackageServices
                .filter((ser) => ser.package.id === packages.id)
                .map((ser) => (
                  <li key={ser.id} className="list-group-item">
                    {ser.service.description}
                  </li>
                ))}
            </ul>

            {user && user.is_superuser ? (
              <div className="card-body">
                <button
                  className="card-link"
                  type="button"
                  onClick={() => {
                    handleNavigation(`/editpackage/${packages.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="card-link"
                  type="button"
                  onClick={() => handleDelete(packages.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleNavigation(`/createreview/${packages.id}`)
                  }
                >
                  Review
                </button>
              </div>
            ) : (
              <div className="card-body">
                <button
                  className="card-link"
                  type="button"
                  onClick={() =>
                    handleNavigation(`/createreview/${packages.id}`)
                  }
                >
                  Review
                </button>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };
