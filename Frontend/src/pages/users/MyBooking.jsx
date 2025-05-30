import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {server_url,getCookie} from "../../utils/script.jsx";
import Style from '../../utils/MyBooking.module.css';
import {toast} from 'react-toastify';
function MyBooking() {
    const [records, setRecords] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [fair, setFair] = useState([]);

    useEffect(() => {
        bookingReq();
    }, []);

    async function bookingReq() {
        let token=getCookie('userToken');
        var res = await axios.get(`${server_url}/user/fetchMybooking`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        let data =res.data;
         setRecords(data.records);
        var records=data.records;
        let ans=[];
        for(var x of records)
        {
            let BookingId=x.id;

            res = await axios.get(`${server_url}/user/fetchfair/${BookingId}`,{
                headers: {Authorization: `Bearer ${token}`}
            });

            res=res.data;
            if(res.records.length==0)
            {
                ans.push("1");
            }
            else
            {
                ans.push(res.records[0]);
            }


        }
        setFair(ans);
    }

    const openModal = (id) => {
        setVehicleId(id);
        setRating(0);
        setFeedback('');
    };

    const handleReviewSubmit = async () => {
        let token=getCookie('userToken');
        var data ={feedback,rating,vehicleId};
        console.log(data);
        const res = await axios.post(`${server_url}/user/addreview`, data,{
            headers: {Authorization: `Bearer ${token}`}
        });
        const result = res.data;

        if (result.error) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setTimeout(() => window.location.href = '/user/mybooking', 2000);
        }
    };

    return (
        <>


            <div className="container mt-4">
                <h2 style={{textAlign: 'center', color: 'black'}}>View My Bookings</h2>
                <hr/>
                <div className="row justify-content-center" id="cards">
                    {records.map((x, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex">
                            <div
                                className="card shadow-sm w-100"
                                style={{
                                    backgroundColor: '#fffaf5',
                                    border: '1px solid #ffa94d',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={server_url + x.vehicle.car_photo}
                                    className="card-img-top"
                                    alt="Vehicle"
                                    style={{height: '200px', objectFit: 'cover'}}
                                />
                                <div className="card-body">
                                    <h5 style={{color: '#ff6b00'}}>
                                        {x.vehicle.name} {x.vehicle.vehicle_model}
                                    </h5>
                                    <p><strong>Dealer:</strong> {x.dealer.name}</p>
                                    <p><strong>Start Date:</strong> {x.start_date}</p>
                                    <p><strong>End Date:</strong> {x.end_date}</p>
                                    <p><strong>Pick-Up:</strong> {x.pickup_location}</p>
                                    <p><strong>Dropoff:</strong> {x.dropoff_location}</p>
                                    <p><strong>With Driver:</strong> {x.with_driver}</p>
                                    <p><strong>Total Price:</strong> ₹{x.total_price}</p>
                                    <p><strong>Extra Fair:</strong> ₹{fair[index]?.fair ?? 0}</p>
                                    <p><strong>Reason:</strong> {fair[index]?.reason ?? 'N/A'}</p>
                                    <p>
                                        <strong>Status: </strong>
                                        <span
                                            className={`badge rounded-pill px-3 py-2 ${
                                                x.booking_status === 'Completed'
                                                    ? 'bg-success'
                                                    : x.booking_status === 'Pending'
                                                        ? 'bg-warning text-dark'
                                                        : 'bg-danger'
                                            }`}
                                        >
                                {x.booking_status}
                            </span>
                                    </p>

                                    {x.booking_status === 'Completed' && (
                                        <button
                                            type="button"
                                            className="btn w-100 text-white text-uppercase mt-3"
                                            style={{
                                                backgroundColor: '#ff6b00',
                                                borderRadius: 30,
                                                height: 45,
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => openModal(x.vehicleId)}
                                        >
                                            Add Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{backgroundColor: '#fff3e0'}}>
                                <h4 className="modal-title fs-5" id="exampleModalLabel" style={{color: '#ff6b00'}}>
                                    Vehicle Review
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className={`modal-body ${Style.modalBody}`}>
                                <div className={Style.reviewContainer}>
                                    <h4 className={Style.textDark}>Rate Us</h4>
                                    <div className={Style.starRating}>
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <React.Fragment key={star}>
                                                <input
                                                    type="radio"
                                                    id={`star${star}`}
                                                    name="rating"
                                                    value={star}
                                                    checked={+rating === star}
                                                    onChange={() => setRating(star)}
                                                    className={Style.starInput}
                                                />
                                                <label htmlFor={`star${star}`} className={Style.starLabel}>
                                                    &#9733;
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <h4 className={`${Style.textDark} mt-3`}>Your Feedback</h4>
                                    <textarea
                                        placeholder="Write your review here..."
                                        className={Style.textarea}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />

                                    <button
                                        onClick={handleReviewSubmit}
                                        className={Style.submitButton}
                                        style={{
                                            backgroundColor: '#ff6b00',
                                            color: '#fff',
                                            borderRadius: '25px',
                                            padding: '10px 25px',
                                            marginTop: '1rem',
                                            border: 'none',
                                        }}
                                    >
                                        Submit
                                    </button>

                                    <Link
                                        to="/user/mybooking"
                                        data-bs-dismiss="modal"
                                        className={Style.goBackButton}
                                        style={{color: '#ff6b00', fontWeight: 600, marginTop: '1rem'}}
                                    >
                                        GO-BACK
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default MyBooking;