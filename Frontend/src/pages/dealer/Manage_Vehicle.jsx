import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, server_url } from '../../utils/script.jsx';
import { toast } from "react-toastify";

const Manage_Vehicle = () => {
    const [categories, setCategories] = useState([]);
    const [seats, setSeats] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [formKey, setFormKey] = useState(Date.now());
    const [form, setForm] = useState({
        categoryId: "",
        seat: "",
        name: "",
        vehicle_brand: "",
        vehicle_model: "",
        desc: "",
        rent_per_day: "",
        car: null,
        rc: null,
        insurance: null,
        pollution: null,
    });
    const [errors, setErrors] = useState({});

    const token = getCookie("dealerToken");

    useEffect(() => {
        fetchCategories();
        fetchMyVehicle();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchCategories`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data.records || []);
        } catch {
            toast.error("Failed to load categories");
        }
    };

    const fetchMyVehicle = async () => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchMyVehicle`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVehicles(res.data.records || []);
        } catch {
            toast.error("Failed to fetch vehicles");
        }
    };

    const fetchSeats = async (categoryId) => {
        try {
            const res = await axios.get(`${server_url}/dealer/fetchCategory/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const category = res.data.records?.[0];
            setSeats(category?.name.toLowerCase() === "car" ? ["5", "7"] : ["2"]);
        } catch {
            toast.error("Failed to fetch seats");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setErrors(prev => ({ ...prev, [name]: "" }));

        if (files) {
            setForm(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
            if (name === "categoryId") fetchSeats(value);
        }
    };

    const validateForm = () => {
        const requiredFields = ["categoryId", "seat", "name", "vehicle_brand", "vehicle_model", "desc", "rent_per_day", "car", "rc", "insurance", "pollution"];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!form[field]) newErrors[field] = "This field is required.";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const fd = new FormData();
        for (const key in form) {
            fd.append(key === "desc" ? "description" : key, form[key]);
        }

        try {
            const res = await axios.post(`${server_url}/dealer/addvehicle`, fd, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(res.data.message || "Vehicle added");

            // Reset form and trigger full re-render
            setForm({
                categoryId: "",
                seat: "",
                name: "",
                vehicle_brand: "",
                vehicle_model: "",
                desc: "",
                rent_per_day: "",
                car: null,
                rc: null,
                insurance: null,
                pollution: null,
            });
            setErrors({});
            setFormKey(Date.now()); // force form re-render to reset file inputs

            fetchMyVehicle();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding vehicle");
        }
    };

    const deleteVehicle = async (id) => {
        try {
            const res = await axios.delete(`${server_url}/dealer/delete_vehicle/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(res.data.message || "Vehicle deleted");
            fetchMyVehicle();
        } catch {
            toast.error("Failed to delete vehicle");
        }
    };

    return (
        <div className="container  mt-3 mb-5 ">

            <div className="container mt-5 row">
                <div className="col-md-8 offset-md-2 twm-bx-st1 twm-car-d-form m-b30 container">
                    <h3 className="twm-title text-center">Add Vehicle</h3>
                    <form key={formKey}>
                        <div className="form-group mb-4">
                            <label>Choose Vehicle Category</label>
                            <select
                                className="form-select"
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Vehicle Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <small className="text-danger">{errors.categoryId}</small>
                            )}
                        </div>

                        <div className="form-group mb-4">
                            <label>No of Seats</label>
                            <select
                                className="form-select"
                                name="seat"
                                value={form.seat}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select No of Seats</option>
                                {seats.map(seat => (
                                    <option key={seat} value={seat}>
                                        {seat}
                                    </option>
                                ))}
                            </select>
                            {errors.seat && <small className="text-danger">{errors.seat}</small>}
                        </div>

                        {["name", "vehicle_brand", "vehicle_model", "desc", "rent_per_day"].map(
                            field => (
                                <div className="form-group mb-4" key={field}>
                                    <label>
                                        {field === "desc"
                                            ? "Description"
                                            : field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                    </label>
                                    <input
                                        type={field === "rent_per_day" ? "number" : "text"}
                                        className="form-control"
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors[field] && (
                                        <small className="text-danger">{errors[field]}</small>
                                    )}
                                </div>
                            )
                        )}

                        {[{name: "car", label: "Vehicle Photo"},
                            {name: "rc", label: "RC"},
                            {name: "insurance", label: "Insurance"},
                            {name: "pollution", label: "Pollution"}].map(({name, label}) => (
                            <div className="form-group mb-4" key={name}>
                                <label>{label}</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name={name}
                                    accept="image/*"
                                    onChange={handleChange}
                                    required
                                />
                                {errors[name] && (
                                    <small className="text-danger">{errors[name]}</small>
                                )}
                            </div>
                        ))}

                        <div className="text-center">
                            <button
                                type="button"
                                className="site-button dark-bg mt-4"
                                onClick={handleSubmit}
                            >
                                <em>Submit</em>
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <h2 className="text-center mt-5" style={{color: "orangered"}}>VIEW VEHICLES</h2>
            <div className="row mt-3">
                {/*{vehicles.map((v) => (*/}
                {/*    <div className="col-md-4 mb-4" key={v.id}>*/}
                {/*        <div style={{*/}
                {/*            backgroundColor: "#f9f9f9",*/}
                {/*            border: "1px solid #ddd",*/}
                {/*            borderRadius: "10px",*/}
                {/*            padding: "15px",*/}
                {/*            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",*/}
                {/*            height: "100%",*/}
                {/*            display: "flex",*/}
                {/*            flexDirection: "column",*/}
                {/*            justifyContent: "space-between"*/}
                {/*        }}>*/}
                {/*            <img*/}
                {/*                src={server_url + v.car_photo}*/}
                {/*                alt="vehicle"*/}
                {/*                style={{*/}
                {/*                    width: "100%",*/}
                {/*                    height: "150px",*/}
                {/*                    objectFit: "cover",*/}
                {/*                    borderRadius: "5px",*/}
                {/*                    marginBottom: "15px"*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <h5 className="mt-2" style={{fontSize: "16px", fontWeight: "bold", textAlign: "center"}}>*/}
                {/*                {v.name} {v.vehicle_model}*/}
                {/*            </h5>*/}
                {/*            <p style={{fontSize: "14px"}}><strong>Category:</strong> {v.category?.name}</p>*/}
                {/*            <p style={{fontSize: "14px"}}><strong>Description:</strong> {v.description}</p>*/}
                {/*            <p style={{fontSize: "14px"}}><strong>Rent:</strong> ₹{v.rent_per_day}/day</p>*/}
                {/*            <button*/}
                {/*                className="btn btn-danger w-100"*/}
                {/*                onClick={() => deleteVehicle(v.id)}*/}
                {/*                style={{marginTop: "auto"}}*/}
                {/*            >*/}
                {/*                Delete*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}

                <div className="row">
                    {vehicles.map((vehicle) => (

                        <div className="col-lg-4 col-md-6 m-b30 wow fadeInDown" data-wow-delay="0.2s">
                            <div className="twm-vehicle-fleet-bx twm-custom-grid-3">
                                <div className="twm-media">
                                    <div className="twm-media-pic">
                                        <img src={server_url+vehicle.car_photo} height={'100px'} width={'100px'} alt="image"/>
                                    </div>
                                    <div className="twm-price-section">
                                        <div className="v-price">Rs. {vehicle.rent_per_day}</div>
                                        <div className="v-duration">/ Day</div>
                                        <button   onClick={() => deleteVehicle(vehicle.id)} className="v-detail">
                                            <em>Delete</em>
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
    );
};

export default Manage_Vehicle;
