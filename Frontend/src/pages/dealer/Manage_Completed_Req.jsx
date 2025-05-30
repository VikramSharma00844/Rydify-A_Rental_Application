import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, server_url } from '../../utils/script.jsx';

const Manage_Completed_Req = () => {
    const [bookings, setBookings] = useState([]);
    const token = getCookie('dealerToken');

    useEffect(() => {
        fetchCompletedBookings();
    }, []);

    const fetchCompletedBookings = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchcompletedbooking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(res.data.records);
        } catch (err) {
            console.error('Error fetching completed bookings:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{color: 'orangered'}}>
                View Completed Request
            </h2>
            <hr/>
            <div className="row justify-content-center">
                {bookings.map((x, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <div className="card card-custom text-dark">
                            <img
                                src={server_url + x.vehicle.car_photo}
                                className="card-img-top"
                                alt="Vehicle"
                            />
                            <div className="card-body">
                                <h4 className="fw-bold text-dark mb-2">{x.vehicle.name}</h4>
                                <p><b>User Name:</b> {x.user.first_name} {x.user.last_name}</p>
                                <p><b>Email:</b> {x.user.email}</p>
                                <p><b>Aadhar Card:</b> {x.adharcard}</p>
                                <p>
                                    <b>Driving License:</b><br/>
                                    <img
                                        src={server_url + x.driving_licence}
                                        className="card-img-top"
                                        width="100px"
                                        style={{height: '200px'}}
                                        alt="Driving License"
                                    />
                                </p>
                                <p><b>Pick-Up Location:</b> {x.pickup_location}</p>
                                <p><b>Dropoff Location:</b> {x.dropoff_location}</p>
                                <p><b>With Driver:</b> {x.with_driver}</p>
                                <p className="mb-3">
                                    <b>Status:</b>{" "}
                                    <span className="badge bg-success">{x.booking_status}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <h3 className="text-center text-muted mt-4">No booking requests available.</h3>
                )}
            </div>

            {/* Unified Styles */}
            <style>{`
    .text-highlight, p {
      color: black;
    }
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
  `}</style>
        </div>

    );
};

export default Manage_Completed_Req;
