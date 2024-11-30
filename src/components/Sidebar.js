import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  return (
    <>
      {/* Sidebar Start */}
      <div id="sidebar" className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-star me-2" />
              Venue Vista
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle "
                src="/assests/img/admin.jpg"
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Owner</h6>
              <span>Owner</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link to="/" className="nav-item nav-link active">
              <i className="fa fa-tachometer-alt me-2" />
              Dashboard
            </Link>

            <div className="nav-item dropdown">
              <Link to="../venue.html" className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                Add Venue
              </Link>
              <Link to="../venueDetail.html" className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                Edit Venue{" "}
              </Link>
              <Link to="../viewDecoration.html" className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                View Decoration{" "}
              </Link>
              {/* <Link to="../customer.html" className="nav-item nav-link"><i className="fa fa-th me-2" />Customer</Link> */}
              {/* <Link to="../booking.html" className="nav-item nav-link"><i className="fa fa-th me-2" />Booking</Link> */}
              <Link to="../payment.html" className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                Payment
              </Link>
              <Link to="../feedback.html" className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                Feedback
              </Link>
              {/* <Link to="../complaints.html" className="nav-item nav-link"><i className="fa fa-th me-2" />Complaints</Link> */}
              <a href="/#" onClick={logout} className="nav-item nav-link">
                <i className="fa fa-th me-2" />
                Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
      {/* Sidebar End */}
    </>
  );
}
export default Sidebar;
