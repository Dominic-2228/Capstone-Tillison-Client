"use client";

import { createUpdatePackage, getPackages } from "@/data/getPackages.js";
import {
  createPackageService,
  getPackageServices,
} from "@/data/getPackageServices.jsx";
import { useParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import Packages from "../../packages/page.js";
import { getServices } from "@/data/getServices.js";
import { useRouter } from "next/navigation.js";
import { fetchWithResponse } from "@/data/fetcher.js";

export default function EditPackage() {
  const [updatePackage, setUpdatePackage] = useState({
    name: "",
    price: "",
  });
  const [packageServices, setPackageServices] = useState([]);
  const [servicesOnly, setServicesOnly] = useState([]);
  const { id } = useParams();
  const [selectedServices, setSelectedServices] = useState([]);
  const [originalServices, setOriginalServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getServices().then(setServicesOnly);
  }, []);

  useEffect(() => {
    getPackages(id)
      .then((data) => {
        setUpdatePackage({
          name: data.name,
          price: data.price,
        });
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("Not authenticated, skipping fetch");
        } else {
          console.error(err);
        }
      });
  }, [id]);

  useEffect(() => {
    getPackageServices().then((data) => {
      const filteredServices = data.filter((item) => item.package?.id === parseInt(id))
      setPackageServices(filteredServices)
      const serviceIds = filteredServices.map((ser) => ser.service.id)
      setSelectedServices(serviceIds)
      setOriginalServices(serviceIds)
    })
  }, [id])

  const handleSave = async (e) => {
  e.preventDefault();
  if (!updatePackage.name || !updatePackage.price) return;

  try {
    // Update package info first
    await createUpdatePackage(updatePackage, id);

    // Determine added/removed services
    const currentServiceIds = packageServices.map(ps => ps.service.id);
    const added = selectedServices.filter(sid => !currentServiceIds.includes(sid));
    const removed = currentServiceIds.filter(sid => !selectedServices.includes(sid));

    // Bulk update services
    await fetch(`http://localhost:8000/packageservices/${id}/bulk-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ added, removed }),
    });

    // Navigate
    router.push("/packages");
  } catch (err) {
    console.error(err);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatePackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

const handleChangeServices = (serviceId) => {
  setSelectedServices((prev) =>
    prev.includes(serviceId)
      ? prev.filter((id) => id !== serviceId) // remove
      : [...prev, serviceId] // add
  );
};

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSave(e)
        }}
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Name</label>
            <input
              name="name"
              value={updatePackage.name || ""}
              type="text"
              className="form-control"
              id="inputCity"
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Price</label>
            <input
              type="number"
              name="price"
              id="inputState"
              className="form-control"
              value={updatePackage.price || ""}
              onChange={handleChange}
              min={100}
              max={500}
            />
          </div>
          <div>
            <div className="form-group col-md-6">
              <label>Services</label>
              {servicesOnly.map((serviceOnly) => (
                <div key={serviceOnly.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="service"
                    id={`service-${serviceOnly.id}`}
                    value={serviceOnly.id}
                    checked={selectedServices.includes(serviceOnly.id)}
                    onChange={() => handleChangeServices(serviceOnly.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`service-${serviceOnly.id}`}
                  >
                    {serviceOnly.description}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => handleNavigation("/packages")}>
          Save
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleNavigation("/packages")}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
