import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBDataTable } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Customer() {
  const [isLoaded, setLoaded] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/admin/view_venue_owner",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setDatas(response.data.ownerData);
      })
      .then(() => setLoaded(true));
  }, []);

  console.log(datas);

  if (datas.length === 0) {
    return null; // Return nothing if there is no sensor data
  }

  return (
    <>
      <div>
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
                <h6 className="mb-0">Customer</h6>
                <a href>Show Customer</a>
              </div>
              <div className="table-responsive">
                {isLoaded ? (
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
                        { label: "Owner Name", field: "ownerName" },
                        { label: "Email", field: "email" },
                        { label: "Phone No", field: "phoneNo" },
                      ],
                      rows: datas.map((data) => ({
                        ownerName: data.username,
                        email: data.email,
                        phoneNo: data.phoneNo,
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
