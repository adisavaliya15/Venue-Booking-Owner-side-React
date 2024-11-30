import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

function EditVenueDetails() {

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoaded, setIsLoaded] = useState(true);
    const [venueData, setVenueData] = useState({
        venueId: location.state.venueData._id,
        name: location.state.venueData.name,
        address: location.state.venueData.address,
        city: location.state.venueData.city,
        images: location.state.venueData.images,
        about: location.state.venueData.about,
        enquiryNo: location.state.venueData.enquiryNo,
        capacity: location.state.venueData.capacity,
        pricePerDay: location.state.venueData.pricePerDay,
        isWifi: location.state.venueData.isWifi,
        isAC: location.state.venueData.isAC,
    });

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setVenueData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setVenueData((prevData) => ({
            ...prevData,
            [name]: checked ? 'true' : 'false' // Set as string
        }));
       
    };

    const handleFileChange = (e) => {
        const files = e.target.files;

        // Check if number of selected files is more than 3
        if (files.length > 3) {
            alert("You can select only 3 images.");
            e.target.value = null;
            return;
        }

        // Convert the FileList object to an array
        const fileArray = Array.from(files);
        console.log("isWifi: ", venueData.isWifi);
        console.log("isAC: ", venueData.isAC);

        // Store the array of files in state
        setVenueData((prevData) => ({
            ...prevData,
            images: fileArray,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoaded(false);

        const data = new FormData();

        // Append each file to the FormData object
        venueData.images.forEach((file, index) => {
            data.append(`images`, file);
        });

        // Append other data fields to the FormData object
        for (const key in venueData) {
            if (key !== 'images') {
                data.append(key, venueData[key]);
            }
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/owner/edit_venue`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                console.log('Venue updated successfully!!');
                setIsLoaded(true);
                navigate('/venueDetail.html');
            } else {
                setIsLoaded(true);
                throw new Error(response.data.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.log('Venue update Error:', error);
            if (error.response && error.response.status === 500) {
                alert('Something went wrong!');
                setIsLoaded(true);
            } else {
                alert(error.response.data.message || 'Something went wrong!');
                setIsLoaded(true);
            }
        }
    };

    return (
        <>
            <div id="spinner" className={`${isLoaded ? '' : 'show'} bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center `}>
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <Sidebar />
            <div id="content" className="content">
                <Navbar />
                <div className="container-fluid pt-4 px-4">
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Venue Name</label>
                            <input type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleTextChange}
                                value={venueData.name}
                                placeholder="Enter Venue Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                onChange={handleTextChange}
                                value={venueData.address}
                                placeholder="Enter Venue Address"
                                required
                            />
                        </div>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    onChange={handleTextChange}
                                    value={venueData.city}
                                    placeholder="Enter Venue City"
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="enquiryNo" className="form-label">Enquiry Number</label>
                                <input type="tel"
                                    className="form-control"
                                    id="enquiryNo"
                                    name="enquiryNo"
                                    onChange={handleTextChange}
                                    value={venueData.enquiryNo}
                                    placeholder="Enter Venue Enquiry Number"
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pricePerDay" className="form-label">Price Per Day</label>
                                <input type="number"
                                    className="form-control"
                                    id="pricePerDay"
                                    name="pricePerDay"
                                    onChange={handleTextChange}
                                    value={venueData.pricePerDay}
                                    min={0}
                                    placeholder="Enter Venue Price Per Day"
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="capacity" className="form-label">Capacity</label>
                                <input type="number"
                                    className="form-control"
                                    id="capacity"
                                    name="capacity"
                                    min={0}
                                    onChange={handleTextChange}
                                    value={venueData.capacity}
                                    placeholder="Enter Venue Capacity"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="about" className="form-label">About</label>
                            <textarea className="form-control"
                                id="about"
                                name="about"
                                rows={3}
                                onChange={handleTextChange}
                                value={venueData.about}
                                placeholder="Enter About Venue"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Images</label>
                            <input type="file"
                                className="form-control"
                                name="images"
                                accept="image/*"
                                onChange={handleFileChange}
                                multiple
                                required
                            />
                        </div>
                        {/* Add other input fields for address, city, etc. */}
                        <div className="mb-3 form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="isWifi"
                                name="isWifi"
                                onChange={handleCheckboxChange}
                                checked={venueData.isWifi === 'true' ? true : false}
                            />
                            <label className="form-check-label" htmlFor="isWifi">Wifi</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="isAC"
                                name="isAC"
                                onChange={handleCheckboxChange}
                                checked={venueData.isAC === 'true' ? true : false}
                            />
                            <label className="form-check-label" htmlFor="isAC">Air Conditioning</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default EditVenueDetails;
