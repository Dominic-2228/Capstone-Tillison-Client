"use client";

import { createUpdatePackage, getPackages } from "@/data/getPackages.js";
import { getPackageServices } from "@/data/getPackageServices.jsx";
import { useParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import Packages from "../../packages/page.js";
import { getServices } from "@/data/getServices.js";

export default function EditPackage() {
  const [updatePackage, setUpdatePackage] = useState({
    name: "",
    price: "",
  });
  const [packageServices, setPackageServices] = useState([]);
  const [servicesOnly, setServicesOnly] = useState([]);
  const { id } = useParams();
  const [updatedPackage, setUpdatedPackage] = useState({
    name: '',
    price: 0,
    services
  })

  useEffect(() => {
    getServices().then(setServicesOnly);
  }, []);

  useEffect(() => {
    getPackages(id).then((data) => {
      setUpdatePackage({
        name: data.name,
        price: data.price,
      });
    });
  }, [id]);

  useEffect(() => {
    getPackageServices().then((data) => {
      const filteredServices = data.filter(
        (item) => item.package?.id === parseInt(id)
      );
      setPackageServices(filteredServices);
    });
  }, [id]);
  console.log(packageServices);

  const handleSave = (e) => {
    e.preventDefault();

    if (updatePackage.description && updatePackage.rating) {
      createUpdatePackage(updatePackage, id).then(() => handleNavigation("/"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatePackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Name</label>
            <input
              name="description"
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
                    value={serviceOnly.service?.id}
                    checked={packageServices.some(
                      (pkgService) =>
                        pkgService.service?.id === serviceOnly.id
                    )}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`service-${serviceOnly.id}`}
                  >
                    {serviceOnly.description}
                  </label>
                </div>
              ))}
              {console.log(servicesOnly)}
            </div>
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
