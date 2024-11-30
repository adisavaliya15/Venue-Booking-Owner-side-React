import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


function SignupPage() {

    //initialize navigate
    const navigate = useNavigate();

    //hook for Storing email & password
    const [regData, setRegData] = useState({
        username: '',
        email: '',
        phoneNo: '',
        password: '',
    })
    const [isLoaded, setLoaded] = useState(true);

    //getting textdata from input fields
    const handleTextChange = (e) => {
        const { name, value } = e.target;

        //storing textdata from input fields
        setRegData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    //callback function to FIRE login API
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        setLoaded(false);
        //calling Login API
        try {
            const response = await axios.post('http://localhost:8000/api/owner/signup', regData);

            //initializing response data from API response
            const { success } = response.data;
            console.log(success);

            //if success then navigate to home page
            if (success) {
                navigate('/login');
            }
        } catch (error) {
            console.log("Login Err: ", error);
            setLoaded(true);
            if (error.response && error.response.status === 400) {
                alert('Email Already Exist!');
            } else {
                alert('Error: Failed to connect to server');
            }
        }
    }


    return (
        <> {/* Spinner Start */}
            <div id="spinner" className={`${isLoaded ? '' : 'show'} bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center `}>
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <section className="bg-light py-3 py-md-5">
                <div className="container center">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border border-light-subtle rounded-3 shadow-sm">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <h2 className="fs-4 fw-normal text-center text-primary mb-4">Signup</h2>
                                    <form onSubmit={handleSignupSubmit} className="form">
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        onChange={handleTextChange}
                                                        value={regData.username}
                                                        placeholder="Full Name"
                                                        required />
                                                    <label className="form-label">Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        onChange={handleTextChange}
                                                        value={regData.email}
                                                        placeholder="Email"
                                                        required />
                                                    <label className="form-label">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="tel"
                                                        name="phoneNo"
                                                        className="form-control"
                                                        onChange={handleTextChange}
                                                        value={regData.phoneNo}
                                                        placeholder="Phone No"
                                                        required />
                                                    <label className="form-label">Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password"
                                                        name="password"
                                                        className="form-control"
                                                        onChange={handleTextChange}
                                                        value={regData.password}
                                                        placeholder="Enter you password.."
                                                        id="password"
                                                        required />
                                                    <label className="form-label">Password</label>
                                                </div>
                                            </div>
                                            {/* <div className="col-12">
                                                <div className="d-flex gap-2 justify-content-between">
                                                    <a href="#!" className="link-primary text-decoration-none">Forgot password?</a>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <Link to="/login" className="text-decoration-none">
                                        <p className="text-center mb-0">Already have an account? <span className="text-primary">Login</span></p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

        </>
    );
}

export default SignupPage;
