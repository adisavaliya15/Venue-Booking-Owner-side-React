import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBDataTable } from "cdbreact";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Booking() {
  const [isLoaded, setLoaded] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/admin/view_venue_bookings",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setDatas(response.data.bookings);
      })
      .then(() => setLoaded(true));
  }, []);

  if (datas.length === 0) {
    return null; // Return nothing if there is no sensor data
  }
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
      {/* Sidebar End */}
      {/* Content Start */}
      <div id="content" className="content">
        {/* Navbar Start */}
        <Navbar />
        {/* Navbar End */}
        {/* Recent Sales Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Booking</h6>
            </div>
            <div className="table-responsive">
              {isLoaded ? (
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
                      { label: "Venue Name", field: "venueName" },
                      { label: "Customer Name", field: "userName" },
                      { label: "Payment Amount", field: "paymentAmount" },
                      { label: "From Date", field: "fromDate" },
                      { label: "To Date", field: "toDate" },
                    ],
                    rows: datas.map((data) => ({
                      venueName: data.venueName,
                      userName: data.userName,
                      paymentAmount: data.paymentAmount,
                      fromDate: data.fromDate,
                      toDate: data.toDate,
                    })),
                  }}
                />
              ) : (
                <div> Loading... </div>
              )}
            </div>
          </div>
        </div>
        {/* Recent Sales End */}
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
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
