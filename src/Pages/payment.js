import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBDataTable } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const [isLoaded, setLoaded] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/owner/view_payments",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setDatas(response.data.payments);
        setLoaded(true);
        if (response.data.payments.length === 0) {
          console.log("No payments found");
        }
      })
      .catch((error) => {
        // console.error("Error fetching payments:", error);
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <div>
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
        {/* Spinner End */}
        {/* Sidebar Start */}
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
                <h6 className="mb-0">Recent Payment</h6>
              </div>
              <div className="table-responsive">
                {isLoaded ? (
                  datas.length > 0 ? (
                    <CDBDataTable
                      paginationLabel={["Previous", "Next"]}
                      striped
                      btn={true}
                      exportToCSV={true}
                      sortable
                      bordered
                      tbodyTextWhite
                      tbodyColor="red"
                      hover
                      entriesOptions={[5, 20, 25]}
                      entries={5}
                      pagesAmount={4}
                      data={{
                        columns: [
                          { label: "Venue Id", field: "venueId" },
                          { label: "Amount", field: "paymentAmount" },
                          { label: "Payment Id", field: "paymentId" },
                          { label: "Payment Status", field: "paymentStatus" },
                          { label: "Payment Method", field: "paymentMethod" },
                        ],
                        rows: datas.map((data) => ({
                          venueId: data.venueId,
                          paymentAmount: data.paymentAmount,
                          paymentId: data.paymentId,
                          paymentStatus: data.paymentStatus,
                          paymentMethod: data.paymentMethod,
                        })),
                      }}
                    />
                  ) : (
                    <div>No payments found.</div>
                  )
                ) : (
                  <div>Loading...</div>
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
        <a
          href="/#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a>
      </div>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </>
  );
}
