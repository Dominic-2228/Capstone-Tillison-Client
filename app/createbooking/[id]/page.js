"use client";
import { useUser } from "@/components/hooks/useUser.js";
import { createBookingTime } from "@/data/booking.js";
import { useParams, useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function CreateBooking() {
  const { id } = useParams();
  const { user } = useUser();
  const router  = useRouter()
  const [booking, setBooking] = useState({
    availability_date: "",
    name: "",
    user: user?.id || null, // user account, or name on input field
    package: parseInt(id),
    client_description: "",
    email: user?.email || "",
    phone_number: "",
    is_booked: true,
    location: "",
  });
  console.log(user);

  useEffect(() => {
    if (user) {
      setBooking(prev => ({
        ...prev,
        user: user.id,
        name: user.name || `${user.first_name} ${user.last_name}`,
        email: user.email
      }));
    }
  }, [user]);

  //   const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCreateReview((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleNavigation = (path) => {
    router.push(path);
  };


  const CompleteBooking = async (e) => {
    e.preventDefault();

    try {
      console.log("sending booking: ", booking)

      const savedBooking = await createBookingTime(booking)

      await handleEmails(savedBooking)
      handleNavigation("/")
    } catch (err) {
      console.log(err)
    }
  };


  async function handleEmails(booking) {
    const response = await fetch(`/api/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ booking }),
    });
  
    const data = await response.json();
    return data;
  }

  

  return (
    <>
      <form onSubmit={CompleteBooking}>
        {user ? (
          ""
        ) : (
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">What's Your Name?</label>
            <input
              type="text"
              className="form-control"
              name="name"
              // value={booking.client_description}
              onChange={(e) => {
                const name = e.target.value;
                const copy = { ...booking };
                copy.name = name; // refactor this to a function, all of them
                setBooking(copy)
              }}
              id="exampleInputPassword1"
              placeholder="Enter Name Here..."
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Date</label>
          <input
            type="date"
            className="form-control"
            // value={booking.availability_date}
            onChange={(e) => {
              const date = e.target.value;
              const copy = { ...booking };
              copy.availability_date = date;
              setBooking(copy);
            }}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Choose Time"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">
            Tell us More About Yourself!
          </label>
          <input
            type="text"
            className="form-control"
            // value={booking.client_description}
            onChange={(e) => {
              const desc = e.target.value;
              const copy = { ...booking };
              copy.client_description = desc; // refactor this to a function, all of them
              setBooking(copy)
            }}
            id="exampleInputPassword1"
            placeholder="What else could i know about you?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">Email</label>
          <input
            type="email"
            // value={booking.email}
            onChange={(e) => {
              const email = e.target.value;
              const copy = { ...booking };
              copy.email = email;
              setBooking(copy);
            }}
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
            // value={booking.phonenumber}
            onChange={(e) => {
              const phone = e.target.value;
              const copy = { ...booking };
              copy.phone_number = phone;
              setBooking(copy);
            }}
            id="exampleInputPassword1"
            placeholder="Phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputLastName">Location</label>
          <input
            type="name"
            className="form-control"
            // value={booking.location}
            onChange={(e) => {
              const location = e.target.value;
              const copy = { ...booking };
              copy.location = location;
              setBooking(copy);
            }}
            id="exampleInputPassword1"
            placeholder="Location"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
