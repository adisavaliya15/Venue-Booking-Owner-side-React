import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { CDBDataTable } from "cdbreact";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/owner/view_venue_reviews",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setFeedbacks(response.data.reviews);
        setLoaded(true);
        if (response.data.reviews.length === 0) {
          console.log("No reviews found");
        }
      })
      .catch((error) => {
        // console.error("Error fetching payments:", error);
        setLoaded(true);
      });
  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(",", " ");
  }

  //!time ago code
  // const timeAgo = (timestamp) => {
  //   const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  //   const current = new Date(Date.now() + ISTOffset);
  //   const previous = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  //   const elapsed = current - previous;

  //   const seconds = Math.floor(elapsed / 1000);

  //   if (seconds < 60) {
  //     return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  //   }

  //   const minutes = Math.floor(seconds / 60);

  //   if (minutes < 60) {
  //     return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  //   }

  //   const hours = Math.floor(minutes / 60);

  //   if (hours < 24) {
  //     return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  //   }

  //   const days = Math.floor(hours / 24);

  //   if (days < 7) {
  //     return `${days} day${days !== 1 ? 's' : ''} ago`;
  //   }

  //   const weeks = Math.floor(days / 7);
  //   return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  // };

  return (
    <>
      {/* Spinner Start */}
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
      {/* Sidebar Start */}
      {/* Sidebar Start */}
      <Sidebar />
      {/* Sidebar End */}
      {/* Content Start */}
      <div id="content" className="content">
        {/* Navbar Start */}
        <Navbar />
        {/* Navbar End */}
        {/* Messages */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Payment</h6>
            </div>
            <div className="table-responsive">
              {isLoaded ? (
                feedbacks.length > 0 ? (
                  <CDBDataTable
                    striped
                    sortable
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={{
                      columns: [
                        { label: "User Id", field: "userId" },
                        { label: "Ratings", field: "rating" },
                        { label: "Review", field: "review" },
                        { label: "TimeStamp", field: "timestamp" },
                      ],
                      rows: feedbacks.map((data) => ({
                        userId: data.userId,
                        rating: data.rating,
                        review: data.review,
                        timestamp: formatTimestamp(data.timestamp),
                      })),
                    }}
                  />
                ) : (
                  <div>No feedbacks found.</div>
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Content End */}
      {/* Back to Top */}
      <a href="/#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </>
  );
}
