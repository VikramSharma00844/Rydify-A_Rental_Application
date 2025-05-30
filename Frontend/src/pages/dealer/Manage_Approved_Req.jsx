import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie, server_url } from '../../utils/script.jsx';

const Manage_Approved_Req = () => {
    const [bookings, setBookings] = useState([]);
    const token = getCookie('dealerToken'); // Ensure this matches the actual token name

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    useEffect(() => {
        fetchApprovedBookings();
    }, []);

    const fetchApprovedBookings = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchapprovedbooking`, axiosConfig);
            setBookings(res.data.records);
        } catch (err) {
            toast.error('Failed to fetch approved bookings');
        }
    };

    const sendMail = async (email, name, status, vehiclecategory) => {
        try {
            const res = await axios.post(
                `${server_url}/dealer/send-email`,
                { email, name, status, vehiclecategory },
                axiosConfig
            );
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to send email');
        }
    };

    const updateBookingReq = async (booking_status, booking) => {
        try {
            await axios.put(
                `${server_url}/dealer/updatebooking/${booking.id}`,
                { booking_status },
                axiosConfig
            );

            await sendMail(
                booking.user.email,
                booking.user.first_name,
                booking_status,
                booking.vehicle.name
            );

            await axios.put(
                `${server_url}/dealer/updateVehicle/${booking.vehicleId}`,
                { status: 'Available' },
                axiosConfig
            );

            await axios.put(
                `${server_url}/dealer/updateDriver/${booking.driverId}`,
                { status: 'Available' },
                axiosConfig
            );

            fetchApprovedBookings();
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error updating booking');
        }
    };

    // modal
    const [showModal, setShowModal] = useState(false);
    const [extraFareData, setExtraFareData] = useState({
        bookingId: null,
        extraFare: '',
        reason: ''
    });

    const extrafair = (bookingId) => {
        setExtraFareData({
            bookingId,
            extraFare: '',
            reason: ''
        });
        setShowModal(true);
    };


    async function submitextrafair (extraFareData){

        try {
            console.log("Sending data to backend:", extraFareData);

            const response = await axios.post(`${server_url}/dealer/addfare`, {
                bookingId: extraFareData.bookingId,
                fair: extraFareData.extraFare,
                reason: extraFareData.reason
            },axiosConfig);

            console.log("Response from server:", response.data);
            toast.success(response.data.message);
            // Show success message or perform any UI updates here

        } catch (error) {
            console.error("Error sending extra fare data:", error);
            // Optionally show error message to user
        }

    }


    return (
        <>
            <div className="container mt-4">
                <h2 className="text-center" style={{color: 'orangered'}}>
                    Manage Approved Request
                </h2>
                <hr/>
                <div className="row justify-content-center">
                    {bookings.map((booking, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <div className="card card-custom text-dark">
                                <img
                                    src={server_url + booking.vehicle.car_photo}
                                    className="card-img-top"
                                    alt="Vehicle"
                                />
                                <div className="card-body">
                                    <h4 className="fw-bold text-dark mb-2">{booking.vehicle.name}</h4>
                                    <p><b>User Name:</b> {booking.user.first_name} {booking.user.last_name}</p>
                                    <p><b>Email:</b> {booking.user.email}</p>
                                    <p><b>Aadhar Card:</b> {booking.adharcard}</p>
                                    <p>
                                        <b>Driving License:</b><br/>
                                        <img
                                            src={server_url + booking.driving_licence}
                                            className="card-img-top"
                                            width="100px"
                                            style={{height: '200px'}}
                                            alt="Driving License"
                                        />
                                    </p>
                                    <p><b>Pick-Up Location:</b> {booking.pickup_location}</p>
                                    <p><b>Dropoff Location:</b> {booking.dropoff_location}</p>
                                    <p><b>With Driver:</b> {booking.with_driver}</p>
                                    <p className="mb-3">
                                        <b>Status:</b>{" "}
                                        <span className="badge bg-success">{booking.booking_status}</span>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-success"
                                                onClick={() => updateBookingReq('Completed', booking)}>
                                            Complete
                                        </button>
                                        <button className="btn btn-warning text-white fw-semibold"
                                                onClick={() => extrafair(booking.id)}>
                                            Extra Fare
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

                {/* STYLING */}
                <style>{`
    .card-custom {
      background-color: #ffffff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 20px rgba(255, 165, 0, 0.2);
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }
    .card-custom:hover {
      transform: scale(1.03);
      box-shadow: 0px 0px 25px rgba(255, 102, 0, 0.4);
    }
    .card-img-top {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 10px;
      box-shadow: 0 4px 10px rgba(255, 165, 0, 0.3);
    }
    .text-highlight, p {
      color: #000;
    }
  `}</style>
            </div>


            {/*modal*/}
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: "#fff4e6", border: "2px solid orange" }}>
                            <div className="modal-header border-bottom border-warning">
                                <h5 className="modal-title" style={{ color: "orangered" }}>Add Extra Fare</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: "orangered" }}>Extra Fare</label>
                                    <input
                                        type="number"
                                        className="form-control border-warning"
                                        value={extraFareData.extraFare}
                                        onChange={(e) =>
                                            setExtraFareData({ ...extraFareData, extraFare: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" style={{ color: "orangered" }}>Reason</label>
                                    <select
                                        className="form-select border-warning"
                                        value={extraFareData.reason}
                                        onChange={(e) =>
                                            setExtraFareData({ ...extraFareData, reason: e.target.value })
                                        }
                                    >
                                        <option value="">-- Select Reason --</option>
                                        <option value="Tyre puncture">Tyre puncture</option>
                                        <option value="Minor accident damage">Minor accident damage</option>
                                        <option value="Engine issue">Engine issue</option>
                                        <option value="Vehicle breakdown">Vehicle breakdown</option>
                                        <option value="Fuel leakage">Fuel leakage</option>
                                        <option value="Battery failure">Battery failure</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer border-top border-warning">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning text-white"
                                    onClick={() => {
                                        submitextrafair(extraFareData);
                                        setShowModal(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </>
    );
};

export default Manage_Approved_Req;
