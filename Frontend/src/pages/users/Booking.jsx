import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { server_url, getCookie } from "../../utils/script.jsx";

const Booking = () => {
    const { vehicleId } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [formData, setFormData] = useState({
        aadhar_card: "",
        driving_license: null,
        start_date: "",
        end_date: "",
        with_driver: "",
        pickup_location: "",
        dropoff_location: "",
    });

    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [basePrice, setBasePrice] = useState(0);

    const token = getCookie("userToken");

    useEffect(() => {
        fetchVehicleDetails();
    }, []);

    const fetchVehicleDetails = async () => {
        try {
            const { data } = await axios.get(`${server_url}/user/fetchVehicles/${vehicleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const v = data.records[0];
            setVehicle(v);
            setBasePrice(v.rent_per_day);
        } catch (err) {
            toast.error("Failed to load vehicle details");
        }
    };

    useEffect(() => {
        const { start_date, end_date, with_driver } = formData;

        if (start_date && end_date && new Date(end_date) >= new Date(start_date)) {
            const diffDays = Math.ceil(
                (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
            );
            setDays(diffDays);

            const driverCost = with_driver === "yes" ? diffDays * 1000 : 0;
            setTotalPrice(diffDays * basePrice + driverCost);
        } else {
            setDays(0);
            setTotalPrice(0);
        }
    }, [formData.start_date, formData.end_date, formData.with_driver, basePrice]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const checkDriver = async () => {
        const { start_date, end_date } = formData;

        if (!start_date || !end_date) {
            toast.error("Please select both start and end dates");
            return;
        }

        if (new Date(end_date) <= new Date(start_date)) {
            toast.error("End date must be greater than start date");
            return;
        }

         if (formData.pickup_location === formData.dropoff_location) {
                toast.error("Pickup and dropoff locations cannot be the same.");
                return;  // Stop further execution
            }

        if (formData.with_driver === "yes") {
            const { data } = await axios.get(`${server_url}/user/fetchdriver`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (data.error || data.records.length === 0) {
                toast.error("Driver not available");
                return;
            }
        }
        handleRazorpay();
    };

    const handleRazorpay = () => {
        const options = {
            key: "rzp_test_dRWiKHS7zr2Gki",
            amount: totalPrice * 100,
            name: "RYDIFY",
            description: "Vehicle Booking",
            image: "https://cdn3.vectorstock.com/i/1000x1000/98/22/logo-for-grocery-store-vector-21609822.jpg",
            handler: () => {
                handleBooking();
            },
            prefill: {
                name: "",
                email: "",
            },
            theme: {
                color: "#942436",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleBooking = async () => {
        try {
            const fd = new FormData();
            fd.append("adharcard", formData.aadhar_card);
            fd.append("driving_licence", formData.driving_license);
            fd.append("start_date", formData.start_date);
            fd.append("end_date", formData.end_date);
            fd.append("days", days);
            fd.append("pickup_location", formData.pickup_location);
            fd.append("dropoff_location", formData.dropoff_location);
            fd.append("total_price", totalPrice);
            fd.append("vehicleId", vehicle.id);
            fd.append("dealerId", vehicle.dealerId);
            fd.append("with_driver", formData.with_driver);

            let driverId = 0;
            if (formData.with_driver === "yes") {
                const { data } = await axios.get(`${server_url}/user/fetchdriver`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!data.error && data.records.length > 0) {
                    driverId = data.records[0].id;
                    fd.append("driverId", driverId);
                }
            }

           

            const { data } = await axios.post(`${server_url}/user/booking`, fd, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.error) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                await updateStatus(vehicle.id, driverId);
            }
        } catch (err) {
            toast.error("Booking failed");
        }
    };

    const updateStatus = async (vehicleId, driverId) => {
        try {
            await axios.put(
                `${server_url}/user/updateVehicle/${vehicleId}`,
                { status: "Rented" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (driverId) {
                await axios.put(
                    `${server_url}/user/updateDriver/${driverId}`,
                    { status: "Assigned" },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            window.location.href = "/user/thankyou";
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    return (

        <>
            <div className={"container mt-5 row"}>
                <div className=" col-md-8 offset-md-3  twm-bx-st1 twm-car-d-form m-b30 container">
                    <h3 className="twm-title text-center">Book a Vehicle</h3>
                    {vehicle && (
                        <form className="cons-contact-form">
                            <div className="row mb-4">
                                <div className="col-md-6 text-center mb-3">
                                    <img
                                        src={server_url+vehicle.car_photo}
                                        alt="Vehicle"
                                        className="img-fluid rounded shadow"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <h5>Vehicle Details:</h5>
                                    <div className="ms-3">
                                        <p><b>Name:</b> {vehicle.name}</p>
                                        <p><b>Model:</b> {vehicle.vehicle_model}</p>
                                        <p><b>Seats:</b> {vehicle.seat}</p>
                                        <p><b>Price per Day:</b> ₹{vehicle.rent_per_day}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="text"
                                    name="aadhar_card"
                                    className="form-control"
                                    placeholder="Aadhar Card Number"
                                    maxLength="12"
                                    minLength="12"
                                    pattern="\d{12}"
                                    required
                                    value={formData.aadhar_card}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="file"
                                    name="driving_license"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="date"
                                    name="start_date"
                                    className="form-control"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    value={formData.start_date}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <input
                                    type="date"
                                    name="end_date"
                                    className="form-control"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <select
                                    name="with_driver"
                                    className="form-select"
                                    required
                                    value={formData.with_driver}
                                    onChange={handleInputChange}
                                >
                                    <option value="">With Driver?</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="form-group mb-4">
                                <select
                                    name="pickup_location"
                                    className="form-select"
                                    required
                                    value={formData.pickup_location}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Pickup Location</option>
                                    <option value="Golden Temple, Amritsar">Golden Temple, Amritsar</option>
  <option value="Ranjit Avenue, Amritsar">Ranjit Avenue, Amritsar</option>
  <option value="Putlighar, Amritsar">Putlighar, Amritsar</option>
  <option value="Majitha Road, Amritsar">Majitha Road, Amritsar</option>
  <option value="Katra Ahluwalia, Amritsar">Katra Ahluwalia, Amritsar</option>
  <option value="Lawrence Road, Amritsar">Lawrence Road, Amritsar</option>

  {/* Ludhiana */}
  <option value="Sarabha Nagar, Ludhiana">Sarabha Nagar, Ludhiana</option>
  <option value="Model Town, Ludhiana">Model Town, Ludhiana</option>
  <option value="Feroze Gandhi Market, Ludhiana">Feroze Gandhi Market, Ludhiana</option>
  <option value="Pakhowal Road, Ludhiana">Pakhowal Road, Ludhiana</option>
  <option value="Gill Road, Ludhiana">Gill Road, Ludhiana</option>
  <option value="Sahara Town, Ludhiana">Sahara Town, Ludhiana</option>

                                </select>
                            </div>

                            <div className="form-group mb-4">
                                <select
                                    name="dropoff_location"
                                    className="form-select"
                                    required
                                    value={formData.dropoff_location}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Dropoff Location</option>
                                    <option value="Golden Temple, Amritsar">Golden Temple, Amritsar</option>
  <option value="Ranjit Avenue, Amritsar">Ranjit Avenue, Amritsar</option>
  <option value="Putlighar, Amritsar">Putlighar, Amritsar</option>
  <option value="Majitha Road, Amritsar">Majitha Road, Amritsar</option>
  <option value="Katra Ahluwalia, Amritsar">Katra Ahluwalia, Amritsar</option>
  <option value="Lawrence Road, Amritsar">Lawrence Road, Amritsar</option>

  {/* Ludhiana */}
  <option value="Sarabha Nagar, Ludhiana">Sarabha Nagar, Ludhiana</option>
  <option value="Model Town, Ludhiana">Model Town, Ludhiana</option>
  <option value="Feroze Gandhi Market, Ludhiana">Feroze Gandhi Market, Ludhiana</option>
  <option value="Pakhowal Road, Ludhiana">Pakhowal Road, Ludhiana</option>
  <option value="Gill Road, Ludhiana">Gill Road, Ludhiana</option>
  <option value="Sahara Town, Ludhiana">Sahara Town, Ludhiana</option>

                                </select>
                            </div>

                            <h5 className="text-end">Total: ₹{totalPrice}</h5>

                            <div className="text-center">
                                <button
                                    type="button"
                                    className="site-button dark-bg mt-4"
                                    onClick={checkDriver}
                                >
                                    <em>Book Now</em>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            </div>


            {/*<div className="container mt-5 row  mb-3">*/}
            {/*    <div className="card shadow col-md-8 offset-md-3 p-4">*/}
            {/*        <h2 className="text-center text-black mb-4">Book a Vehicle</h2>*/}
            {/*        {vehicle && (*/}
            {/*            <form>*/}
            {/*                <div className="row mb-4">*/}
            {/*                    <div className="col-md-6 text-center">*/}
            {/*                        <img*/}
            {/*                            src={vehicle.car_photo}*/}
            {/*                            alt="Vehicle"*/}
            {/*                            className="img-fluid rounded shadow"*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-6">*/}
            {/*                        <h5>Vehicle Details:</h5>*/}
            {/*                        <div className="ms-3">*/}
            {/*                            <div>*/}
            {/*                                <b>Name:</b> {vehicle.name}*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <b>Model:</b> {vehicle.vehicle_model}*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <b>{vehicle.seat}</b> Seater*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <b>Price per Day:</b> ₹{vehicle.rent_per_day}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>Aadhar Card Number</label>*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        className="form-control"*/}
            {/*                        name="aadhar_card"*/}
            {/*                        maxLength="12"*/}
            {/*                        minLength="12"*/}
            {/*                        pattern="\d{12}"*/}
            {/*                        required*/}
            {/*                        value={formData.aadhar_card}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>Driving License</label>*/}
            {/*                    <input*/}
            {/*                        type="file"*/}
            {/*                        className="form-control"*/}
            {/*                        name="driving_license"*/}
            {/*                        accept="image/*"*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>Start Date</label>*/}
            {/*                    <input*/}
            {/*                        type="date"*/}
            {/*                        className="form-control"*/}
            {/*                        name="start_date"*/}
            {/*                        min={new Date().toISOString().split("T")[0]}*/}
            {/*                        required*/}
            {/*                        value={formData.start_date}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>End Date</label>*/}
            {/*                    <input*/}
            {/*                        type="date"*/}
            {/*                        className="form-control"*/}
            {/*                        name="end_date"*/}
            {/*                        min={new Date().toISOString().split("T")[0]}*/}
            {/*                        required*/}
            {/*                        value={formData.end_date}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>With Driver</label>*/}
            {/*                    <select*/}
            {/*                        className="form-select"*/}
            {/*                        name="with_driver"*/}
            {/*                        value={formData.with_driver}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                        required*/}
            {/*                    >*/}
            {/*                        <option value="">Choose Option</option>*/}
            {/*                        <option value="yes">Yes</option>*/}
            {/*                        <option value="no">No</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>Pickup Location</label>*/}
            {/*                    <select*/}
            {/*                        className="form-select"*/}
            {/*                        name="pickup_location"*/}
            {/*                        value={formData.pickup_location}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                        required*/}
            {/*                    >*/}
            {/*                        <option value="" disabled>*/}
            {/*                            Select a city*/}
            {/*                        </option>*/}
            {/*                        <option value="NovaRide,Court Road,Amritsar">NovaRide,Court Road,Amritsar</option>*/}
            {/*                        <option value="NovaRide,Court Road,Ludhiana">NovaRide,Court Road,Ludhiana</option>*/}
            {/*                        <option value="NovaRide,Court Road,Delhi">NovaRide,Court Road,Delhi</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}

            {/*                <div className="mb-3">*/}
            {/*                    <label>Dropoff Location</label>*/}
            {/*                    <select*/}
            {/*                        className="form-select"*/}
            {/*                        name="dropoff_location"*/}
            {/*                        value={formData.dropoff_location}*/}
            {/*                        onChange={handleInputChange}*/}
            {/*                        required*/}
            {/*                    >*/}
            {/*                        <option value="" disabled>*/}
            {/*                            Select a city*/}
            {/*                        </option>*/}
            {/*                        <option value="NovaRide,Court Road,Amritsar">NovaRide,Court Road,Amritsar</option>*/}
            {/*                        <option value="NovaRide,Court Road,Ludhiana">NovaRide,Court Road,Ludhiana</option>*/}
            {/*                        <option value="NovaRide,Court Road,Delhi">NovaRide,Court Road,Delhi</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}

            {/*                <h5 className="text-end">Total: ₹{totalPrice}</h5>*/}

            {/*                <button*/}
            {/*                    type="button"*/}
            {/*                    className="btn-default w-50 offset-md-2 mt-3"*/}
            {/*                    onClick={checkDriver}*/}
            {/*                >*/}
            {/*                    Book Now*/}
            {/*                </button>*/}
            {/*            </form>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Booking;
