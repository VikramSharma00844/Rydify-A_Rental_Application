import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {server_url,getCookie} from "../../utils/script.jsx";
import Style from "../../utils/Card.module.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${server_url}/admin/login`, {
                email: data.email,
                password: data.password
            });
            const { error, message, token } = response.data;
            if (error) {
                toast.error(message);
            } else {
                reset();
                toast.success(message);
                let duration = 86400; // 1 day
                document.cookie = `adminToken=${token}; path=/; max-age=${duration}`;


                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 2000);
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`container mt-5 mb-3 `}>
            <div className={`card col-md-6 mx-auto p-4 shadow ${Style.card}`}>
                <h4 className={`text-center mb-3 `} style={{color:"black", fontWeight:'bold'}}>Admin Login</h4>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter Password"
                            {...register("password", {required: "Password is required"})}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-100 mt-3 mb-3 btn-default"
                        style={{
                            backgroundColor: "#000",       // Black background
                            color: "#fff",                 // White text
                            border: "none",                // No border
                            padding: "12px 20px",          // Spacing inside button
                            borderRadius: "6px",           // Slightly rounded corners
                            fontWeight: "600",             // Semi-bold text
                            fontSize: "16px",              // Clear font size
                            cursor: "pointer",             // Pointer cursor on hover
                            display: "flex",               // Center icon and text
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",                   // Space between icon and text
                        }}
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i> Sign in
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
