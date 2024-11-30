import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function ViewDecorations() {
  const [decorationData, setDecorationData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDecorationData() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/owener/get_decoration",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDecorationData(response.data.decorationData);
      } catch (error) {
        console.error("Failed to fetch decoration data:", error);
      } finally {
        setLoaded(true);
      }
    }
    fetchDecorationData();
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
        <div className="container-fluid pt-4 px-4">
          {decorationData.length === 0 ? (
            <h5 style={{ textAlign: "center" }}>
              No decoration data available.
            </h5>
          ) : (
            decorationData.map((venue) => (
              <div key={venue._id} className="mb-4">
                <h5>Decorations</h5>
                <div className="row">
                  {venue.Decorations.map((decor) => (
                    <>
                      <div key={decor.decorId} className="col-md-3 mb-3">
                        <img
                          src={`http://localhost:8000/images/${decor.image}`}
                          alt="Decoration"
                          className="img-fluid"
                        />
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div>Price: {decor.price}</div>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(`/editDecoration.html`, {
                                state: { decor, venue },
                              })
                            }
                          >
                            Edit Decoration
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ViewDecorations;
