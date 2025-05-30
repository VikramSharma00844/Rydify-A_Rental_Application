import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, server_url } from '../../utils/script.jsx';


const Manage_Pending_Req = () => {
    const [bookings, setBookings] = useState([]);
    const token=getCookie('dealerToken');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchbooking`,{
                headers:{Authorization:`Bearer ${token}`}
            });
            setBookings(res.data.records);
        } catch (error) {
            toast.error("Failed to fetch bookings");
        }
    };

    const sendMail =async (email, name, status, vehiclecategory) =>
    {
        try {
            const res = await axios.post(`${server_url}/dealer/send-email`, {
                email,
                status,
                name,
                vehiclecategory
            },{
                headers:{Authorization:`Bearer ${token}`}
            });

            toast.success(res.data.message || "Email sent successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send email");
        }
    };

    const updateBookingReq = async (booking_status, booking) => {
        try {
            const res = await axios.put(`${server_url}/dealer/updatebooking/${booking.id}`, {
                booking_status
            },{
                headers:{Authorization:`Bearer ${token}`}
            });

            toast.success(res.data.message);
            sendMail(booking.user.email, booking.user.first_name, booking_status, booking.vehicle.name);

            if (booking_status === 'Cancelled') {
                await axios.put(`${server_url}/dealer/updateVehicle/${booking.vehicleId}`, {
                    status: 'Available'
                },{
                    headers:{Authorization:`Bearer ${token}`}
                });

                await axios.put(`${server_url}/dealer/updateDriver/${booking.driverId}`, {
                    status: 'Available'
                },{
                    headers:{Authorization:`Bearer ${token}`}
                });
            }

            fetchBookings();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{color: "orange"}}>View Booking Request</h2>
            <hr/>
            <div className="row justify-content-center">
                {bookings.map((x, i) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={i}>
                        <div
                            className="card text-dark"
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "0 8px 20px rgba(255, 165, 0, 0.2)",
                                border: "1px solid #ffe0b3"
                            }}
                        >
                            <img
                                src={server_url + x.vehicle.car_photo}
                                className="card-img-top"
                                alt="Vehicle"
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "15px",
                                    boxShadow: "0 4px 10px rgba(255, 165, 0, 0.3)"
                                }}
                            />
                            <div className="card-body">
                                <h4 className="text-dark fw-bold mb-2">{x.vehicle.name}</h4>
                                <p><b>User Name:</b> {x.user.first_name} {x.user.last_name}</p>
                                <p><b>Email:</b> {x.user.email}</p>
                                <p><b>Aadhar Card:</b> {x.adharcard}</p>
                                <p><b>Driving License:</b><br/>
                                    <img
                                        src={server_url + x.driving_licence}
                                        alt="License"
                                        style={{
                                            width: "100%",
                                            height: "180px",
                                            objectFit: "cover",
                                            borderRadius: "12px",
                                            boxShadow: "0 2px 8px rgba(255, 165, 0, 0.2)"
                                        }}
                                    />
                                </p>
                                <p><b>Pick-Up Location:</b> {x.pickup_location}</p>
                                <p><b>Dropoff Location:</b> {x.dropoff_location}</p>
                                <p><b>With Driver:</b> {x.with_driver}</p>
                                <p>
                                    <b>Status:</b>{" "}
                                    <span
                                        className={`badge px-3 py-2 ${x.booking_status === "Pending" ? "bg-warning" : "bg-success"} text-dark`}>
                {x.booking_status}
              </span>
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn"
                                        style={{
                                            backgroundColor: "orange",
                                            color: "white",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => updateBookingReq("Approved", x)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn"
                                        style={{
                                            backgroundColor: "#ff704d",
                                            color: "white",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => updateBookingReq("Cancelled", x)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <h3 className="text-center text-muted mt-4">No booking requests available.</h3>
                )}
            </div>
        </div>

    );
};

export default Manage_Pending_Req;
