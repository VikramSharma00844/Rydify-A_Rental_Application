import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { server_url, getCookie } from '../../utils/script.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import{Link} from "react-router-dom";
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
    }, []);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {

            const res = await axios.post(`${server_url}/dealer/login`, data);

            const { error, message, token } = res.data;
            if (error)
            {
                toast.error(message);
            }
            else
            {
                reset();
                toast.success(message);

                let duration = 86400; // 1 day
                document.cookie = `dealerToken=${token}; path=/; max-age=${duration}`;

                setTimeout(() => {
                    navigate("/dealer/dashboard");
                }, 2000);
            }
        } catch (err) {
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div className="page-inner">
            <div style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                margin: '20px auto'
            }}>
                <h4 style={{ color: 'black', fontWeight:'bold', textAlign: 'center' }}>Dealer Login</h4>
                <hr />
                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            {...register("email", {required: "Email is required"})}
                                        />
                                        {errors.email && (
                                            <div style={{color: 'red', fontSize: '14px'}}>{errors.email.message}</div>
                                        )}
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
                                        {errors.password && (
                                            <div
                                                style={{color: 'red', fontSize: '14px'}}>{errors.password.message}</div>
                                        )}
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

                                    <div className="mb-3">
                                        <Link to="/dealer-signup">Not Registered? Go To Register Page</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
