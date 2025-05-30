import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server_url } from "../utils/script.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../utils/UserDashboard.module.css";

const Vehicles = () => {
    const { id } = useParams();
    const [vehicles, setVehicles] = useState([]);

    const fetchData = async () => {
        try {
            const url = `${server_url}/fetchvehicle/${id}`;
            const res = await axios.get(url);
            setVehicles(res.data.records);
        } catch (error) {
            toast.error("Failed to fetch vehicles.");
        }
    };

    const deleteVehicle = async (vehicleId) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                const res = await fetch(`/deletevehicle/${vehicleId}`, {
                    method: 'DELETE',
                });
                const data = await res.json();

                if (data.success) {
                    toast.success('Vehicle deleted successfully!');
                    fetchData();
                } else {
                    toast.error('Failed to delete vehicle.');
                }
            } catch (error) {
                toast.error('An error occurred while deleting.');
            }
        }
    };

    const bookNow = (vehicleId) => {
        window.location.href = `/user/booking/${vehicleId}`;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div
                className="wt-bnr-inr site-bg-dark twm-primary-overlay-wrap"
                style={{backgroundImage: "url(/images2/banner/banner-6.jpg)"}}
            >
                <div className="twm-primary-overlay"></div>
                <div className="container">
                    <div className="wt-bnr-inr-entry">
                        <div className="banner-title-outer">
                            <div className="banner-title-name">
                                <h2 className="wt-title">Luxury Car</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-3 mb-3 bg-section">
                <div className="container-fluid">
                    <div className="row section-row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h1 className={styles.heading}
                                    style={{color: "orange"}}>Vehicals Available</h1>
                            </div>
                        </div>
                    </div>


                    {/*new*/}



                    <div className="row">
                        {vehicles.map((vehicle) => (

                            <div className="col-lg-4 col-md-6 m-b30 wow fadeInDown" data-wow-delay="0.2s">
                                <div className="twm-vehicle-fleet-bx twm-custom-grid-3">
                                    <div className="twm-media">
                                        <div className="twm-media-pic">
                                            <img src={server_url+vehicle.car_photo} height={'10         0px'} width={'100px'} alt="image"/>
                                        </div>
                                        <div className="twm-price-section">
                                            <div className="v-price">Rs. {vehicle.rent_per_day}</div>
                                            <div className="v-duration">/ Day</div>
                                            <button  onClick={() => bookNow(vehicle.id)} className="v-detail">
                                                <em>Book</em>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="twm-vehicle-fleet-content">
                                        <h3 className="twm-v-title">
                                            <a href="cars-detail.html">{vehicle.name} {vehicle.vehicle_model}</a>
                                        </h3>
                                        <ul className="twm-vehicle-facility">
                                            <li>
          <span>
            <img src="/images2/icons/car-seat.png" alt="Image"/>
          </span>
                                                {vehicle.seat}
                                            </li>

                                            <li>
          <span>
            <img src="/images2/icons/car.png" alt="Image"/>
          </span>
                                                {vehicle.vehicle_brand}
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>


                        ))}
                    </div>

                    {vehicles.length === 0 && (
                        <div className="text-center mt-5">
                            <p>No vehicles available.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Vehicles;
