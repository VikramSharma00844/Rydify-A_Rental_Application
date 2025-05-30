import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, server_url } from '../../utils/script.jsx';

const Manage_Cancelled_Req = () => {
    const [bookings, setBookings] = useState([]);
    const token = getCookie('dealerToken');

    useEffect(() => {
        fetchCancelledBookings();
    }, []);

    const fetchCancelledBookings = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchcancelledbooking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(res.data.records);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ color: 'orangered' }}>
                View Cancelled Request
            </h2>
            <hr />
            <div className="row justify-content-center">
                {bookings.map((x, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <div className="card card-custom text-white">
                            <img
                                src={server_url+x.vehicle.car_photo}
                                className="card-img-top"
                                alt="Vehicle"
                            />
                            <div className="card-body">
                                <h4 className="text-highlight">{x.vehicle.name}</h4>
                                <p>
                                    <span className="text-highlight">User Name:</span>{' '}
                                    {x.user.first_name} {x.user.last_name}
                                </p>
                                <p>
                                    <span className="text-highlight">Email:</span> {x.user.email}
                                </p>
                                <p>
                                    <span className="text-highlight">Aadhar Card:</span>{' '}
                                    {x.adharcard}
                                </p>
                                <p>
                                    <b>Driving License:</b><br />
                                    <img
                                        src={server_url+x.driving_licence}
                                        className="card-img-top"
                                        width="100px"
                                        style={{ height: '200px' }}
                                        alt="Driving License"
                                    />
                                </p>
                                <p>
                                    <span className="text-highlight">Pick-Up Location:</span>{' '}
                                    {x.pickup_location}
                                </p>
                                <p>
                                    <span className="text-highlight">Dropoff Location:</span>{' '}
                                    {x.dropoff_location}
                                </p>
                                <p>
                                    <span className="text-highlight">With Driver:</span>{' '}
                                    {x.with_driver}
                                </p>
                                <p className="mb-3">
                                    <span className="text-highlight">Status:</span>{' '}
                                    <span className="badge bg-danger">{x.booking_status}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <h3 className="text-center text-muted mt-4">No booking requests available.</h3>
                )}
            </div>

            {/* Styles */}
            <style>{`
        .text-highlight, p {
          color: black;
        }
        .card-custom {
          backdrop-filter: blur(10px);
          transition: all 0.3s ease-in-out;
          overflow: hidden;
          border-radius: 15px;
        }
        .card-custom:hover {
          transform: scale(1.05);
          box-shadow: 0px 0px 25px rgba(255, 0, 0, 0.9);
        }
        .card-img-top {
          width: 400px;
          height: 300px;
          object-fit: cover;
          border-radius: 10px;
          display: block;
          margin: 0 auto 10px auto;
        }
        .card {
          background-color: #f0f0f0;
          border-radius: 30px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
        </div>
    );
};

export default Manage_Cancelled_Req;
