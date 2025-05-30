import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server_url, getCookie } from '../../utils/script.jsx';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const token = getCookie('adminToken');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${server_url}/admin/fetchbooking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(res.data.records);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    return (
        <div>
            <h2 align="center" style={{color: '#ff6b00', fontWeight: 'bold'}}>View Bookings</h2>
            <hr style={{borderTop: '2px solid #ffa94d', marginBottom: '30px'}}/>
            <div className="container mt-4">
                <div className="row justify-content-center" id="cards">
                    {bookings.map((x, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <div
                                className="card card-custom text-black"
                                style={{
                                    backgroundColor: '#fffaf5',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    boxShadow: '0 10px 20px rgba(255, 107, 0, 0.15)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    border: '2px solid #ffa94d',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 107, 0, 0.8)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 107, 0, 0.15)';
                                }}
                            >
                                <img
                                    src={server_url + x.vehicle.car_photo}
                                    alt="Vehicle"
                                    className="card-img-top"
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        marginBottom: '15px',
                                    }}
                                />
                                <div className="card-body" style={{color: '#333'}}>
                                    <h4
                                        className="text-highlight"
                                        style={{textTransform: 'capitalize', fontWeight: '700', color: '#ff6b00'}}
                                    >
                                        {x.vehicle.name} {x.vehicle.vehicle_model}
                                    </h4>
                                    <p><strong>Dealer Name:</strong> {x.dealer.name}</p>
                                    <p><strong>User Name:</strong> {x.user.first_name} {x.user.last_name}</p>
                                    <p><strong>Email:</strong> {x.user.email}</p>
                                    <p><strong>Aadhar Card:</strong> {x.adharcard}</p>
                                    <p><strong>Driving License:</strong></p>
                                    <img
                                        crossOrigin="anonymous"
                                        src={server_url + x.driving_licence}
                                        alt="Driving License"
                                        style={{
                                            width: '100%',
                                            height: '250px',
                                            objectFit: 'cover',
                                            borderRadius: '15px',
                                            marginBottom: '15px',
                                        }}
                                    />
                                    <p><strong>Pick-Up Location:</strong> {x.pickup_location}</p>
                                    <p><strong>Dropoff Location:</strong> {x.dropoff_location}</p>
                                    <p className="mb-3">
                                        <strong>Status:</strong>{' '}
                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor: '#ff6b00',
                                                color: 'white',
                                                borderRadius: '12px',
                                                padding: '5px 12px',
                                                fontWeight: '600',
                                            }}
                                        >
                                    {x.booking_status}
                                </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ViewBookings;
