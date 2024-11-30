import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function VenueDetail() {
  const [venueData, setVenueData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/owner/getOwnVenueDetail`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setVenueData(response.data.venue);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        console.error("Failed to fetch venue data:", error);
      }
    }
    fetchVenueData();
  }, []);

  return (
    <>
      <div
        id="spinner"
        className={`${
          isLoaded ? "" : "show"
        } bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center `}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Sidebar />
      <div id="content" className="content">
        <Navbar />
        <div className="container mt-4">
          {venueData ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{venueData.name}</h5>
                <div className="row">
                  {venueData.images &&
                    venueData.images.map((image, index) => (
                      <div key={index} className="col-md-4">
                        <img
                          src={`http://localhost:8000/images/${image}`}
                          className="img-fluid mb-2"
                          alt={` ${index + 1}`}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                </div>
                <p className="card-text">
                  {venueData.address}, {venueData.city}
                </p>
                <p className="card-text">
                  Enquiry Number: {venueData.enquiryNo}
                </p>
                <p className="card-text">Capacity: {venueData.capacity}</p>
                <p className="card-text">
                  Price Per Day: {venueData.pricePerDay}
                </p>
                <p className="card-text">
                  Wifi:{" "}
                  {venueData.isWifi === "true" ? "Available" : "Not Available"}
                </p>
                <p className="card-text">
                  Air Conditioning:{" "}
                  {venueData.isAC === "true" ? "Available" : "Not Available"}
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link
                    to={`/editvenue.html`}
                    state={{ venueData }}
                    className="btn btn-primary me-md-2"
                  >
                    Edit Venue
                  </Link>
                  <Link
                    to={`/adddecoration.html`}
                    state={{ venueData }}
                    className="btn btn-primary"
                  >
                    Add Decoration
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="h3 text-center">No Venue added.</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default VenueDetail;
