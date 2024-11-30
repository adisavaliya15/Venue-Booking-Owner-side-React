import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddDecoration() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);
  const [decorationData, setDecorationData] = useState({
    venueId: location.state.venueData._id,
    price: "",
    image: "",
  });

  //getting textdata from input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    //storing textdata from input fields
    setDecorationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    //storing profilePic
    setDecorationData((formData) => ({
      ...formData,
      image: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);

    //sending API for storing user data to MongoDB
    try {
      //appending data to formData
      const data = new FormData();

      //appending registration data to formData
      for (const key in decorationData) {
        data.append(key, decorationData[key]);
      }

      //sending API for storing user data to MongoDB
      const response = await axios.post(
        "http://localhost:8000/api/owener/add_decoration",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Decoration Updated successfully!!");
        navigate("/viewDecoration.html");
        setIsLoaded(true);
      } else {
        setIsLoaded(true);
        throw new Error(response.data.message || "Unknown error occurred");
      }
    } catch (error) {
      setIsLoaded(true);
      console.log("Decoration adding Error:", error);
      if (error.response && error.response.status === 500) {
        alert("Something went wrong!");
      } else {
        alert(error.response.data.message || "Something went wrong!");
      }
    }
  };

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
              <h6 className="mb-0">Edit Decoration</h6>
            </div>
            <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  min={0}
                  name="price"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Recent Sales End */}
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
      </div>
    </>
  );
}
