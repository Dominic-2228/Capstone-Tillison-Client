"use client"
import { useUser } from "@/components/hooks/useUser.js";
import { useParams } from "next/navigation.js";
import { useState } from "react";

export default function CreateBooking () {
  const {id} = useParams()
  const { user } = useUser();
  const [booking, setBooking] = useState({
    availability_date: 0,
    user: user || null,
    package: id,
    client_description: "",
    email: user?.email || '',
    phonenumber: 0,
    is_booked: false
  })
  console.log(user)


    const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const CompleteBooking = (e) => {
        e.preventDefault();
    
          CreateBooking(createReview).then(() => handleNavigation("/"));
  }


  return (
    <>
      <form onSubmit={CompleteBooking}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Date</label>
          <input
            type="date"
            className="form-control"
            value={availability_date}
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Choose Time"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Tell us More About Yourself!</label>
          <input
            type="text"
            className="form-control"
            value={client_description}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputLastName">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phonenumber}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputLastName">Location</label>
          <input
            type="name"
            className="form-control"
            value={location}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
